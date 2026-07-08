"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { useExecutiveStore } from "@/features/executive/store/executiveStore"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from "recharts"
import { Activity, Target } from "lucide-react"

export function PredictiveAnalytics() {
  const { activeScenario, setActiveScenario } = useExecutiveStore()
  const [historicalData, setHistoricalData] = React.useState<any[]>([])
  const [predictiveData, setPredictiveData] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const histRes = await fetch(`http://localhost:8000/api/v1/analytics/historical?scenario=${encodeURIComponent(activeScenario)}&duration_minutes=90`)
        const histJson = await histRes.json()
        setHistoricalData(histJson.data)

        const predRes = await fetch(`http://localhost:8000/api/v1/analytics/predictions?scenario=${encodeURIComponent(activeScenario)}&current_minute=90`)
        const predJson = await predRes.json()
        setPredictiveData(predJson.predictions)
      } catch (err) {
        console.error("Failed to fetch analytics", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [activeScenario])

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center bg-surface/50 p-4 rounded-xl border border-white/10">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-ai-accent" />
          Deterministic Simulation Analytics
        </h3>
        <select
          value={activeScenario}
          onChange={(e) => setActiveScenario(e.target.value as any)}
          className="bg-black/40 border border-white/20 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-ai-accent"
        >
          {["Normal Match Day", "Heavy Rain", "High Attendance Final", "Transport Disruption"].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center text-ai-accent animate-pulse">
          Generating Deterministic Datasets...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[400px]">
          
          <GlassPanel className="p-6 flex flex-col">
            <h4 className="font-semibold text-white mb-6">Historical Crowd Attendance (T+0 to T+90)</h4>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="time" stroke="#ffffff50" fontSize={12} tickMargin={10} minTickGap={30} />
                  <YAxis stroke="#ffffff50" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0a0f', borderColor: '#ffffff20', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="attendance" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAttendance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6 flex flex-col border-ai-accent/20 bg-ai-accent/5">
            <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
              <Target className="w-4 h-4 text-ai-accent" /> AI Forecast: Egress Queue Length (Next 30m)
            </h4>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predictiveData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="time" stroke="#ffffff50" fontSize={12} tickMargin={10} />
                  <YAxis stroke="#ffffff50" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0a0f', borderColor: '#8effb240', borderRadius: '8px' }}
                    itemStyle={{ color: '#8effb2' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="predictedQueue" name="Predicted Queue Length" stroke="#8effb2" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>

        </div>
      )}
    </div>
  )
}
