# AEGIS AI - Platform Architecture & Production Guide

## 1. System Overview
AEGIS AI is a modern intelligence operating system designed for mega-events (e.g., FIFA World Cup 2026). It employs a deterministic simulation engine running in a Python/FastAPI backend, which broadcasts real-time telemetry to a Next.js 15 frontend via WebSockets and Redis Pub/Sub.

## 2. Frontend Architecture (Next.js 15)
- **Framework**: Next.js App Router (React 19).
- **State Management**: Zustand (modular slices for Auth, Layout, Chat, Simulation, Voice, Notifications).
- **Styling**: Tailwind CSS with standard `cn()` utilities and Framer Motion for micro-animations.
- **PWA / Offline**: A custom Service Worker (`public/sw.js`) provides an offline shell and aggressively caches static assets, fonts, and maps while falling back to network-first for live APIs.
- **Performance**: Heavy visualizations (Recharts, 3D maps) are lazy-loaded via `next/dynamic` to ensure the core bundle remains minimal.

## 3. Backend Architecture (FastAPI)
- **Framework**: FastAPI (Async Python 3.10+).
- **Database**: PostgreSQL (via asyncpg / SQLAlchemy) + Alembic migrations.
- **Real-time Pipeline**: 
  1. `simulation_service.py` loops and updates physics state.
  2. The state is dumped into Redis Pub/Sub.
  3. `websocket_manager.py` listens to Redis and broadcasts JSON to all connected Next.js clients.
- **AI Orchestration**: LangGraph coordinates autonomous agents. Chat history is managed by `persistence_service.py` (which periodically dumps Redis in-memory chat logs to Postgres).
- **Security**: 
  - `RateLimitMiddleware`: Custom Redis sliding-window throttling. Configurable per-IP, per-User, and per-Endpoint.
  - `SecurityHeadersMiddleware`: Enforces HSTS, X-Frame-Options, CSP, and MIME-sniffing prevention.

## 4. Production Deployment Checklist
Before pushing to production, verify the following NFRs (Non-Functional Requirements):

### Security
- [ ] Ensure `.env` vars `RATE_LIMIT_ENABLED=true`
- [ ] Ensure `NODE_ENV=production` to disable the Diagnostics Dashboard.
- [ ] Confirm Content Security Policy (CSP) in `next.config.ts` matches production domains.

### Performance
- [ ] Verify `npm run build` completes without Next.js deopt warnings.
- [ ] Ensure Redis is provisioned with adequate memory and eviction policies (e.g., `allkeys-lru`).

### Resilience
- [ ] Test application in offline mode (Network tab -> Offline) to ensure `sw.js` serves the offline UI.
- [ ] Test the Global Error Boundary by manually throwing an error in a route.

## 5. Developer Tools
- **Diagnostics Dashboard**: Navigate to `/dashboard/admin/diagnostics`. This page aggregates memory usage, WebSocket latency, API times, and backend error logs. *Note: Only visible to Administrators when `NODE_ENV === "development"`.*
