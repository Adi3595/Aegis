"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { useExecutiveStore } from "@/features/executive/store/executiveStore"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Leaf, Zap, Droplet, Recycle, Wind, AlertCircle } from "lucide-react"

export function SustainabilityDashboard() {
  const { activeScenario } = useExecutiveStore()
  const [data, setData] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`http://localhost:8000/api/v1/analytics/historical?scenario=${encodeURIComponent(activeScenario)}&duration_minutes=90`)
        const json = await res.json()
        setData(json.data)
      } catch (err) {
        console.error("Failed to fetch sustainability data", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [activeScenario])

  const latestEnergy = data.length > 0 ? data[data.length - 1].energyKwh : 0

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassPanel className="p-4 flex items-center justify-between border-success/30 bg-success/5">
          <div>
            <span className="text-xs font-semibold text-muted-text uppercase flex items-center gap-1">
              <Zap className="w-3 h-3" /> Cumulative Energy
            </span>
            <div className="font-display text-2xl font-bold text-white mt-1">{latestEnergy.toLocaleString()} kWh</div>
          </div>
          <div className="text-xs text-success font-medium bg-success/20 px-2 py-1 rounded">-4.2% vs avg</div>
        </GlassPanel>
        
        <GlassPanel className="p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-muted-text uppercase flex items-center gap-1">
              <Droplet className="w-3 h-3 text-blue-400" /> Water Usage
            </span>
            <div className="font-display text-2xl font-bold text-white mt-1">14,200 L</div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-muted-text uppercase flex items-center gap-1">
              <Recycle className="w-3 h-3 text-green-400" /> Recycling Rate
            </span>
            <div className="font-display text-2xl font-bold text-white mt-1">78.4%</div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-muted-text uppercase flex items-center gap-1">
              <Wind className="w-3 h-3 text-cyan-400" /> Carbon Emissions
            </span>
            <div className="font-display text-2xl font-bold text-white mt-1">12.4 tCO2e</div>
          </div>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[400px]">
        <div className="lg:col-span-2">
          <GlassPanel className="p-6 h-full flex flex-col">
            <h4 className="font-semibold text-white mb-6">Energy Consumption vs Attendance Trend</h4>
            <div className="flex-1 min-h-[300px]">
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center text-muted-text">Loading...</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8effb2" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#8effb2" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="time" stroke="#ffffff50" fontSize={12} tickMargin={10} minTickGap={30} />
                    <YAxis stroke="#ffffff50" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0a0a0f', borderColor: '#ffffff20', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="energyKwh" name="Energy (kWh)" stroke="#8effb2" fillOpacity={1} fill="url(#colorEnergy)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </GlassPanel>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <GlassPanel className="p-6 border-ai-accent/30 bg-ai-accent/5 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-5 h-5 text-ai-accent" />
              <h3 className="font-semibold text-white">AI Efficiency Recommendations</h3>
            </div>
            <ul className="space-y-4">
              <li className="bg-surface/50 border border-white/10 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                  <div>
                    <h5 className="text-sm font-semibold text-white">HVAC Optimization Available</h5>
                    <p className="text-xs text-muted-text mt-1">Lower ambient temp detected outside. AI suggests switching South Concourse to 80% fresh air intake to save ~400 kWh.</p>
                  </div>
                </div>
              </li>
              <li className="bg-surface/50 border border-white/10 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-ai-accent mt-0.5 shrink-0" />
                  <div>
                    <h5 className="text-sm font-semibold text-white">Lighting Dimming</h5>
                    <p className="text-xs text-muted-text mt-1">Sunlight entering East Atrium is optimal. Dimming artificial lights by 30% will not impact visibility.</p>
                  </div>
                </div>
              </li>
            </ul>
          </GlassPanel>
        </div>
      </div>
    </div>
  )
}
