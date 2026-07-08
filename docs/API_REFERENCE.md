# API Reference

The backend API is hosted at `/api/v1` and follows standard REST conventions. Authentication is required for most endpoints via a Bearer JWT.

## Health Endpoints
**`GET /health`**
- Returns the current operational status of the backend API.
- **Response**: `{"status": "ok", "version": "1.0.0"}`

**`GET /ready` & `GET /live`**
- Kubernetes/Azure App Service probes.

## Authentication
**`POST /auth/login`**
- **Payload**: `{"email": "admin@aegis.com", "password": "password"}`
- **Response**: `{"access_token": "...", "refresh_token": "...", "role": "admin"}`

## Simulation & Digital Twin
**`GET /simulation/state`**
- Returns the full current JSON state of the Digital Twin (physics, entities, weather).

**`POST /simulation/scenario`**
- Triggers a specific seeded scenario for Demo Mode.
- **Payload**: `{"scenario_id": "HEAVY_RAIN", "seed": 1002}`
- **Response**: `{"message": "Seeded scenario HEAVY_RAIN triggered."}`

**`POST /simulation/speed`**
- Sets the global tick speed of the physics engine.
- **Payload**: `{"speed": 2.5}`

## AI Endpoints
**`POST /ai/chat`**
- Triggers a blocking LangGraph orchestration workflow (REST).
- **Payload**: `{"query": "Help", "context": {...}}`
- **Response**: `Recommendation` JSON object.

**`WebSocket /ai/ws`**
- Streams chunked AI responses and architectural milestones (`request.received`, `context.loaded`).
- **Payload (Send)**: `{"type": "stream_request", "query": "..."}`
- **Payload (Receive)**: `{"type": "milestone", "milestone": "..."}` ➔ `{"type": "stream_chunk", "chunk": "..."}` ➔ `{"type": "stream_end", "metadata": {...}}`

## Notifications
**`GET /notifications`**
- Returns recent notifications based on user role.

**`POST /notifications/broadcast`**
- Admin endpoint to broadcast a notification to specific zones or roles.
