# AEGIS AI – Developer Documentation

This document serves as the technical handbook for maintaining and extending the AEGIS AI frontend architecture.

## 1. Project Architecture

The repository strictly follows the Next.js App Router paradigm, modified for heavy modularity:
- `app/`: Next.js routing, global layouts, and top-level pages.
- `features/`: The core of the architecture. Each distinct product domain (e.g., `boot/`, `hero/`, `landing/`) lives here as an independent slice to prevent monolithic component files.
- `components/`: Global, domain-agnostic UI elements.
- `animations/`: Reusable Framer Motion orchestration wrappers (`<Fade>`, `<Slide>`, `<Stagger>`).

## 2. Design Tokens (Tailwind v4)

We utilize CSS variables mapped to Tailwind v4 via the `@theme` directive in `app/globals.css`. Do not hardcode hex values.

- **Primary Accent**: `--color-primary-accent` (`#32D4FF` - Cyan) - Used for primary actions, success states, and key navigational elements.
- **AI Accent**: `--color-ai-accent` (`#7C5CFF` - Purple) - Reserved exclusively for elements powered by Generative AI (e.g., orchestrator, predictions).
- **Backgrounds**: `--color-primary-bg` (`#050816`) - The void-like canvas. Use `--color-surface` (`#121A2F`) for elevated cards.
- **Typography**: 
  - `font-display` (Space Grotesk) - Heavy headers.
  - `font-sans` (Inter) - Body copy.
  - `font-mono` (JetBrains Mono) - Data, telemetry, and system states.

## 3. Reusable Component Library

### `GlassPanel` (`components/ui/glass-panel.tsx`)
The foundational card component. It features a frosted backdrop blur, 1px subtle white borders, and an optional `interactive` prop that applies premium hover-glow effects without layout shifts.

### `MagneticButton` (`animations/advanced.ts`)
Wrap any interactive `<Button>` with this component to apply a physical-feeling magnetic pull when the cursor approaches. Automatically disabled on mobile.

### `LazySection` (`features/landing/LazySection.tsx`)
Crucial for Lighthouse performance. Wrap heavy sections in this. It uses Framer Motion's `useInView` to defer React hydration and DOM injection until the user scrolls near the element.

### `CustomCursor` (`components/ui/custom-cursor.tsx`)
A modular cursor override safely restricted to fine-pointer devices. Emits magnetic expansion when hovering over interactive elements.

## 4. Backend Integration Guidelines

The frontend is currently driven by simulated state in preparation for real-time backend connections.

- **State Management**: Use `zustand` (already installed) for global orchestration state (e.g., current active simulation scenario).
- **Data Fetching**: Use `@tanstack/react-query` (already installed) for standard REST/GraphQL endpoints.
- **Real-time Streams**: For the Live Stadium and Threat Simulations, connect to the FastAPI layer using WebSockets or Server-Sent Events (SSE). Replace the `React.useState` mocks in `LiveSimulation.tsx` with a subscription to these streams.
- **Digital Twin**: The `StadiumScene.tsx` is built with `@react-three/fiber`. When injecting real spatial data, map the coordinate payloads from Azure to Three.js `Vector3` spaces.

## 5. Animation Philosophy
- **Restraint**: Never use bounce effects on enter animations. Prefer `ease: "easeOut"` or custom cubic-beziers.
- **Hardware Acceleration**: Always animate `transform` (scale, translate) and `opacity`. Never animate layout properties like `height`, `width`, or `margin` unless explicitly using Framer Motion's `layout` prop for orchestrations.

---
*AEGIS AI Frontend Systems v1.0.0*
