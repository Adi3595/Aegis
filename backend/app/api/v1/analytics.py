from fastapi import APIRouter, Query
from app.services.analytics_service import analytics_service

router = APIRouter()

@router.get("/historical")
async def get_historical_analytics(
    scenario: str = Query("Normal Match Day", description="The simulation scenario to generate data for"),
    duration_minutes: int = Query(120, description="Duration in minutes")
):
    """
    Returns deterministic historical timeseries data for the Executive Dashboard charts.
    """
    data = analytics_service.generate_historical_trends(scenario=scenario, duration_minutes=duration_minutes)
    return {"scenario": scenario, "data": data}

@router.get("/predictions")
async def get_predictive_analytics(
    scenario: str = Query("Normal Match Day", description="The simulation scenario"),
    current_minute: int = Query(60, description="Current minute to predict from")
):
    """
    Returns AI-forecasted predictive data for the next 30 minutes.
    """
    data = analytics_service.generate_predictions(scenario=scenario, current_minute=current_minute)
    return {"scenario": scenario, "current_minute": current_minute, "predictions": data}
