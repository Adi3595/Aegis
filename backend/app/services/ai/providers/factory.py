from app.core.config import settings
from app.core.logging import logger
from .base import BaseAIProvider
from .mock import MockAIProvider
from .azure import AzureOpenAIProvider

def get_ai_provider() -> BaseAIProvider:
    if not settings.AZURE_OPENAI_API_KEY:
        logger.warning("AZURE_OPENAI_API_KEY is not set. Falling back to MockAIProvider.")
        return MockAIProvider()
    
    provider = AzureOpenAIProvider()
    if not provider.chat_model:
        logger.warning("Failed to initialize Azure OpenAI models. Falling back to MockAIProvider.")
        return MockAIProvider()
        
    return provider

# Singleton instance
ai_provider = get_ai_provider()
