# Environment Variables

AEGIS AI relies on environment variables to control provider implementations, security boundaries, and infrastructure connections without altering application code.

## Frontend (`/.env`)

| Variable | Purpose | Required | Default |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL for the FastAPI backend REST endpoints. | Yes | `http://localhost:8000/api/v1` |
| `NEXT_PUBLIC_WS_URL` | Base URL for the FastAPI backend WebSocket server. | Yes | `ws://localhost:8000/api/v1` |

## Backend (`/backend/.env`)

### Application
| Variable | Purpose | Required | Default |
|---|---|---|---|
| `ENVIRONMENT` | Specifies the running environment (`dev`, `staging`, `prod`). Controls CORS and Logging verbosity. | Yes | `dev` |
| `LOG_LEVEL` | Minimum log severity. | No | `INFO` |

### Security & Authentication
| Variable | Purpose | Required | Default |
|---|---|---|---|
| `JWT_SECRET` | Secret key used to sign access and refresh tokens. | Yes | `super-secret-key-change-me` |
| `JWT_ALGORITHM` | Algorithm used for token signing. | No | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration duration. | No | `30` |

### Providers (Abstraction Layers)
| Variable | Purpose | Required | Default |
|---|---|---|---|
| `SECRET_PROVIDER` | Defines the implementation for secret retrieval (`environment`, `azure_keyvault`). | No | `environment` |
| `MONITORING_PROVIDER` | Defines the telemetry implementation (`console`, `azure_monitor`). | No | `console` |

### Database & Redis (Optional / Future)
| Variable | Purpose | Required | Default |
|---|---|---|---|
| `REDIS_URL` | Connection string for the rate limiter and cache. | No | `redis://localhost:6379/0` |
| `DATABASE_URL` | PostgreSQL connection string. | No | `postgresql://user:pass@localhost:5432/aegis` |

### AI
| Variable | Purpose | Required | Default |
|---|---|---|---|
| `OPENAI_API_KEY` | Key for Azure OpenAI or standard OpenAI services. | Yes | `sk-...` |
