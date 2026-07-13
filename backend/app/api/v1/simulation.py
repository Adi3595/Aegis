from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException
from pydantic import BaseModel
from typing import List
import uuid

from app.database.session import get_db
from app.services.websocket_manager import manager as ws_manager
from app.services.simulation_service import simulation_engine
from app.dependencies.auth import get_current_user, RequireRole
from app.models.user import User

router = APIRouter()

class SpeedUpdate(BaseModel):
    speed: float

class ScenarioTrigger(BaseModel):
    title: str
    description: str
    severity: str
    category: str
    affectedZones: List[str]

class DemoScenario(BaseModel):
    scenario_id: str
    seed: int

@router.get("/status")
async def get_status(current_user: User = Depends(get_current_user)):
    return {"status": simulation_engine.status, "speed": simulation_engine.speed}

@router.get("/state")
async def get_state(current_user: User = Depends(get_current_user)):
    return simulation_engine.get_full_state()

@router.post("/start")
async def start_simulation(current_user: User = Depends(RequireRole(["Administrator", "Organizer", "Executive"]))):
    simulation_engine.start()
    return {"message": "Simulation started"}

@router.post("/pause")
async def pause_simulation(current_user: User = Depends(RequireRole(["Administrator", "Organizer", "Executive"]))):
    simulation_engine.pause()
    return {"message": "Simulation paused"}

@router.post("/resume")
async def resume_simulation(current_user: User = Depends(RequireRole(["Administrator", "Organizer", "Executive"]))):
    simulation_engine.start()
    return {"message": "Simulation resumed"}

@router.post("/reset")
async def reset_simulation(current_user: User = Depends(RequireRole(["Administrator", "Organizer", "Executive"]))):
    simulation_engine.reset()
    return {"message": "Simulation reset"}

@router.post("/speed")
async def set_speed(speed_update: SpeedUpdate, current_user: User = Depends(RequireRole(["Administrator", "Organizer", "Executive"]))):
    simulation_engine.set_speed(speed_update.speed)
    return {"message": f"Simulation speed set to {speed_update.speed}"}

@router.post("/scenario")
async def trigger_demo_scenario(scenario: DemoScenario, current_user: User = Depends(RequireRole(["Administrator", "Organizer", "Executive"]))):
    
    # Initialize deterministic seed
    import random
    random.seed(scenario.seed)

    # Pre-packaged scenarios mapped from the request
    scenarios_db = {
        "NORMAL_MATCH": {"title": "Normal Match", "desc": "Standard operations", "sev": "low", "cat": "operations", "zones": []},
        "HEAVY_RAIN": {"title": "Heavy Rain", "desc": "Severe weather conditions", "sev": "medium", "cat": "weather", "zones": ["ALL"]},
        "MEDICAL_EMERGENCY": {"title": "Medical Emergency", "desc": "Cardiac event in Zone C", "sev": "high", "cat": "medical", "zones": ["Zone C"]},
        "CROWD_SURGE": {"title": "Crowd Surge", "desc": "Excessive density at Gate A", "sev": "critical", "cat": "crowd", "zones": ["Gate A"]}
    }

    s_data = scenarios_db.get(scenario.scenario_id, scenarios_db["NORMAL_MATCH"])

    # First reset to clear previous scenarios
    simulation_engine.reset()

    # Apply the trigger if not normal
    if scenario.scenario_id != "NORMAL_MATCH":
        simulation_engine.trigger_scenario(
            scenario.scenario_id, s_data["title"], s_data["desc"], s_data["sev"], s_data["cat"], s_data["zones"]
        )

    return {"message": f"Seeded scenario {scenario.scenario_id} triggered."}

@router.get("/scenarios")
async def get_scenarios(current_user: User = Depends(get_current_user)):
    return {"activeScenarios": simulation_engine.active_scenarios}

@router.post("/scenarios/{scenario_id}/trigger")
async def trigger_scenario(scenario_id: str, trigger_data: ScenarioTrigger, current_user: User = Depends(RequireRole(["Administrator", "Organizer", "Executive"]))):
    simulation_engine.trigger_scenario(
        scenario_id,
        trigger_data.title,
        trigger_data.description,
        trigger_data.severity,
        trigger_data.category,
        trigger_data.affectedZones
    )
    return {"message": f"Scenario {scenario_id} triggered"}

@router.post("/scenarios/{scenario_id}/resolve")
async def resolve_scenario(scenario_id: str, current_user: User = Depends(RequireRole(["Administrator", "Organizer", "Executive"]))):
    simulation_engine.resolve_scenario(scenario_id)
    return {"message": f"Scenario {scenario_id} resolved"}

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, token: str = None, db = Depends(get_db)):
    client_id = str(uuid.uuid4())
    
    role = "Fan" # default
    if token:
        try:
            from jose import jwt
            from app.core.config import settings
            from app.schemas.auth import TokenPayload
            from app.repositories.user_repository import UserRepository
            
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            token_data = TokenPayload(**payload)
            user_repo = UserRepository(db)
            user = await user_repo.get_by_id(uuid.UUID(token_data.sub))
            if user:
                role = user.role
        except Exception as e:
            pass
            
    await ws_manager.connect(websocket, client_id, role)
    
    # Send current state on connect
    await ws_manager.send_personal_message(simulation_engine.get_full_state(), websocket)
    
    try:
        while True:
            # Client can send commands via WS, but REST is preferred for commands
            data = await websocket.receive_json()
            if data.get("type") == "ping":
                await ws_manager.send_personal_message({"type": "pong"}, websocket)
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket, client_id)
