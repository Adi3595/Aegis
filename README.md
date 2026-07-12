<div align="center">
  <img src="https://img.shields.io/badge/AEGIS-Operational_Intelligence-0A0A0F?style=for-the-badge&logo=shield&logoColor=5B8CFF" alt="AEGIS Logo" />
  <h1 align="center">AEGIS : Operational Intelligence Platform</h1>
  <p align="center">
    <strong>Mission-critical stadium management powered by Digital Twins and Multi-Agent AI.</strong>
  </p>
  
  <p align="center">
    <a href="#-problem-statement">Problem</a> •
    <a href="#-solution-overview">Solution</a> •
    <a href="#-key-features">Features</a> •
    <a href="#-architecture">Architecture</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="docs/DEMO_GUIDE.md">Demo Guide</a>
  </p>
  
  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/Python-3.12-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
    <img src="https://img.shields.io/badge/Azure-Ready-0089D6?style=flat-square&logo=microsoft-azure&logoColor=white" alt="Azure" />
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License" />
  </p>
</div>

---

## 🎯 Problem Statement
Managing large-scale sporting events involves hundreds of disconnected systems, unpredictable crowd behavior, and isolated teams (medical, security, organizers). When an incident occurs, delayed communication and fragmented data can lead to catastrophic failures.

## 💡 Solution Overview
AEGIS AI provides a unified, real-time command center. By combining a **deterministic physics simulation engine** with a live **Digital Twin**, it gives stakeholders a comprehensive view of the stadium. A LangGraph-powered **multi-agent AI copilot** continuously analyzes this data to predict bottlenecks, suggest optimal resource deployment, and explain its reasoning in real time.

## ✨ Key Features

<details>
<summary><strong>1. Deterministic Simulation Engine</strong></summary>
Reproducible crowd dynamics, weather events, and incidents powered by a seeded Python physics backend.
</details>

<details>
<summary><strong>2. Interactive Digital Twin</strong></summary>
3D spatial mapping of crowd density, heatmaps, and active incidents broadcasted over WebSockets.
</details>

<details>
<summary><strong>3. Multi-Agent AI Copilot & Explainability</strong></summary>
Context-aware orchestration for real-time operational advice, featuring an Explainability Panel that provides transparent insight into the AI's confidence, selected agents, and retrieved context.
</details>

<details>
<summary><strong>4. Role-Based Workspaces & PWA</strong></summary>
Tailored dashboards for Fans (PWA offline support), Volunteers, Organizers, Security, and Executives.
</details>

## 👥 Supported User Roles
| Role | Primary Focus |
|---|---|
| 🏟️ **Fan** | Navigation, match updates, multilingual support, offline capabilities |
| 🙋 **Volunteer** | Task management, local zone reporting, offline support |
| 📋 **Organizer** | Global overview, resource dispatch, timeline management |
| 🚨 **Security/Medical** | Incident triage, live queue monitoring, rapid response |
| 📈 **Executive** | High-level KPIs, predictive analytics, sustainability metrics |

## 🏗 Architecture
AEGIS AI operates on a modern, decoupled architecture designed for scale:
- **Frontend**: Next.js (React 19), Tailwind CSS, Zustand, Framer Motion.
- **Backend**: FastAPI (Python 3.12), WebSockets, LangGraph (Simulated).
- **Infrastructure**: Docker, GHCR, designed for Azure (App Service, Key Vault, Monitor).

*See [ARCHITECTURE.md](docs/ARCHITECTURE.md) for full details.*

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- Python 3.12+

### 🐳 Running with Docker Compose (Recommended)
1. Clone the repository and configure `.env` files:
   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   ```
2. Start the stack:
   ```bash
   docker-compose up --build
   ```
3. Access the application at `http://localhost:3000`.

<details>
<summary><strong>💻 Local Native Development</strong></summary>

**Frontend:**
```bash
npm install
npm run dev
```
**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
</details>

## 🗺 Documentation Directory
- 🏗️ [Architecture & Diagrams](docs/ARCHITECTURE.md)
- 🔌 [API Reference](docs/API_REFERENCE.md)
- 🔐 [Environment Variables](docs/ENVIRONMENT.md)
- 🚢 [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- 🎥 [Demo Guide & Script](docs/DEMO_GUIDE.md)
- 📊 [Feature Matrix](docs/FEATURE_MATRIX.md)
- 🛣️ [Limitations & Future Roadmap](docs/LIMITATIONS_AND_ROADMAP.md)
- 📝 [Hackathon Submission Summaries](docs/HACKATHON_SUBMISSION.md)

## 📄 License
This project is licensed under the [MIT License](LICENSE).
