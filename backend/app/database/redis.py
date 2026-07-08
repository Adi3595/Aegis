import redis.asyncio as redis
from app.core.config import settings
from app.core.logging import logger

redis_client = None

async def init_redis():
    global redis_client
    try:
        redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)
        await redis_client.ping()
        logger.info("redis_connected", url=settings.REDIS_URL)
    except Exception as e:
        logger.error("redis_connection_failed", error=str(e))
        # Don't throw immediately, allow fallback for development if needed

async def get_redis():
    return redis_client
