from app.core.config import settings
from app.core.logging import logger
from .base import BaseAIProvider
from .mock import MockAIProvider
from .azure import AzureOpenAIProvider
from .groq import GroqProvider

def get_ai_provider() -> BaseAIProvider:
    if settings.GROQ_API_KEY:
        provider = GroqProvider()
        if provider.model:
            return provider
        else:
            logger.warning("Failed to initialize GroqProvider. Falling back to MockAIProvider.")
            return MockAIProvider()

    if settings.AZURE_OPENAI_API_KEY:
        provider = AzureOpenAIProvider()
        if provider.chat_model:
            return provider
        else:
            logger.warning("Failed to initialize Azure OpenAI models. Falling back to MockAIProvider.")
            return MockAIProvider()

    logger.warning("No AI API keys set (Azure or Groq). Falling back to MockAIProvider.")
    return MockAIProvider()

# Singleton instance
ai_provider = get_ai_provider()
