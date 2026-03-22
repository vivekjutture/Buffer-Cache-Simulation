import React from "react";

export default function Legend() {
  return (
    <div className="flex flex-col md:flex-row gap-6 bg-slate-800/50 p-4 rounded-xl border border-slate-700 mb-8 shadow-inner">
      {/* Block Anatomy Section */}
      <div className="flex flex-col gap-3 md:border-r border-slate-700 md:pr-6">
        <span className="text-slate-400 font-bold text-xs font-mono tracking-widest text-[18px]">
          HOW TO READ A BLOCK
        </span>
        <div className="flex items-center gap-3">
          <div className="relative flex flex-col items-center justify-center w-14 h-14 rounded-xl border-2 border-slate-500 bg-slate-700 font-mono text-slate-200 shadow-md p-8">
            <span className="text-lg font-bold">64</span>
            <span className="text-[12px] uppercase font-semibold text-emerald-400 mt-1">
              [F]
            </span>
          </div>
          <div className="flex flex-col justify-center gap-2 h-14 text-xs text-slate-400 font-mono text-[15px]">
            <div className="flex items-center gap-2">
              <span>←</span> <span>Disk Block Number</span>
            </div>
            <div className="flex items-center gap-2">
              <span>←</span> <span>Current Status</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Codes Section */}
      <div className="flex flex-col gap-3 flex-1">
        <span className="text-slate-400 font-bold text-xs font-mono tracking-widest text-[18px]">
          STATUS CODES
        </span>
        <div className="flex flex-wrap gap-4 text-xs font-mono mt-1 text-[16px]">
          <div className="flex items-center gap-2 ">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>{" "}
            [F] Free / Available
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></span>{" "}
            [B] Busy / Locked
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span>{" "}
            [D] Delayed Write
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>{" "}
            [A] Async Write
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-500"></span> [W]
            Waiting (Process Sleeping)
          </div>
        </div>
      </div>
    </div>
  );
}
