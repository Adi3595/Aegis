import time
from typing import Callable
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from app.database.redis import get_redis
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class RateLimitMiddleware(BaseHTTPMiddleware):
    """
    A lightweight Redis-based rate limiting middleware implementing a fixed-window counter.
    In a real production environment, this could be upgraded to a sliding window or token bucket.
    """
    def __init__(self, app, enabled: bool = True, window_seconds: int = 60, max_requests: int = 100):
        super().__init__(app)
        self.enabled = enabled
        self.window_seconds = window_seconds
        self.max_requests = max_requests

    async def dispatch(self, request: Request, call_next: Callable):
        if not self.enabled:
            return await call_next(request)

        # 1. Endpoint specific overrides
        path = request.url.path
        if path.startswith("/api/v1/health"):
            return await call_next(request)
            
        limit = self.max_requests
        
        if path.startswith("/api/v1/auth"):
            limit = 10  # Stricter for auth
        elif path.startswith("/api/v1/ai"):
            limit = 20  # AI is expensive
        elif path.startswith("/api/v1/simulation/ws"):
            return await call_next(request) # Ignore WS handshake here

        # 2. Identify client (IP or Authenticated User)
        # Note: We read the token manually if available, but for simplicity, we use IP + UserAgent as fallback
        client_ip = request.client.host if request.client else "unknown"
        auth_header = request.headers.get("Authorization")
        
        client_identifier = client_ip
        if auth_header and auth_header.startswith("Bearer "):
            # We don't want to decode JWT here to save CPU, just hash the token as ID
            client_identifier = str(hash(auth_header))
            # Potentially boost limit if we had role checking here (e.g. admin limit = 1000)
            # For this MVP, we will stick to a boosted limit for authenticated requests
            limit = limit * 2 

        redis = await get_redis()
        if not redis:
            # If Redis is down, fail open (or closed based on policy, we choose open for resilience)
            logger.warning("Redis not available for rate limiting. Failing open.")
            return await call_next(request)

        current_window = int(time.time() // self.window_seconds)
        redis_key = f"rate_limit:{client_identifier}:{current_window}"

        try:
            # Atomic increment and expire
            pipe = redis.pipeline()
            pipe.incr(redis_key)
            pipe.expire(redis_key, self.window_seconds)
            results = await pipe.execute()
            request_count = results[0]

            if request_count > limit:
                logger.warning(f"Rate limit exceeded for {client_identifier} on {path}")
                return Response(
                    content="Rate limit exceeded", 
                    status_code=429, 
                    headers={"Retry-After": str(self.window_seconds)}
                )
                
            response = await call_next(request)
            
            # Add rate limit headers to successful responses
            response.headers["X-RateLimit-Limit"] = str(limit)
            response.headers["X-RateLimit-Remaining"] = str(max(0, limit - request_count))
            response.headers["X-RateLimit-Reset"] = str(current_window * self.window_seconds + self.window_seconds)
            
            return response
            
        except Exception as e:
            logger.error(f"Rate limiter error: {str(e)}")
            return await call_next(request)
