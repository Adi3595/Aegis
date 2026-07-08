# Limitations and Future Roadmap

## Known MVP Limitations
1. **Mocked Database**: The current MVP utilizes in-memory state and mocked databases for rapid hackathon iteration. Persistent storage (PostgreSQL) is stubbed via `.env` but not strictly enforced across all modules.
2. **Mocked LangGraph Nodes**: True LangGraph Python execution can be slow and expensive. The current AI backend simulates the multi-agent pipeline and emits real milestones, but routes to a single LLM provider for the MVP.
3. **Voice Assistant Browser Dependency**: The `BrowserVoiceProvider` relies on the Web Speech API, which behaves inconsistently across different browsers (e.g., Firefox vs. Chrome).
4. **Digital Twin Scale**: The 3D Digital Twin rendering is currently a DOM/CSS-based abstraction. For a 100,000-seat stadium, a WebGL (Three.js) implementation is required for performance.

---

## Future Roadmap

### Short-Term (1-3 Months)
- **Azure Monitor Integration**: Activate the `AzureMonitoringProvider` to pipe all structured JSON logs directly to Application Insights.
- **Azure Key Vault**: Activate the `AzureKeyVaultProvider` for secure secret fetching in production.
- **PostgreSQL Migration**: Swap the in-memory data stores for Entity Framework / SQLAlchemy bindings.

### Medium-Term (3-6 Months)
- **True LangGraph Deployment**: Deploy individual LangGraph nodes as scalable Azure Functions, passing state between them via Redis.
- **WebGL Digital Twin**: Rewrite the `StadiumMap` component using `@react-three/fiber` for true 3D spatial rendering and camera controls.
- **Azure AI Speech**: Implement the `AzureSpeechProvider` to bypass browser limitations and provide consistent, low-latency multilingual TTS and STT.

### Long-Term (6+ Months)
- **IoT Hardware Integration**: Connect the Simulation Engine to physical turnstile APIs and BLE beacons rather than generating randomized scenarios.
- **Computer Vision Agent**: Integrate a LangGraph agent capable of ingesting RTSP camera streams to identify crowd surges visually before the physics engine calculates them.
