import json
from typing import Dict, Any, List, TypedDict, Optional
from langgraph.graph import StateGraph, END
from app.core.logging import logger
from .providers.factory import ai_provider
from .prompts.system import SYSTEM_PROMPT, AGENT_PROMPTS
from .rag.mock_retriever import retriever

# Define the State for the workflow
class AgentState(TypedDict):
    query: str
    context: Dict[str, Any]
    intents: List[str]
    retrieved_knowledge: List[str]
    agent_responses: Dict[str, str]
    final_recommendation: Optional[Dict[str, Any]]

# Node: Context Loader & Knowledge Retrieval
async def load_context_node(state: AgentState) -> AgentState:
    logger.info("LangGraph Node: Load Context")
    query = state["query"]
    # Retrieve RAG context
    knowledge = await retriever.retrieve(query)
    return {"retrieved_knowledge": knowledge}

# Node: Intent Classification
async def classify_intent_node(state: AgentState) -> AgentState:
    logger.info("LangGraph Node: Classify Intent")
    query = state["query"]
    intents = await ai_provider.classify(query)
    if not intents:
        intents = ["operations"]
    return {"intents": intents}

# Node: Agent Execution
async def execute_agents_node(state: AgentState) -> AgentState:
    logger.info("LangGraph Node: Execute Agents")
    intents = state.get("intents", ["operations"])
    context = state.get("context", {})
    knowledge = state.get("retrieved_knowledge", [])
    
    agent_responses = {}
    
    # We execute all requested agents sequentially here for simplicity, 
    # but they can be wrapped in asyncio.gather for true parallel execution.
    # We will simulate parallel execution via a loop for now.
    import asyncio
    
    async def run_agent(intent: str):
        agent_prompt = AGENT_PROMPTS.get(intent, "Analyze the situation and provide operations support.")
        full_prompt = f"Agent Persona: {agent_prompt}\nQuery: {state['query']}\nRelevant Knowledge: {knowledge}"
        try:
            response = await ai_provider.generate(full_prompt, context)
            return intent, response
        except Exception as e:
            logger.error(f"Agent {intent} failed: {e}")
            return intent, f"Failed to get response from {intent} agent."

    tasks = [run_agent(intent) for intent in intents]
    results = await asyncio.gather(*tasks)
    
    for intent, response in results:
        agent_responses[intent] = response
        
    return {"agent_responses": agent_responses}

# Node: Aggregation & Recommendation Building
async def aggregate_recommendation_node(state: AgentState) -> AgentState:
    logger.info("LangGraph Node: Aggregate Recommendation")
    agent_responses_list = list(state.get("agent_responses", {}).values())
    context = state.get("context", {})
    
    recommendation = await ai_provider.reason(agent_responses_list, context)
    
    # Inject which agents actually contributed
    if recommendation:
        recommendation["contributingAgents"] = list(state.get("agent_responses", {}).keys())
    
    return {"final_recommendation": recommendation}

# Build the Graph
workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("load_context", load_context_node)
workflow.add_node("classify", classify_intent_node)
workflow.add_node("execute_agents", execute_agents_node)
workflow.add_node("aggregate", aggregate_recommendation_node)

# Add edges
workflow.set_entry_point("load_context")
workflow.add_edge("load_context", "classify")
workflow.add_edge("classify", "execute_agents")
workflow.add_edge("execute_agents", "aggregate")
workflow.add_edge("aggregate", END)

# Compile graph
app_workflow = workflow.compile()

async def run_ai_orchestration(query: str, context: Dict[str, Any]) -> Dict[str, Any]:
    """Execute the full LangGraph orchestration."""
    initial_state = {
        "query": query,
        "context": context,
        "intents": [],
        "retrieved_knowledge": [],
        "agent_responses": {},
        "final_recommendation": None
    }
    
    # Run the graph
    final_state = await app_workflow.ainvoke(initial_state)
    
    # Return the recommendation
    rec = final_state.get("final_recommendation")
    if not rec:
        # Fallback if reasoning failed
        rec = {
            "id": "rec-fallback",
            "title": "Fallback Recommendation",
            "summary": "The AI orchestration failed to synthesize a valid JSON recommendation.",
            "reasoning": [],
            "supportingFactors": [],
            "alternativeOptions": [],
            "confidenceScore": 0,
            "affectedZones": [],
            "priority": "Low",
            "estimatedImpact": "None",
            "contributingAgents": final_state.get("intents", [])
        }
    return rec
