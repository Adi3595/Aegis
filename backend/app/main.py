from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router

from app.core.middleware import RequestContextMiddleware
from app.core.exceptions import APIException, api_exception_handler, unhandled_exception_handler
from app.database.redis import init_redis, get_redis
import os

from app.core.rate_limit import RateLimitMiddleware
from app.core.security_headers import SecurityHeadersMiddleware

from app.services.persistence_service import persistence_service
from app.services.websocket_manager import manager as ws_manager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Run database migrations automatically on startup
    os.system("alembic upgrade head")
    
    # Startup
    await init_redis()
    persistence_service.start()
    ws_manager.start_redis_listener()
    yield
    # Shutdown
    ws_manager.stop_redis_listener()
    persistence_service.stop()
    redis = await get_redis()
    if redis:
        await redis.close()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend API Foundation for AEGIS AI Platform",
    lifespan=lifespan,
    docs_url="/docs",
    openapi_url="/openapi.json"
)

# Exception Handlers
app.add_exception_handler(APIException, api_exception_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)

# Middleware
app.add_middleware(RequestContextMiddleware)
app.add_middleware(
    RateLimitMiddleware, 
    enabled=os.getenv("RATE_LIMIT_ENABLED", "true").lower() == "true",
    window_seconds=int(os.getenv("RATE_LIMIT_WINDOW_SECONDS", "60")),
    max_requests=int(os.getenv("RATE_LIMIT_MAX_REQUESTS", "100"))
)
app.add_middleware(SecurityHeadersMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Welcome to AEGIS AI API"}
