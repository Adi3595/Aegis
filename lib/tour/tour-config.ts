export interface TourStep {
  target: string // CSS selector
  title: string
  content: string
  placement: 'top' | 'bottom' | 'left' | 'right'
}

export const MAIN_TOUR_STEPS: TourStep[] = [
  {
    target: '.tour-step-1', // Suppose to be placed on the main header or dashboard
    title: 'Welcome to AEGIS Demo Mode',
    content: 'This guided tour will take you through the platform capabilities. Use the arrow keys to navigate.',
    placement: 'bottom'
  },
  {
    target: '.tour-step-ai', // RightPanel Copilot
    title: 'AI Copilot & Explainability',
    content: 'Our multi-agent orchestrator lives here. Watch the visualizer map out the decision process when you ask a question.',
    placement: 'left'
  },
  {
    target: '.tour-step-map', // Digital Twin
    title: 'Live Digital Twin',
    content: 'The simulation engine continuously renders real-time physics data here. You can inject incidents and watch the agents respond.',
    placement: 'right'
  },
  {
    target: '.tour-step-kpis', // Top KPIs
    title: 'Strategic KPIs',
    content: 'These KPIs are recalculated live based on simulation state. They aggregate crowd density, transport delays, and energy usage.',
    placement: 'bottom'
  }
]
