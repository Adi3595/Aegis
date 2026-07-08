import random
from typing import Dict, List, Any
import math

class AnalyticsService:
    def __init__(self):
        # Base seed for deterministic generation
        self.base_seed = 42

    def _get_seeded_random(self, scenario: str, seed_modifier: int = 0) -> random.Random:
        seed = sum(ord(c) for c in scenario) + self.base_seed + seed_modifier
        return random.Random(seed)

    def generate_historical_trends(self, scenario: str, duration_minutes: int = 120) -> List[Dict[str, Any]]:
        """
        Generates realistic timeseries data based on the scenario.
        E.g. Crowd density rises before kickoff, peaks at halftime, exits at end.
        """
        rng = self._get_seeded_random(scenario)
        data = []
        
        # Base parameters depending on scenario
        max_capacity = 80000
        attendance_modifier = 1.0
        incident_base_prob = 0.05

        if scenario == "High Attendance Final":
            attendance_modifier = 1.2
            incident_base_prob = 0.08
        elif scenario == "Heavy Rain":
            attendance_modifier = 0.8
            incident_base_prob = 0.12
            
        peak_attendance = min(int(65000 * attendance_modifier), max_capacity)
        
        current_attendance = 0
        cumulative_incidents = 0
        cumulative_energy = 5000 # Base load in kWh
        
        for minute in range(duration_minutes):
            # Phase 1: Ingress (0 - 45 min)
            if minute < 45:
                ingress_rate = rng.randint(500, 1500) * attendance_modifier
                current_attendance += ingress_rate
            # Phase 2: Match First Half (45 - 90 min) -> Attendance stable
            elif minute < 90:
                current_attendance += rng.randint(-100, 100)
            # Phase 3: Halftime (90 - 105 min) -> Slight drop/movement
            elif minute < 105:
                current_attendance -= rng.randint(0, 500)
            # Phase 4: Egress (105+ min)
            else:
                egress_rate = rng.randint(1000, 3000)
                current_attendance -= egress_rate
                
            current_attendance = max(0, min(current_attendance, max_capacity))
            
            # Incidents correlate with crowd size
            if rng.random() < incident_base_prob * (current_attendance / max_capacity):
                cumulative_incidents += 1
                
            # Sustainability metrics
            cumulative_energy += (current_attendance * 0.05) + rng.randint(10, 50)
            
            # Queue lengths correlate heavily with ingress/halftime
            if minute < 45:
                queue_length = (current_attendance / max_capacity) * 100 * rng.uniform(0.8, 1.2)
            elif 90 <= minute < 105:
                queue_length = (current_attendance / max_capacity) * 150 * rng.uniform(0.9, 1.3)
            else:
                queue_length = (current_attendance / max_capacity) * 20 * rng.uniform(0.5, 1.0)

            data.append({
                "time": f"T+{minute}m",
                "attendance": int(current_attendance),
                "incidents": cumulative_incidents,
                "queueLength": int(queue_length),
                "energyKwh": int(cumulative_energy),
                "fanSatisfaction": round(max(50, 100 - (queue_length * 0.2) - (cumulative_incidents * 2) + rng.uniform(-2, 2)), 1)
            })

        return data

    def generate_predictions(self, scenario: str, current_minute: int = 60) -> List[Dict[str, Any]]:
        """
        Generates forecast data for the next 30 minutes from the current minute.
        """
        rng = self._get_seeded_random(scenario, seed_modifier=999)
        predictions = []
        
        base_crowd = 60000
        
        for i in range(30):
            future_minute = current_minute + i
            
            # Simulated predicted crowd trend
            if future_minute > 105: # Egress
                base_crowd -= rng.randint(1000, 2500)
            else:
                base_crowd += rng.randint(-200, 200)
                
            predictions.append({
                "time": f"T+{future_minute}m",
                "predictedAttendance": max(0, int(base_crowd)),
                "predictedQueue": int(max(0, 50 + (rng.uniform(-10, 20) if future_minute > 105 else rng.uniform(-5, 5))))
            })
            
        return predictions

analytics_service = AnalyticsService()
