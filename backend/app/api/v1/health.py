from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.database.session import get_db
from app.database.redis import get_redis
from app.core.config import settings
import time

router = APIRouter()

start_time = time.time()

@router.get("/health")
async def health_check(db: AsyncSession = Depends(get_db)):
    """Comprehensive health check checking DB and Redis."""
    status = {
        "status": "ok",
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "uptime_seconds": round(time.time() - start_time, 2),
        "database": "unknown",
        "redis": "unknown"
    }

    # Check DB
    try:
        await db.execute(text("SELECT 1"))
        status["database"] = "connected"
    except Exception as e:
        status["database"] = "disconnected"
        status["status"] = "degraded"
        status["db_error"] = str(e)

    # Check Redis
    try:
        redis_client = await get_redis()
        if redis_client:
            await redis_client.ping()
            status["redis"] = "connected"
        else:
            status["redis"] = "disconnected"
            status["status"] = "degraded"
    except Exception as e:
        status["redis"] = "disconnected"
        status["status"] = "degraded"
        status["redis_error"] = str(e)

    return status

@router.get("/live")
async def liveness():
    """Simple liveness probe for orchestrators like Kubernetes."""
    return {"status": "alive"}

@router.get("/ready")
async def readiness():
    """Readiness probe."""
    return {"status": "ready"}
