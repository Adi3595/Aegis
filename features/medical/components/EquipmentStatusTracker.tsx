"use client"

import * as React from "react"
import { PackageSearch, Stethoscope, Battery, AlertCircle, RefreshCw } from "lucide-react"

const EQUIPMENT = [
  { id: "DEF-01", name: "Defibrillator", location: "Med Center A", status: "Available", battery: 100 },
  { id: "DEF-02", name: "Defibrillator", location: "Med-1 (Mobile)", status: "In Use", battery: 75 },
  { id: "O2-12", name: "O2 Cylinder", location: "Gate A Triage", status: "Low Supply", level: 15 },
  { id: "O2-13", name: "O2 Cylinder", location: "Med Center A", status: "Full", level: 100 },
  { id: "ST-04", name: "Stretcher", location: "Gate C", status: "Available", null_battery: true },
]

export function EquipmentStatusTracker() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface/40 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/20 text-success">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Equipment Tracking</h3>
            <p className="text-sm text-muted-text">Live Asset Monitoring</p>
          </div>
        </div>
        <button className="flex items-center justify-center rounded-full bg-white/5 p-2 hover:bg-white/10 transition-colors">
          <RefreshCw className="h-4 w-4 text-muted-text" />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-hide">
        {EQUIPMENT.map((item) => (
          <div 
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3 hover:border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/40 border border-white/10">
                <PackageSearch className="h-4 w-4 text-gray-400" />
              </div>
              <div>
                <h4 className="font-medium text-white text-sm">{item.name}</h4>
                <div className="text-xs text-muted-text">{item.location}</div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm ${
                item.status === "Available" || item.status === "Full" ? "bg-success/20 text-success" : 
                item.status === "In Use" ? "bg-blue-500/20 text-blue-400" : "bg-error/20 text-error"
              }`}>
                {item.status}
              </span>
              
              {!item.null_battery && (
                <div className="flex items-center gap-1 text-[10px] text-muted-text">
                  {item.battery !== undefined ? (
                    <>
                      <Battery className={`h-3 w-3 ${item.battery < 20 ? "text-error" : "text-success"}`} />
                      {item.battery}%
                    </>
                  ) : (
                    <>
                      <AlertCircle className={`h-3 w-3 ${item.level! < 20 ? "text-error" : "text-success"}`} />
                      {item.level}%
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
