from fastapi import Request, status
from fastapi.responses import JSONResponse
from typing import Any, Dict, Optional

class APIException(Exception):
    def __init__(
        self,
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR,
        code: str = "internal_error",
        message: str = "An unexpected error occurred.",
        details: Optional[Dict[str, Any]] = None,
    ):
        self.status_code = status_code
        self.code = code
        self.message = message
        self.details = details or {}

async def api_exception_handler(request: Request, exc: APIException) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": {
                "code": exc.code,
                "message": exc.message,
                "details": exc.details
            }
        }
    )

async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    # In a real app, log the exception stack trace here
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": {
                "code": "unhandled_exception",
                "message": "A critical system error occurred.",
                "details": {"type": str(type(exc).__name__)}
            }
        }
    )
