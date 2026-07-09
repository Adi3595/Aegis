import asyncio
import json
from typing import Dict, Set
from fastapi import WebSocket
from app.core.logging import logger
from app.database.redis import get_redis
from app.core.config import settings

class ConnectionManager:
    def __init__(self):
        # Maps client_id to (websocket, role)
        self.active_connections: Dict[str, set] = {}
        self.redis_channel = "simulation_events"
        self._pubsub_task = None

    async def connect(self, websocket: WebSocket, client_id: str, role: str = "Fan"):
        await websocket.accept()
        if client_id not in self.active_connections:
            self.active_connections[client_id] = set()
        self.active_connections[client_id].add((websocket, role))
        logger.info(f"Client {client_id} (Role: {role}) connected. Total clients: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket, client_id: str):
        if client_id in self.active_connections:
            # Find and discard the tuple with this websocket
            to_remove = [item for item in self.active_connections[client_id] if item[0] == websocket]
            for item in to_remove:
                self.active_connections[client_id].discard(item)
            if not self.active_connections[client_id]:
                del self.active_connections[client_id]
        logger.info(f"Client {client_id} disconnected.")

    async def send_personal_message(self, message: dict, websocket: WebSocket):
        try:
            await websocket.send_json(message)
        except Exception as e:
            logger.error(f"Error sending message to websocket: {e}")

    async def broadcast_local(self, message: dict):
        """Broadcast to all connected websockets on this specific server instance"""
        dead_connections = []
        target_roles = message.get("targetRoles", None)
        
        for client_id, connections in self.active_connections.items():
            for connection, role in list(connections):
                # Filter by role if targetRoles is present
                if target_roles and role not in target_roles:
                    continue
                    
                try:
                    await connection.send_json(message)
                except Exception:
                    dead_connections.append((client_id, connection))
                    
        for client_id, connection in dead_connections:
            self.disconnect(connection, client_id)

    async def broadcast(self, message: dict):
        """Publish message to Redis for horizontal scaling"""
        try:
            redis = await get_redis()
            if redis:
                await redis.publish(self.redis_channel, json.dumps(message))
            else:
                # Fallback to local broadcast if Redis is unavailable
                await self.broadcast_local(message)
        except Exception as e:
            logger.error(f"Error publishing to Redis: {e}")
            await self.broadcast_local(message)

    async def _redis_listener(self):
        """Background task to listen to Redis and broadcast locally"""
        try:
            redis = await get_redis()
            if not redis:
                logger.warning("Redis not available for PubSub")
                return

            pubsub = redis.pubsub()
            await pubsub.subscribe(self.redis_channel)
            logger.info(f"Subscribed to Redis channel: {self.redis_channel}")

            async for message in pubsub.listen():
                if message["type"] == "message":
                    try:
                        data = json.loads(message["data"].decode("utf-8"))
                        await self.broadcast_local(data)
                    except json.JSONDecodeError:
                        logger.error("Failed to decode Redis message")
        except Exception as e:
            logger.error(f"Redis listener error: {e}")
            # Try to reconnect after a delay
            await asyncio.sleep(5)
            self._pubsub_task = asyncio.create_task(self._redis_listener())

    def start_redis_listener(self):
        if not self._pubsub_task or self._pubsub_task.done():
            self._pubsub_task = asyncio.create_task(self._redis_listener())

    def stop_redis_listener(self):
        if self._pubsub_task and not self._pubsub_task.done():
            self._pubsub_task.cancel()

manager = ConnectionManager()
