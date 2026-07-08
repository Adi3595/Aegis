from fastapi import APIRouter, Body
from typing import List, Optional
from app.services.notification_service import notification_service
from pydantic import BaseModel

router = APIRouter()

class BroadcastRequest(BaseModel):
    title: str
    message: str
    category: str
    priority: str
    roles: Optional[List[str]] = None

@router.post("/broadcast")
async def broadcast(req: BroadcastRequest):
    """
    Broadcasts a real-time notification via WebSockets.
    """
    notif = await notification_service.broadcast_notification(
        title=req.title,
        message=req.message,
        category=req.category,
        priority=req.priority,
        roles=req.roles
    )
    return notif

@router.get("/history")
async def history():
    return {"notifications": notification_service.get_history()}
