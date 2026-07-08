# Hackathon Demo Guide

This guide is designed for a 5–7 minute live presentation to judges. It highlights AEGIS AI's core capabilities: Real-time digital twins, deterministic physics simulation, and multi-agent AI orchestration.

## 1. Landing Page (0:00 - 0:30)
- **Action**: Open `http://localhost:3000`.
- **Talking Point**: "Welcome to AEGIS AI, the operational intelligence platform for global sporting events. We solve the problem of siloed communication by providing a unified, real-time command center."

## 2. Authentication & Admin Console (0:30 - 1:00)
- **Action**: Log in as `admin@aegis.com`. Navigate via Sidebar -> Admin Console -> Demo Control.
- **Talking Point**: "We utilize a secure, RBAC (Role-Based Access Control) architecture. As an admin, I have access to the Demo Control Center, which allows me to orchestrate live, deterministic physics simulations."
- **Action**: Toggle **Demo Mode ON**.

## 3. Trigger Demo Scenario (1:00 - 2:00)
- **Action**: Click the **Severe Weather (Heavy Rain)** scenario in the launcher.
- **Talking Point**: "By triggering this scenario, our backend Python simulation engine seeds a deterministic physics model. This ensures crowd movement, transport delays, and medical incident generation are entirely reproducible for this presentation."

## 4. Live Digital Twin & Executive KPIs (2:00 - 3:30)
- **Action**: Navigate to the **Digital Twin** tab. Let the Guided Tour overlay trigger automatically (or press 'Start Full Presentation Tour' in the Admin Console).
- **Talking Point**: "Notice the Digital Twin reacting to the scenario. The top KPIs—Crowd Density, Medical Load—are updating in real-time via WebSockets as the simulation engine recalculates flow rates at the stadium gates due to the rain."

## 5. AI Copilot & Explainability (3:30 - 5:00)
- **Action**: Open the AI Copilot on the right panel. Type: *"What are the risks of the Heavy Rain scenario at Gate A?"*
- **Talking Point**: "Here is our LangGraph multi-agent orchestrator. Watch the visualizer."
- **Action**: Point to the **Agent Visualizer** as it animates (Request Received ➔ Context Loaded ➔ Intent Classified ➔ Agents Selected).
- **Talking Point**: "The AI isn't just a basic chatbot. It's pulling live physics context. When it answers, we provide an **Explainability Panel** disclosing the confidence score, the specific agents used (e.g., Security Agent, Weather Agent), and the processing time. We don't hallucinate chain-of-thought; we prove execution."

## 6. Sustainability & Post-Match (5:00 - 6:00)
- **Action**: Navigate to the **Analytics** / **Executive** dashboard.
- **Talking Point**: "Finally, AEGIS AI isn't just for emergencies. We track live carbon footprints, water consumption, and generate post-match reports for long-term sustainability optimization."
- **Closing**: "AEGIS AI is fully dockerized, built on a modular provider architecture ready for Microsoft Azure, and designed to keep fans safe and operations seamless."
