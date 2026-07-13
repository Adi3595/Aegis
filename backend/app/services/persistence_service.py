import asyncio
from typing import Dict, Any, Optional
from app.database.session import AsyncSessionLocal
from app.models.audit import AuditLog
from app.core.logging import logger

class SimulationPersistenceService:
    def __init__(self):
        self._queue: asyncio.Queue = asyncio.Queue()
        self._worker_task: Optional[asyncio.Task] = None

    async def log_event(self, action: str, details: Dict[str, Any], user_id: Optional[str] = None):
        """Queue a significant simulation event to be written to PostgreSQL"""
        await self._queue.put({
            "action": action,
            "details": details,
            "user_id": user_id
        })

    async def _worker(self):
        """Background worker that pulls from the queue and writes to the database"""
        logger.info("SimulationPersistenceService worker started.")
        while True:
            try:
                event_data = await self._queue.get()
                async with AsyncSessionLocal() as db:
                    log_entry = AuditLog(
                        action=event_data["action"],
                        details=event_data["details"],
                        user_id=event_data["user_id"]
                    )
                    db.add(log_entry)
                    await db.commit()
                self._queue.task_done()
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error(f"Error persisting simulation event: {e}")
                
    def start(self):
        if not self._worker_task or self._worker_task.done():
            self._worker_task = asyncio.create_task(self._worker())
            
    def stop(self):
        if self._worker_task and not self._worker_task.done():
            self._worker_task.cancel()

persistence_service = SimulationPersistenceService()
