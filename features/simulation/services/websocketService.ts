import { useSimulationStore } from "../store/simulationStore"
import { useAuthStore } from "@/features/auth/store/authStore"
import { useNotificationStore } from "@/features/notifications/store/notificationStore"

class WebSocketService {
  private ws: WebSocket | null = null
  private reconnectTimer: NodeJS.Timeout | null = null
  private readonly RECONNECT_DELAY_MS = 3000
  private isConnecting = false

  public connect() {
    if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) return

    this.isConnecting = true
    const wsUrl = process.env.NEXT_PUBLIC_API_URL?.replace("http", "ws") || "ws://localhost:8000/api/v1"
    
    try {
      this.ws = new WebSocket(`${wsUrl}/simulation/ws`)

      this.ws.onopen = () => {
        console.log("Simulation WebSocket connected")
        this.isConnecting = false
        if (this.reconnectTimer) {
          clearTimeout(this.reconnectTimer)
          this.reconnectTimer = null
        }
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.handleMessage(data)
        } catch (e) {
          console.error("Failed to parse simulation WS message:", e)
        }
      }

      this.ws.onclose = () => {
        console.log("Simulation WebSocket disconnected")
        this.isConnecting = false
        this.ws = null
        this.scheduleReconnect()
      }

      this.ws.onerror = (error) => {
        console.error("Simulation WebSocket error:", error)
        // onclose will be called after onerror usually
      }
    } catch (e) {
      console.error("Failed to create Simulation WebSocket:", e)
      this.isConnecting = false
      this.scheduleReconnect()
    }
  }

  public disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.isConnecting = false
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) return
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null
      this.connect()
    }, this.RECONNECT_DELAY_MS)
  }

  private handleMessage(message: any) {
    const store = useSimulationStore.getState()
    
    switch (message.type) {
      case "simulation.state":
        store._setFullState(message.payload)
        break
      case "simulation.updated":
        store._setPartialUpdate(message.payload)
        break
      case "simulation.paused":
        store.setStatus("paused")
        break
      case "simulation.speed_changed":
        store.setSpeed(message.speed)
        break
      case "scenario.triggered":
        store.addScenario(message.scenarioId)
        store.addEvent(message.event)
        break
      case "scenario.resolved":
        store.removeScenario(message.scenarioId)
        store.resolveEventByScenario(message.scenarioId)
        break
      case "NOTIFICATION":
        const { user } = useAuthStore.getState()
        if (!message.targetRoles || (user && message.targetRoles.includes(user.role))) {
          useNotificationStore.getState().addNotification(message)
        }
        break
      default:
        break
    }
  }
}

export const simulationWsService = new WebSocketService()
