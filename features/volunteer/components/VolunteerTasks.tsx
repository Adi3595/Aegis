"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { useVolunteerStore } from "@/features/volunteer/store/volunteerStore"
import { Clock, MapPin, CheckCircle2, CircleDashed, AlertTriangle } from "lucide-react"

export function VolunteerTasks() {
  const { tasks, updateTaskStatus } = useVolunteerStore()
  
  const activeTask = tasks.find(t => t.status === "In Progress")
  const pendingTasks = tasks.filter(t => t.status === "Pending")
  const completedTasks = tasks.filter(t => t.status === "Completed")

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Active Assignment Hero */}
      <GlassPanel className="p-6 border-primary-accent/30 bg-primary-accent/5">
        <h3 className="text-sm font-semibold text-primary-accent uppercase tracking-wider mb-4">Current Assignment</h3>
        {activeTask ? (
          <div className="space-y-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-white mb-1">{activeTask.title}</h2>
              <p className="text-muted-text">{activeTask.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 py-3 border-y border-white/10">
              <div className="flex items-center gap-2 text-sm text-white">
                <MapPin className="w-4 h-4 text-primary-accent" />
                <span className="capitalize">{activeTask.zoneId.replace('-', ' ')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white">
                <Clock className="w-4 h-4 text-warning" />
                <span>Est. {activeTask.estimatedDuration}m</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-error font-medium">
                <AlertTriangle className="w-4 h-4" />
                <span>{activeTask.priority} Priority</span>
              </div>
            </div>

            <button 
              onClick={() => updateTaskStatus(activeTask.id, "Completed")}
              className="w-full bg-success text-success-bg py-3 rounded-xl font-bold shadow-lg shadow-success/20 transition-transform active:scale-95 flex justify-center items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" /> Complete Task
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-muted-text">
            <CircleDashed className="w-12 h-12 mb-3 opacity-20" />
            <p>No active assignment.</p>
            <p className="text-sm">Select a task from the queue below to begin.</p>
          </div>
        )}
      </GlassPanel>

      {/* Task Queue */}
      <GlassPanel className="p-0 flex-1 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/5">
          <h3 className="font-semibold text-white">Task Queue</h3>
        </div>
        <div className="p-4 overflow-y-auto space-y-3 hide-scrollbar flex-1">
          {pendingTasks.length === 0 ? (
            <p className="text-sm text-muted-text text-center mt-4">Queue is empty.</p>
          ) : (
            pendingTasks.map(task => (
              <div key={task.id} className="p-4 bg-surface border border-white/5 rounded-xl flex flex-col sm:flex-row gap-4 sm:items-center justify-between group hover:border-white/20 transition-colors">
                <div>
                  <h4 className="font-semibold text-white text-sm mb-1">{task.title}</h4>
                  <div className="flex gap-3 text-xs text-muted-text">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {task.zoneId}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {task.estimatedDuration}m</span>
                  </div>
                </div>
                <button 
                  onClick={() => updateTaskStatus(task.id, "In Progress")}
                  disabled={!!activeTask}
                  className="bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                >
                  Start Task
                </button>
              </div>
            ))
          )}
        </div>
      </GlassPanel>
    </div>
  )
}
