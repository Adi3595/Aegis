<div align="center">
  <img src="public/logo.svg" alt="AEGIS Logo" width="120" />
  <h1 align="center">AEGIS : Operational Intelligence Platform</h1>
  <p align="center">
    <strong>Mission-critical stadium management powered by Digital Twins and Multi-Agent Systems.</strong>
  </p>
  
  <p align="center">
    <a href="#-problem-statement">Problem</a> •
    <a href="#-solution-overview">Solution</a> •
    <a href="#-key-features">Features</a> •
    <a href="#-architecture">Architecture</a> •
    <a href="#-quick-start">Quick Start</a>
  </p>
  
  <p align="center">
    <a href="https://github.com/Adi3595/Aegis"><img src="https://img.shields.io/badge/Live_Demo-View_Dashboard-5B8CFF?style=for-the-badge" alt="Live Demo" /></a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/Python-3.12-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
    <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel" alt="Vercel" />
    <img src="https://img.shields.io/badge/Render-Deployed-000000?style=flat-square&logo=render" alt="Render" />
  </p>
</div>

---

## 🎯 Problem Statement
Managing large-scale sporting events involves hundreds of disconnected systems, unpredictable crowd behavior, and isolated teams (medical, security, organizers). When an incident occurs, delayed communication and fragmented data can lead to catastrophic failures.

## 💡 Solution Overview
**AEGIS** provides a unified, real-time command center. By combining a **deterministic physics simulation engine** with a live **3D Digital Twin**, it gives stakeholders a comprehensive, god's-eye view of the stadium. A **multi-agent orchestration network** continuously analyzes this data to predict bottlenecks, suggest optimal resource deployment, and automatically coordinate cross-functional teams.

## ✨ Key Features

<details open>
<summary><strong>🎮 Interactive Digital Twin & 3D Terrain</strong></summary>
A fully interactive, Three.js-powered 3D spatial mapping of the stadium that tracks crowd density, heatmaps, and active incidents broadcasted over real-time WebSockets.
</details>

<details open>
<summary><strong>🎭 Unified Persona Login Grid</strong></summary>
Instantly switch between roles (Executive, Organizer, Security, Medical, Volunteer, Fan) using our mock Persona authentication system to test role-based access control.
</details>

<details open>
<summary><strong>🧠 Multi-Agent Orchestration</strong></summary>
Context-aware orchestration for real-time operational advice, featuring an interactive Multi-Agent Network node visualization and Explainability Panel.
</details>

<details open>
<summary><strong>📱 Dedicated Sub-Dashboards</strong></summary>
Tailored UI modules for Analytics, Reports, Settings, Support, and Live Telemetry customized to the specific clearance level of the user.
</details>

## 👥 Supported User Roles
| Persona | Access Clearance | Primary Dashboard Focus |
|---|---|---|
| 🏟️ **Fan** | Level 1 | Navigation, match updates, multilingual support, offline capabilities |
| 🙋 **Volunteer** | Level 2 | Task management, local zone reporting, offline support |
| 🚨 **Security** | Level 3 | Incident triage, live queue monitoring, rapid response |
| ⚕️ **Medical** | Level 3 | Emergency dispatches, triage queues, resource tracking |
| 📋 **Organizer** | Level 4 | Global overview, resource dispatch, timeline management |
| 📈 **Executive** | Level 5 | High-level KPIs, predictive analytics, sustainability metrics |

## 🏗 Architecture

```mermaid
graph TD
    subgraph Frontend [Next.js Web Application]
        UI[React 19 / Framer Motion]
        Z[Zustand State]
        Three[Three.js Digital Twin]
    end

    subgraph Backend [FastAPI Server]
        API[REST APIs]
        WS[WebSocket Manager]
        SIM[Physics Simulation Engine]
        MA[Multi-Agent Orchestrator]
    end

    UI --> Z
    UI --> Three
    Z <-->|HTTP/WS| API
    Three <-->|Real-time Data| WS
    API --- SIM
    API --- MA
```

## 🚀 Quick Start

### 🌍 Cloud Deployment (Active)
The project is already live and fully configured!
- **Frontend**: Deployed on Vercel
- **Backend API**: Deployed on Render (`https://aegis-backend-qlx8.onrender.com`)

### 💻 Local Native Development

**1. Clone & Install**
```bash
git clone https://github.com/Adi3595/Aegis.git
cd Aegis
npm install
```

**2. Configure Environment**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=https://aegis-backend-qlx8.onrender.com/api/v1
NEXT_PUBLIC_WS_URL=wss://aegis-backend-qlx8.onrender.com/api/v1
```

**3. Run the Frontend**
```bash
npm run dev
```
Access the application at `http://localhost:3000`.

## 📄 License
This project is licensed under the [MIT License](LICENSE).
