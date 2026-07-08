import time
import uuid
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from .logging import logger

class RequestContextMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
        request.state.request_id = request_id
        
        start_time = time.time()
        
        # Log request start (can be skipped for verbose paths like /health)
        if request.url.path not in ["/api/v1/health"]:
            logger.info("request_started", path=request.url.path, method=request.method, request_id=request_id)
            
        try:
            response = await call_next(request)
            
            process_time = time.time() - start_time
            response.headers["X-Process-Time"] = str(process_time)
            response.headers["X-Request-ID"] = request_id
            
            if request.url.path not in ["/api/v1/health"]:
                logger.info(
                    "request_finished", 
                    path=request.url.path, 
                    method=request.method, 
                    status_code=response.status_code, 
                    process_time=process_time,
                    request_id=request_id
                )
                
            return response
        except Exception as e:
            process_time = time.time() - start_time
            logger.error(
                "request_failed",
                path=request.url.path,
                method=request.method,
                error=str(e),
                process_time=process_time,
                request_id=request_id
            )
            raise e
