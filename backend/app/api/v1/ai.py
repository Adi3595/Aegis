from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from pydantic import BaseModel
from typing import Dict, Any, Optional
import uuid

from app.services.ai.providers.factory import ai_provider
from app.services.ai.workflow import run_ai_orchestration
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.core.logging import logger

router = APIRouter()

class ChatRequest(BaseModel):
    query: str
    context: Dict[str, Any]

class TranslateRequest(BaseModel):
    text: str
    target_language: str

class SummarizeRequest(BaseModel):
    text: str

@router.get("/health")
async def get_health():
    return {"status": "AI services operational", "provider": ai_provider.__class__.__name__}

@router.post("/chat")
async def chat_with_ai(request: ChatRequest, current_user: User = Depends(get_current_user)):
    """
    Executes the full LangGraph orchestration.
    The response is a structured JSON Recommendation.
    """
    recommendation = await run_ai_orchestration(request.query, request.context)
    return recommendation

@router.post("/translate")
async def translate_text(request: TranslateRequest, current_user: User = Depends(get_current_user)):
    translated = await ai_provider.translate(request.text, request.target_language)
    return {"translated": translated}

@router.post("/summarize")
async def summarize_text(request: SummarizeRequest, current_user: User = Depends(get_current_user)):
    summary = await ai_provider.summarize(request.text)
    return {"summary": summary}

@router.websocket("/ws")
async def websocket_ai_stream(websocket: WebSocket):
    """
    WebSocket for streaming partial AI tokens.
    """
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_json()
            if data.get("type") == "stream_request":
                query = data.get("query", "")
                context = data.get("context", {})
                import asyncio
                
                # Emit simulation milestone events for the Agent Visualizer
                milestones = [
                    "request.received",
                    "context.loaded",
                    "intent.classified",
                    "agents.selected",
                    "generation.started"
                ]
                for milestone in milestones:
                    await websocket.send_json({"type": "milestone", "milestone": milestone})
                    await asyncio.sleep(0.3) # Simulate orchestration delay
                
                # Real complex orchestration is done via REST POST /chat
                # Here we stream the final response token by token
                async for chunk in ai_provider.stream(query, context):
                    await websocket.send_json({
                        "type": "stream_chunk",
                        "chunk": chunk
                    })
                
                # Send structured metadata payload at the end for Explainability Panel
                metadata = {
                    "agents": ["Context Agent", "Predictive Agent"],
                    "confidence": 0.94,
                    "model": "gpt-4",
                    "processing_time": "1.2s",
                    "scenario": context.get("scenario", "Unknown")
                }
                await websocket.send_json({"type": "milestone", "milestone": "response.completed", "metadata": metadata})
                await websocket.send_json({"type": "stream_end"})
            elif data.get("type") == "ping":
                await websocket.send_json({"type": "pong"})
    except WebSocketDisconnect:
        pass
    except Exception as e:
        logger.error(f"WebSocket AI stream error: {e}")
        try:
            await websocket.close()
        except:
            pass
