import asyncio
import json
import random
import uuid
from datetime import datetime, timedelta, timezone
from typing import Dict, Any, List, Optional
from app.services.websocket_manager import manager as ws_manager
from app.services.persistence_service import persistence_service
from app.core.logging import logger
from app.database.redis import get_redis

# Constants
BASE_TICK_RATE_MS = 1000
SIMULATED_SECONDS_PER_TICK = 60

INITIAL_METRICS = {
    "attendance": 45200,
    "crowdDensity": 42,
    "weather": {"condition": "Sunny", "temperature": 24, "windSpeed": 12},
    "parkingAvailability": 78,
    "publicTransportStatus": "Nominal",
    "medicalIncidents": 0,
    "securityAlerts": 0,
    "volunteerAvailability": 95,
    "foodQueueAvgStatus": "Low",
    "restroomQueueAvgStatus": "Low",
    "emergencyStatus": "None",
    "energyUsage": 14.2,
    "waterConsumption": 5.1,
    "carbonSavings": 120,
}

INITIAL_ZONES = {
    "gate-north": {"id": "gate-north", "name": "North Gate", "type": "Gate", "occupancy": 1200, "capacity": 5000, "status": "Nominal", "activeAlerts": 0},
    "gate-south": {"id": "gate-south", "name": "South Gate", "type": "Gate", "occupancy": 3400, "capacity": 5000, "status": "Congested", "activeAlerts": 0},
    "gate-east": {"id": "gate-east", "name": "East Gate", "type": "Gate", "occupancy": 800, "capacity": 4000, "status": "Nominal", "activeAlerts": 0},
    "gate-west": {"id": "gate-west", "name": "West Gate", "type": "Gate", "occupancy": 400, "capacity": 4000, "status": "Nominal", "activeAlerts": 0},
    "vip-entrance": {"id": "vip-entrance", "name": "VIP Entrance", "type": "VIP", "occupancy": 50, "capacity": 200, "status": "Nominal", "activeAlerts": 0},
    "parking-a": {"id": "parking-a", "name": "Parking A", "type": "Parking", "occupancy": 4500, "capacity": 5000, "status": "Congested", "activeAlerts": 0},
    "parking-b": {"id": "parking-b", "name": "Parking B", "type": "Parking", "occupancy": 2000, "capacity": 5000, "status": "Nominal", "activeAlerts": 0},
    "parking-c": {"id": "parking-c", "name": "Parking C", "type": "Parking", "occupancy": 500, "capacity": 5000, "status": "Nominal", "activeAlerts": 0},
    "food-court-a": {"id": "food-court-a", "name": "Food Court A", "type": "Food", "occupancy": 1200, "capacity": 1500, "status": "Congested", "activeAlerts": 0},
    "food-court-b": {"id": "food-court-b", "name": "Food Court B", "type": "Food", "occupancy": 300, "capacity": 1500, "status": "Nominal", "activeAlerts": 0},
    "medical-center": {"id": "medical-center", "name": "Medical Center", "type": "Medical", "occupancy": 12, "capacity": 50, "status": "Nominal", "activeAlerts": 0},
    "security-office": {"id": "security-office", "name": "Security Office", "type": "Security", "occupancy": 25, "capacity": 100, "status": "Nominal", "activeAlerts": 0},
    "restrooms": {"id": "restrooms", "name": "Central Restrooms", "type": "Restroom", "occupancy": 150, "capacity": 200, "status": "Congested", "activeAlerts": 0},
    "metro-station": {"id": "metro-station", "name": "Metro Station", "type": "Transport", "occupancy": 400, "capacity": 10000, "status": "Nominal", "activeAlerts": 0},
    "bus-terminal": {"id": "bus-terminal", "name": "Bus Terminal", "type": "Transport", "occupancy": 150, "capacity": 2000, "status": "Nominal", "activeAlerts": 0},
    "volunteer-hub": {"id": "volunteer-hub", "name": "Volunteer Hub", "type": "Volunteer", "occupancy": 80, "capacity": 150, "status": "Nominal", "activeAlerts": 0},
    "media-zone": {"id": "media-zone", "name": "Media Zone", "type": "Media", "occupancy": 60, "capacity": 100, "status": "Nominal", "activeAlerts": 0},
    "fan-zone": {"id": "fan-zone", "name": "Fan Zone", "type": "Fan", "occupancy": 8500, "capacity": 10000, "status": "Nominal", "activeAlerts": 0},
    "emergency-exit": {"id": "emergency-exit", "name": "Emergency Exit North", "type": "Emergency", "occupancy": 0, "capacity": 1000, "status": "Nominal", "activeAlerts": 0},
}

class SimulationService:
    def __init__(self):
        self.status = "stopped"
        self.speed = 1.0
        self.simulation_time = datetime.now(timezone.utc)
        self.match_time = 0.0
        
        self.metrics = dict(INITIAL_METRICS)
        self.zones = {k: dict(v) for k, v in INITIAL_ZONES.items()}
        self.events: List[Dict[str, Any]] = []
        self.active_scenarios: List[str] = []
        
        self._task: Optional[asyncio.Task] = None

    def start(self):
        if self.status == "running":
            return
        self.status = "running"
        asyncio.create_task(persistence_service.log_event("simulation.started", {"speed": self.speed}))
        self._task = asyncio.create_task(self.run_loop())

    def pause(self):
        self.status = "paused"
        if self._task and not self._task.done():
            self._task.cancel()
        asyncio.create_task(persistence_service.log_event("simulation.paused", {"speed": self.speed}))
        asyncio.create_task(ws_manager.broadcast({"type": "simulation.paused"}))

    def reset(self):
        self.pause()
        self.status = "stopped"
        self.speed = 1.0
        self.simulation_time = datetime.now(timezone.utc)
        self.match_time = 0.0
        self.metrics = dict(INITIAL_METRICS)
        self.zones = {k: dict(v) for k, v in INITIAL_ZONES.items()}
        self.events = []
        self.active_scenarios = []
        asyncio.create_task(persistence_service.log_event("simulation.reset", {}))
        asyncio.create_task(ws_manager.broadcast(self.get_full_state()))

    def set_speed(self, speed: float):
        self.speed = speed
        asyncio.create_task(ws_manager.broadcast({"type": "simulation.speed_changed", "speed": self.speed}))
        
    def trigger_scenario(self, scenario_id: str, title: str, description: str, severity: str, category: str, affected_zones: List[str]):
        if scenario_id in self.active_scenarios:
            return
        self.active_scenarios.append(scenario_id)
        
        event = {
            "id": f"evt_{int(datetime.now().timestamp())}_{random.randint(100, 999)}",
            "scenarioId": scenario_id,
            "timestamp": self.simulation_time.isoformat(),
            "title": title,
            "description": description,
            "severity": severity,
            "category": category,
            "affectedZones": affected_zones,
            "status": "active"
        }
        self.events.insert(0, event)
        asyncio.create_task(persistence_service.log_event("scenario.triggered", event))
        asyncio.create_task(ws_manager.broadcast({"type": "scenario.triggered", "event": event, "scenarioId": scenario_id}))
        
    def resolve_scenario(self, scenario_id: str):
        if scenario_id in self.active_scenarios:
            self.active_scenarios.remove(scenario_id)
            
        for evt in self.events:
            if evt.get("scenarioId") == scenario_id and evt.get("status") == "active":
                evt["status"] = "resolved"
                
        asyncio.create_task(persistence_service.log_event("scenario.resolved", {"scenarioId": scenario_id}))
        asyncio.create_task(ws_manager.broadcast({"type": "scenario.resolved", "scenarioId": scenario_id}))

    def get_full_state(self):
        return {
            "type": "simulation.state",
            "payload": {
                "status": self.status,
                "speed": self.speed,
                "simulationTime": self.simulation_time.isoformat(),
                "matchTime": self.match_time,
                "metrics": self.metrics,
                "zones": self.zones,
                "events": self.events,
                "activeScenarios": self.active_scenarios
            }
        }

    async def run_loop(self):
        try:
            while self.status == "running":
                await self.tick()
                interval_ms = BASE_TICK_RATE_MS / self.speed
                await asyncio.sleep(interval_ms / 1000.0)
        except asyncio.CancelledError:
            pass

    async def tick(self):
        # 1. Advance Time
        self.simulation_time += timedelta(seconds=SIMULATED_SECONDS_PER_TICK)
        self.match_time += (SIMULATED_SECONDS_PER_TICK / 60.0)
        
        # 2. Mutate Metrics
        crowd_density_delta = (random.random() * 2 - 1) * 0.5
        energy_delta = random.random() * 0.2
        
        if "gate-congestion" in self.active_scenarios:
            crowd_density_delta += 1.5
        if "power-failure" in self.active_scenarios:
            energy_delta -= 2.0
            
        new_density = max(0, min(100, self.metrics["crowdDensity"] + crowd_density_delta))
        new_energy = max(0, self.metrics["energyUsage"] + energy_delta)
        
        self.metrics["crowdDensity"] = round(new_density, 1)
        self.metrics["energyUsage"] = round(new_energy, 1)
        self.metrics["waterConsumption"] = round(self.metrics["waterConsumption"] + (random.random() * 0.1), 1)
        self.metrics["attendance"] += random.randint(0, 5)
        
        # 3. Mutate Zones
        for zone_id, zone in self.zones.items():
            occupancy_delta = random.randint(-10, 10)
            new_occupancy = max(0, min(zone["capacity"], zone["occupancy"] + occupancy_delta))
            
            new_status = zone["status"]
            ratio = new_occupancy / zone["capacity"]
            if ratio > 0.9:
                new_status = "Critical"
            elif ratio > 0.75:
                new_status = "Congested"
            else:
                new_status = "Nominal"
                
            zone["occupancy"] = new_occupancy
            zone["status"] = new_status
            
        # 4. Broadcast Partial State Update
        await ws_manager.broadcast({
            "type": "simulation.updated",
            "payload": {
                "simulationTime": self.simulation_time.isoformat(),
                "matchTime": self.match_time,
                "metrics": self.metrics,
                "zones": self.zones
            }
        })
        
        # 5. Cache snapshot to Redis for horizontal scaling reads (optional)
        try:
            redis = await get_redis()
            if redis:
                await redis.set("simulation_state", json.dumps(self.get_full_state()))
        except Exception as e:
            logger.error(f"Error caching simulation to redis: {e}")

simulation_engine = SimulationService()
