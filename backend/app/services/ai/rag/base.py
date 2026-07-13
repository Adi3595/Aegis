from abc import ABC, abstractmethod
from typing import List

class BaseKnowledgeRetriever(ABC):
    @abstractmethod
    async def retrieve(self, query: str, top_k: int = 3) -> List[str]:
        """Retrieve relevant knowledge chunks for a query."""
        pass
