"use client"

import * as React from "react"
import { Activity, Thermometer, Heart, User, Clock, CheckCircle } from "lucide-react"

const PATIENTS = [
  { id: "P-8472", status: "Critical", location: "Gate A Triage", condition: "Cardiac Arrest", waitTime: "2m", team: "Med-1" },
  { id: "P-3819", status: "Urgent", location: "Zone C Triage", condition: "Severe Laceration", waitTime: "8m", team: "Med-3" },
  { id: "P-9021", status: "Stable", location: "Medical Center", condition: "Dehydration", waitTime: "15m", team: "Nurse-A" },
  { id: "P-1123", status: "Stable", location: "Medical Center", condition: "Minor Sprain", waitTime: "22m", team: "Unassigned" },
]

export function PatientQueueUI() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface/40 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-error/20 text-error">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Patient Triage Queue</h3>
            <p className="text-sm text-muted-text">Live Medical Incidents</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-error text-xs">1</span>
          Critical
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-hide">
        {PATIENTS.map((patient) => (
          <div 
            key={patient.id}
            className={`flex flex-col gap-3 rounded-xl border transition-all duration-200 p-4 ${
              patient.status === "Critical"
                ? "border-error/50 bg-error/10"
                : patient.status === "Urgent"
                ? "border-warning/50 bg-warning/10"
                : "border-white/5 bg-white/5"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {patient.status === "Critical" ? (
                  <Heart className="h-4 w-4 animate-pulse text-error" />
                ) : (
                  <Thermometer className="h-4 w-4 text-warning" />
                )}
                <span className="font-bold text-white">{patient.id}</span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm ${
                  patient.status === "Critical" ? "bg-error text-white" : patient.status === "Urgent" ? "bg-warning text-black" : "bg-success text-white"
                }`}>
                  {patient.status}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-text">
                <Clock className="h-3 w-3" />
                {patient.waitTime}
              </div>
            </div>

            <div className="text-sm text-gray-300 font-medium">
              {patient.condition}
            </div>

            <div className="flex items-center justify-between text-xs mt-1">
              <div className="text-muted-text flex items-center gap-1">
                <User className="h-3 w-3" />
                {patient.team}
              </div>
              <div className="text-muted-text">
                {patient.location}
              </div>
            </div>
            
            {patient.status !== "Stable" && (
              <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 py-1.5 text-xs font-semibold text-white transition-all hover:bg-white/20">
                <CheckCircle className="h-3 w-3" />
                Mark Stabilized
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
