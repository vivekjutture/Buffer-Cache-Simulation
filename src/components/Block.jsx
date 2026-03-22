import React from "react";
import { motion } from "framer-motion";

const statusConfig = {
  f: {
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    label: "[F]",
  },
  b: {
    color: "bg-rose-500/20 text-rose-400 border-rose-500",
    glow: "shadow-[0_0_15px_rgba(244,63,94,0.3)]",
    label: "[B]",
  },
  d: {
    color: "bg-amber-500/20 text-amber-400 border-amber-500",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    label: "[D]",
  },
  a: {
    color: "bg-cyan-500/20 text-cyan-400 border-cyan-500",
    glow: "shadow-[0_0_15px_rgba(6,182,212,0.3)]",
    label: "[A]",
  },
  w: {
    color: "bg-slate-700 text-slate-300 border-slate-500",
    glow: "",
    label: "[W]",
  },
};

export default function Block({ block, listType }) {
  const config = statusConfig[block.status];

  return (
    <motion.div
      layoutId={`block-${block.id}-${listType}`} // Unique ID so Framer knows how to slide it
      initial={{ opacity: 0, y: -10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-xl border-2 backdrop-blur-sm shrink-0 font-mono p-8 ${config.color} ${config.glow}`}
    >
      <span className="text-xl font-bold">{block.id}</span>
      <span className="text-[12px] uppercase font-semibold tracking-wider mt-1 opacity-80">
        {config.label}
      </span>
    </motion.div>
  );
}
