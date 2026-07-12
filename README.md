<div align="center">
  <h1 align="center">AEGIS | Stadium Intelligence Platform</h1>
  <p align="center">
    <strong>Mission-critical stadium management powered by Digital Twins, 3D visualization, and Multi-Agent Systems.</strong>
  </p>
  
  <p align="center">
    <a href="https://aegis-five-umber.vercel.app"><img src="https://img.shields.io/badge/Live_Demo-View_Platform-10B981?style=for-the-badge" alt="Live Demo" /></a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-16_Turbopack-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React_Three_Fiber-3D-000000?style=flat-square" alt="R3F" />
    <img src="https://img.shields.io/badge/TailwindCSS-Tactical_Theme-38B2AC?style=flat-square&logo=tailwind-css" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/Zustand-State-informational?style=flat-square" alt="Zustand" />
  </p>
</div>

---

## 🎯 About The Project
AEGIS is a unified, real-time command center designed for managing large-scale sporting events. Built with a focus on immersive design and operational efficiency, it combines a live **3D Digital Twin** with a **Tactical User Interface** to give stakeholders a comprehensive, god's-eye view of stadium operations. 

From crowd density and incident tracking to intelligent resource deployment, AEGIS ensures all isolated teams (medical, security, organizers) are coordinated in real-time.

## ✨ Core Features

### 🏟️ Interactive 3D Digital Twin
A fully interactive, multi-tier oval stadium built using `@react-three/fiber` and `@react-three/drei`. Features include a dynamic pitch, multi-tier seating bowls, canopy roofing, and tactical ambient lighting. It serves as the visual centerpiece for spatial mapping and telemetry.

### 🎨 Tactical UI & Immersive Theme
Designed with a premium "Military Tactical" aesthetic. Utilizes a strict color palette of **Stealth Green (Seafoam)**, **Amber (Warning)**, **Red (Error)**, and **Carbon Black**. It features glassmorphism, animated mesh gradients, and micro-interactions powered by Framer Motion.

### 🎭 Persona-Based Authentication
A seamless authentication flow that bypasses traditional backends using a mock **Persona Grid**. Users can instantly adopt specific roles (Executive, Organizer, Security, Medical, Volunteer, Fan) to test role-based access control. Also includes a Google OAuth visual bypass for frictionless entry.

### 📱 Dedicated Role Dashboards
Six distinct, clearance-level specific dashboards:
- 🚨 **Security (Level 3)**: Incident triage, crowd density monitoring, rapid response.
- 📋 **Organizer (Level 4)**: Global overview, AI Insights, Live Operations, Sustainability.
- 📈 **Executive (Level 5)**: High-level KPIs, predictive analytics, revenue metrics.
- 🏟️ **Fan (Level 1)**: Wayfinding, match updates.
- 🙋 **Volunteer (Level 2)**: Task management, local reporting.
- ⚕️ **Medical (Level 3)**: Emergency dispatches.

### 📶 Offline-First Capabilities (PWA)
Engineered for reliability during high-density network congestion (typical in stadiums). Includes a registered Service Worker (`sw.js`), Web App Manifest, and a dedicated offline fallback page ensuring critical information remains accessible even when connectivity drops.

## 🚀 Quick Start

### 🌍 Live Deployment
The project is continuously deployed on Vercel:
👉 **[Access the Platform](https://aegis-five-umber.vercel.app)**

### 💻 Local Development

**1. Clone the Repository**
```bash
git clone https://github.com/Adi3595/Aegis.git
cd Aegis
```

**2. Install Dependencies**
```bash
npm install
```

**3. Run the Development Server**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🏗 Architecture
- **Framework**: Next.js 16 (App Router) with Turbopack.
- **Styling**: TailwindCSS with custom CSS variables (`globals.css`).
- **3D Rendering**: React, Three.js, React Three Fiber.
- **State Management**: Zustand (Auth, Simulation, and Organizer stores).
- **Animations**: Framer Motion & CSS keyframes.

## 📄 License
This project is licensed under the MIT License.
