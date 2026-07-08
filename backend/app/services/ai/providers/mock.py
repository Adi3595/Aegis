import asyncio
import json
from typing import List, Dict, Any, AsyncGenerator
from .base import BaseAIProvider

class MockAIProvider(BaseAIProvider):
    async def generate(self, prompt: str, context: Dict[str, Any]) -> str:
        await asyncio.sleep(1.0)
        return f"Mock response to: {prompt[:50]}..."

    async def stream(self, prompt: str, context: Dict[str, Any]) -> AsyncGenerator[str, None]:
        response = f"Mock streamed response to: {prompt[:50]}..."
        for word in response.split(" "):
            await asyncio.sleep(0.1)
            yield word + " "

    async def classify(self, query: str) -> List[str]:
        await asyncio.sleep(0.2)
        query = query.lower()
        intents = []
        if "gate" in query or "route" in query: intents.append("navigation")
        if "crowd" in query: intents.append("crowd")
        if "emergency" in query or "fire" in query: intents.append("emergency")
        if "wheelchair" in query: intents.append("accessibility")
        if not intents: intents.append("operations")
        return intents

    async def summarize(self, text: str) -> str:
        await asyncio.sleep(0.5)
        return "Mock summary of the text."

    async def translate(self, text: str, target_language: str) -> str:
        await asyncio.sleep(0.3)
        return f"[Translated to {target_language}]: {text}"

    async def reason(self, agents_output: List[str], context: Dict[str, Any]) -> Dict[str, Any]:
        await asyncio.sleep(1.5)
        is_emergency = any("emergency" in out.lower() for out in agents_output)
        return {
            "id": "rec-mock",
            "title": "Emergency Route Optimization" if is_emergency else "Operational Optimization Plan",
            "summary": "Synthesized inputs from active agents.",
            "reasoning": ["Mock reasoning line 1", "Mock reasoning line 2"],
            "supportingFactors": ["Mock supporting factor"],
            "alternativeOptions": ["Mock alternative"],
            "confidenceScore": 85,
            "affectedZones": ["gate-north"],
            "priority": "Critical" if is_emergency else "High",
            "estimatedImpact": "Expected to normalize crowd distribution.",
            "contributingAgents": []
        }
