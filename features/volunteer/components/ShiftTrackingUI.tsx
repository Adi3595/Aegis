"use client"

import * as React from "react"
import { Calendar, Clock, MapPin, CheckCircle, Target, Coffee } from "lucide-react"

export function ShiftTrackingUI() {
  const [isOnBreak, setIsOnBreak] = React.useState(false)
  const [shiftProgress, setShiftProgress] = React.useState(45) // Mock 45%

  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-surface/40 p-6 backdrop-blur-xl h-full">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-accent/20 text-primary-accent">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Shift Tracker</h3>
            <p className="text-sm text-muted-text">Gate B - Crowd Control</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-white tracking-wider">14:00 - 20:00</div>
          <div className="text-xs text-muted-text flex items-center justify-end gap-1">
            <Clock className="h-3 w-3" />
            2h 15m remaining
          </div>
        </div>
      </div>

      <div className="mb-6 relative h-2 w-full overflow-hidden rounded-full bg-black/40 border border-white/5">
        <div 
          className="absolute left-0 top-0 h-full bg-primary-accent transition-all duration-1000" 
          style={{ width: `${shiftProgress}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-white/5">
          <Target className="h-6 w-6 text-success mb-2" />
          <span className="text-2xl font-bold text-white">12</span>
          <span className="text-xs text-muted-text">Tasks Completed</span>
        </div>
        <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-white/5">
          <MapPin className="h-6 w-6 text-blue-400 mb-2" />
          <span className="text-2xl font-bold text-white">3.2k</span>
          <span className="text-xs text-muted-text">Steps Taken</span>
        </div>
      </div>

      <div className="mt-auto flex gap-3">
        <button 
          onClick={() => setIsOnBreak(!isOnBreak)}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
            isOnBreak 
              ? "bg-warning text-black shadow-[0_0_15px_rgba(250,204,21,0.3)]"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <Coffee className="h-4 w-4" />
          {isOnBreak ? "Resume Shift" : "Take Break"}
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-success/20 py-3 text-sm font-semibold text-success hover:bg-success/30 transition-all">
          <CheckCircle className="h-4 w-4" />
          Clock Out
        </button>
      </div>
    </div>
  )
}
