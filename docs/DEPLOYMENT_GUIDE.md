# Deployment Guide: Vercel + Render (Hybrid)

AEGIS AI utilizes a decoupled architecture. To maintain persistent WebSocket connections for the Simulation Engine and Digital Twin, the backend is deployed as a Docker container on Render, while the frontend is deployed as a serverless Next.js application on Vercel.

## 1. Backend Deployment (Render)

We use Render's Infrastructure as Code (IaC) feature via the included `render.yaml` file. This automatically provisions the Dockerized FastAPI backend, a PostgreSQL database, and a Redis instance.

### Steps
1. Create a free account on [Render.com](https://render.com).
2. Go to the Dashboard and click **New > Blueprint**.
3. Connect your GitHub repository (`Adi3595/Aegis`).
4. Render will detect the `render.yaml` file in the root directory.
5. In the Render UI, it will ask you to supply the missing sync-false environment variables:
   - `AZURE_OPENAI_API_KEY`: Your Azure OpenAI Key.
   - `AZURE_OPENAI_ENDPOINT`: Your Azure OpenAI Endpoint.
6. Click **Apply**.
7. Render will spin up:
   - `aegis-postgres` (Database)
   - `aegis-redis` (Cache/Rate Limiting)
   - `aegis-backend` (FastAPI Server)

### Database Migration Steps
Once the backend service is running on Render:
1. In the Render Dashboard, click on your `aegis-backend` service.
2. Go to the **Shell** tab (this connects you directly to the running Docker container).
3. Run the Alembic migrations to build the tables:
   ```bash
   alembic upgrade head
   ```

*(Note: The `DATABASE_URL` and `REDIS_URL` are automatically injected into the backend container by the `render.yaml` configuration).*

---

## 2. Frontend Deployment (Vercel)

Vercel will host the Next.js frontend, providing edge-caching, static asset optimization, and automatic SSL.

### Steps
1. Create a free account on [Vercel.com](https://vercel.com).
2. Click **Add New > Project**.
3. Import your GitHub repository (`Adi3595/Aegis`).
4. Vercel will automatically detect the framework as **Next.js**.
5. Open the **Environment Variables** section and add the following:
   - `NEXT_PUBLIC_API_URL`: The HTTPS URL of your Render backend (e.g., `https://aegis-backend-xyz.onrender.com/api/v1`)
   - `NEXT_PUBLIC_WS_URL`: The Secure WebSocket URL of your Render backend (e.g., `wss://aegis-backend-xyz.onrender.com/api/v1`)
6. Click **Deploy**.

---

## 3. Post-Deployment Configuration

### CORS Configuration
By default, the backend needs to know the exact URL of your Vercel frontend to allow cross-origin requests.
1. After Vercel finishes deploying, copy your production URL (e.g., `https://aegis-123.vercel.app`).
2. Go back to the **Render Dashboard > aegis-backend > Environment**.
3. Update the `BACKEND_CORS_ORIGINS` variable to match your Vercel URL.
4. Render will automatically restart the backend container.

---

## 4. Post-Deployment Verification Checklist

Once both services are green, navigate to your Vercel URL and verify the following:

- [ ] **Authentication**: Can you log in as `admin@aegis.com`? (Validates PostgreSQL connection and JWT issuance).
- [ ] **Digital Twin**: Navigate to the Digital Twin tab. Do the 3D assets render? 
- [ ] **Real-time WebSockets**: In the Digital Twin, do you see the live metrics (Crowd Density, Status) updating without refreshing the page? (Validates WebSocket connectivity through Render).
- [ ] **AI Orchestration**: Open the AI Copilot and ask a question. Does the Agent Visualizer animate, and do you receive a response? (Validates Azure OpenAI connection and WS streaming).
- [ ] **Rate Limiting**: Refresh the page rapidly 10 times. Do you receive a `429 Too Many Requests`? (Validates Redis connection).

---

## 5. Architecture & Future Scaling

This deployment architecture is provider-agnostic. 

If you decide to scale to **Microsoft Azure** in the future:
- **Frontend**: Move to Azure Static Web Apps.
- **Backend**: Move the Docker image to Azure App Service for Containers.
- **Databases**: Swap Render Postgres/Redis for Azure Database for PostgreSQL and Azure Cache for Redis.
- **Code Changes Required**: `0`. Only the environment variables need to change.
