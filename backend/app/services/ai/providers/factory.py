from app.core.config import settings
from app.core.logging import logger
from .base import BaseAIProvider
from .mock import MockAIProvider
from .groq import GroqProvider

def get_ai_provider() -> BaseAIProvider:
    if settings.GROQ_API_KEY:
        provider = GroqProvider()
        if provider.model:
            return provider
        else:
            logger.warning("Failed to initialize GroqProvider. Falling back to MockAIProvider.")
            return MockAIProvider()

    logger.warning("GROQ_API_KEY is not set. Falling back to MockAIProvider.")
    return MockAIProvider()

# Singleton instance
ai_provider = get_ai_provider()
