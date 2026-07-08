from typing import Protocol, Any, Dict
import os
import structlog
import time

# Configure structlog for JSON formatting
structlog.configure(
    processors=[
        structlog.stdlib.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer()
    ]
)
log = structlog.get_logger()

class IMonitoringProvider(Protocol):
    def track_request(self, method: str, path: str, status: int, duration_ms: float): ...
    def track_event(self, name: str, properties: Dict[str, Any] = None): ...
    def track_exception(self, exception: Exception, properties: Dict[str, Any] = None): ...
    def track_metric(self, name: str, value: float, properties: Dict[str, Any] = None): ...

class ConsoleMonitoringProvider:
    def track_request(self, method: str, path: str, status: int, duration_ms: float):
        log.info("request", method=method, path=path, status=status, duration_ms=duration_ms)

    def track_event(self, name: str, properties: Dict[str, Any] = None):
        log.info("event", event_name=name, **(properties or {}))

    def track_exception(self, exception: Exception, properties: Dict[str, Any] = None):
        log.error("exception", error=str(exception), **(properties or {}))

    def track_metric(self, name: str, value: float, properties: Dict[str, Any] = None):
        log.info("metric", metric_name=name, value=value, **(properties or {}))

class AzureMonitoringProvider:
    """
    Placeholder for Azure Application Insights integration.
    To implement:
      1. pip install azure-monitor-opentelemetry
      2. Configure configure_azure_monitor()
      3. Map tracks to Azure SDK telemetry client
    """
    def __init__(self):
        # Fallback to structured logging for MVP
        self.fallback = ConsoleMonitoringProvider()

    def track_request(self, method: str, path: str, status: int, duration_ms: float):
        self.fallback.track_request(method, path, status, duration_ms)

    def track_event(self, name: str, properties: Dict[str, Any] = None):
        self.fallback.track_event(name, properties)

    def track_exception(self, exception: Exception, properties: Dict[str, Any] = None):
        self.fallback.track_exception(exception, properties)

    def track_metric(self, name: str, value: float, properties: Dict[str, Any] = None):
        self.fallback.track_metric(name, value, properties)

def get_monitoring_provider() -> IMonitoringProvider:
    provider = os.getenv("MONITORING_PROVIDER", "console").lower()
    if provider == "azure":
        return AzureMonitoringProvider()
    return ConsoleMonitoringProvider()

# Global instance
monitor = get_monitoring_provider()
