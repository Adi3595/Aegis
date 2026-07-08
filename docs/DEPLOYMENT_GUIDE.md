# Deployment Guide

AEGIS AI is containerized and built for seamless deployment using GitHub Actions and Microsoft Azure.

## 1. Local Development
For native local development, see the `README.md`.

## 2. Docker Compose (MVP)
The simplest way to deploy the entire stack locally or on a single VM.
```bash
docker-compose up --build -d
```
This boots the Next.js `standalone` image and the optimized FastAPI Uvicorn image.

## 3. GitHub Actions (CI/CD)
The `.github/workflows` directory contains two pipelines:
- **`ci.yml`**: Triggers on PRs. Runs linting, type-checking, and `pytest`.
- **`cd.yml`**: Triggers on merges to `main`. Builds the multi-stage Docker images and pushes them to the **GitHub Container Registry (GHCR)** tagged with the commit SHA.

## 4. Deploying to Microsoft Azure (Production)
AEGIS AI's abstract provider architecture makes it native to Azure services.

### Azure App Service for Containers
1. Create a Linux App Service Plan in Azure.
2. Create two Web Apps for Containers (Frontend and Backend).
3. Configure the Container settings to pull from GHCR (`ghcr.io/your-org/aegis-frontend:main`).
4. Set the necessary environment variables in the App Service Configuration (see `ENVIRONMENT.md`).
5. **Webhook Integration**: Add the App Service webhook URL to your GitHub Repository settings to trigger automatic container restarts when `cd.yml` pushes a new image.

### Enabling Azure Services via Config
You do not need to rewrite any code to leverage Azure infrastructure. Simply install the respective Azure Python SDKs in `backend/requirements.txt` and flip the environment variables:
```env
MONITORING_PROVIDER=azure_monitor
SECRET_PROVIDER=azure_keyvault
```
The application will automatically inject the Azure implementations of `IMonitoringProvider` and `ISecretProvider`.
