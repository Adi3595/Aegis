from abc import ABC, abstractmethod
from typing import List, Dict, Any, AsyncGenerator

class BaseAIProvider(ABC):
    
    @abstractmethod
    async def generate(self, prompt: str, context: Dict[str, Any]) -> str:
        """Generate a complete string response."""
        pass

    @abstractmethod
    async def stream(self, prompt: str, context: Dict[str, Any]) -> AsyncGenerator[str, None]:
        """Stream response tokens."""
        pass

    @abstractmethod
    async def classify(self, query: str) -> List[str]:
        """Classify user intent into predefined categories."""
        pass

    @abstractmethod
    async def summarize(self, text: str) -> str:
        """Summarize provided text."""
        pass

    @abstractmethod
    async def translate(self, text: str, target_language: str) -> str:
        """Translate text to the target language."""
        pass

    @abstractmethod
    async def reason(self, agents_output: List[str], context: Dict[str, Any]) -> Dict[str, Any]:
        """Synthesize agent outputs into a structured Recommendation format."""
        pass
