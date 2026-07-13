from typing import List
from .base import BaseKnowledgeRetriever

class MockRetriever(BaseKnowledgeRetriever):
    async def retrieve(self, query: str, top_k: int = 3) -> List[str]:
        # In a real implementation, this would use Azure AI Search (Vector Search)
        return [
            "Standard Operating Procedure 4A: In case of gate congestion, reroute to adjacent gates.",
            "Emergency Protocol E-1: Maintain clear paths for medical personnel in all concourses.",
            "FIFA Guideline 12: VIP arrivals require 15 minutes of pre-cleared routes."
        ]

retriever = MockRetriever()
