import React from "react";

export default function LogViewer({ logs }) {
  return (
    <div className="bg-[#0D1117] border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col h-100">
      <h2 className="text-emerald-500 font-bold mb-3 font-mono text-sm tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
        SYSTEM LOG
      </h2>
      <div className="overflow-y-auto flex flex-col-reverse flex-1 pr-2 custom-scrollbar">
        <div className="flex flex-col justify-end">
          {logs.map((l, i) => (
            <div
              key={i}
              className="mb-2 font-mono text-[13px] text-slate-400 leading-relaxed border-l-2 border-slate-800 pl-3 py-1"
            >
              <span className="text-slate-600 mr-2 text-xs">[{i + 1}]</span>
              {/* Highlight important scenario events in yellow */}
              {l.includes("Scenario") || l.includes("WAKEUP") ? (
                <span className="text-amber-400 font-semibold">{l}</span>
              ) : (
                l
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
