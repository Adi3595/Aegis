from typing import Dict, List, Any
import uuid
import time
from app.services.websocket_manager import manager as ws_manager

class NotificationService:
    def __init__(self):
        self.history: List[Dict[str, Any]] = []

    async def broadcast_notification(self, title: str, message: str, category: str, priority: str, roles: List[str] = None):
        """
        Pushes a notification via WebSockets to connected clients.
        If roles is None, broadcasts to all. Otherwise, targets specific roles.
        """
        notification = {
            "id": str(uuid.uuid4()),
            "type": "NOTIFICATION",
            "title": title,
            "message": message,
            "category": category,
            "priority": priority,
            "timestamp": int(time.time() * 1000),
            "targetRoles": roles
        }
        
        self.history.append(notification)
        
        # Broadcast via the existing simulation websocket manager
        # Since we don't have role-specific socket rooms implemented in MVP, 
        # we broadcast to all and let the frontend filter by targetRoles.
        # A true production app would filter on the backend.
        await ws_manager.broadcast(notification)
        
        return notification

    def get_history(self) -> List[Dict[str, Any]]:
        return self.history

notification_service = NotificationService()
