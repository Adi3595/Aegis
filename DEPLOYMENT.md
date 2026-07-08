# AEGIS AI - Deployment Guide

This guide details the deployment pipeline, infrastructure configuration, and monitoring strategy for the AEGIS AI platform on Microsoft Azure.

## 1. Local Development (Docker Compose)
To run the full stack locally using the production-grade multi-stage Dockerfiles:
```bash
docker-compose up --build
```
This boots PostgreSQL, Redis, FastAPI, and Next.js, and binds the appropriate ports.

## 2. Environment Configuration
The platform relies on environment templates to differentiate environments.
Use the provided templates:
- `.env.local` (Local overrides)
- `.env.staging.example` (Staging environment)
- `.env.production.example` (Production environment)

**Key Azure / Enterprise Flags**:
- `MONITORING_PROVIDER`: Controls whether telemetry goes to stdout (`console`) or Azure Application Insights (`azure`).
- `SECRET_PROVIDER`: Controls whether secrets are read from ENV (`env`) or Azure Key Vault (`keyvault`).
- `RATE_LIMIT_ENABLED`: Protects endpoints against DDoS. Set `true` in production.

## 3. Azure CI/CD Pipeline (GitHub Actions)
The platform defaults to using **GitHub Container Registry (GHCR)** as the container store because it simplifies auth, avoids extra cloud costs for MVP, and integrates directly with Azure App Services.

### Workflow Triggers
- **Pull Request**: `.github/workflows/ci.yml` runs TypeScript checks, ESLint, Python pytest, and validates dependencies.
- **Merge to Main**: `.github/workflows/cd.yml` builds the multi-stage Docker images, tags them with the commit SHA and `latest`, and pushes them to GHCR.

### Azure App Service Deployment
To deploy these images to Azure App Service:
1. Create an **Azure App Service (Linux)**.
2. In the Deployment Center, select **Container Registry**.
3. Choose **GitHub Container Registry (GHCR)**.
4. Input the image: `ghcr.io/[github-username]/aegis-frontend:latest` (and similar for backend).
5. Enable **Continuous Deployment (Webhook)**. Azure will automatically pull new images when GHCR is updated.

## 4. Azure Key Vault & Application Insights Integration
The codebase has been designed with complete architectural abstractions (`IMonitoringProvider` and `ISecretProvider`).

To enable Azure SDKs later:
1. `pip install azure-identity azure-keyvault-secrets azure-monitor-opentelemetry`
2. Update `backend/app/core/secrets/provider.py` and `backend/app/core/monitoring/provider.py` with the actual client logic.
3. Set `MONITORING_PROVIDER=azure` and `SECRET_PROVIDER=keyvault` in your App Service configuration.

No business logic across the platform requires modification.

## 5. Health Checks
Azure App Service can be configured to monitor the platform's health.
- **Frontend Health Route**: `/api/health`
- **Backend Liveness Route**: `/api/v1/health`
- **Backend Readiness Route**: `/api/v1/ready` (Checks PostgreSQL and Redis connections)

## 6. Backups
- **PostgreSQL**: Managed automatically by Azure Database for PostgreSQL Flexible Server (Point-in-time restore, 35-day retention).
- **Redis**: For MVP, cache data is ephemeral. For production, enable AOF persistence in Azure Cache for Redis if durable caching is required.
