import json
from typing import List, Dict, Any, AsyncGenerator
from langchain_openai import AzureChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from app.core.config import settings
from app.core.logging import logger
from .base import BaseAIProvider

class AzureOpenAIProvider(BaseAIProvider):
    def __init__(self):
        # We initialize the clients lazily or catch errors to allow graceful fallback
        try:
            self.chat_model = AzureChatOpenAI(
                api_key=settings.AZURE_OPENAI_API_KEY,
                azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
                api_version=settings.AZURE_OPENAI_API_VERSION,
                azure_deployment=settings.AZURE_OPENAI_CHAT_DEPLOYMENT,
            )
            self.fast_model = AzureChatOpenAI(
                api_key=settings.AZURE_OPENAI_API_KEY,
                azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
                api_version=settings.AZURE_OPENAI_API_VERSION,
                azure_deployment=settings.AZURE_OPENAI_FAST_DEPLOYMENT,
            )
        except Exception as e:
            logger.error(f"Failed to initialize AzureOpenAIProvider: {e}")
            self.chat_model = None
            self.fast_model = None

    def _get_model(self, use_fast: bool = False):
        model = self.fast_model if use_fast else self.chat_model
        if not model:
            raise ValueError("Azure OpenAI not configured correctly")
        return model

    async def generate(self, prompt: str, context: Dict[str, Any]) -> str:
        model = self._get_model()
        system_msg = SystemMessage(content=f"Context: {json.dumps(context)}")
        human_msg = HumanMessage(content=prompt)
        response = await model.ainvoke([system_msg, human_msg])
        return str(response.content)

    async def stream(self, prompt: str, context: Dict[str, Any]) -> AsyncGenerator[str, None]:
        model = self._get_model()
        system_msg = SystemMessage(content=f"Context: {json.dumps(context)}")
        human_msg = HumanMessage(content=prompt)
        async for chunk in model.astream([system_msg, human_msg]):
            if chunk.content:
                yield str(chunk.content)

    async def classify(self, query: str) -> List[str]:
        model = self._get_model(use_fast=True)
        # Using fast model with fallback to main if it fails
        prompt = (
            "Classify the following query into zero or more of these categories: "
            "navigation, crowd, emergency, accessibility, transportation, weather, "
            "medical, security, volunteer, sustainability, food, translation, operations. "
            "Output only a comma-separated list of categories, nothing else. "
            f"Query: {query}"
        )
        try:
            response = await model.ainvoke([HumanMessage(content=prompt)])
            cats = [c.strip() for c in str(response.content).split(",")]
            return [c for c in cats if c]
        except Exception as e:
            logger.warning(f"Fast model classification failed, trying fallback: {e}")
            model = self._get_model(use_fast=False)
            response = await model.ainvoke([HumanMessage(content=prompt)])
            cats = [c.strip() for c in str(response.content).split(",")]
            return [c for c in cats if c]

    async def summarize(self, text: str) -> str:
        model = self._get_model(use_fast=True)
        response = await model.ainvoke([HumanMessage(content=f"Summarize this concisely: {text}")])
        return str(response.content)

    async def translate(self, text: str, target_language: str) -> str:
        model = self._get_model(use_fast=True)
        prompt = f"Translate the following text to {target_language}. Return ONLY the translation.\n\n{text}"
        response = await model.ainvoke([HumanMessage(content=prompt)])
        return str(response.content)

    async def reason(self, agents_output: List[str], context: Dict[str, Any]) -> Dict[str, Any]:
        model = self._get_model()
        system_prompt = (
            "You are the master Orchestrator for AEGIS AI. "
            "Synthesize the outputs from specialized agents into a single JSON Recommendation. "
            "The JSON must have this exact structure: "
            '{"id": "rec-123", "title": "...", "summary": "...", "reasoning": ["...", "..."], '
            '"supportingFactors": ["..."], "alternativeOptions": ["..."], "confidenceScore": 85, '
            '"affectedZones": ["zone-id"], "priority": "High", "estimatedImpact": "...", '
            '"contributingAgents": ["crowd", "security"]}. '
            "Return ONLY raw JSON, no markdown."
        )
        user_prompt = f"Agent Outputs: {json.dumps(agents_output)}\nContext: {json.dumps(context)}"
        response = await model.ainvoke([SystemMessage(content=system_prompt), HumanMessage(content=user_prompt)])
        try:
            content = str(response.content).strip()
            if content.startswith("```json"):
                content = content[7:-3]
            return json.loads(content)
        except Exception as e:
            logger.error(f"Failed to parse reasoning JSON: {e}\nResponse: {response.content}")
            return {}
