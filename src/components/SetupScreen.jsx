import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Play } from "lucide-react";

export default function SetupScreen({ onComplete }) {
  const [qCount, setQCount] = useState("");
  const [bCount, setBCount] = useState("");
  const [bValues, setBValues] = useState([]);

  // Strict number validation (strips all non-digit characters instantly)
  const handleNumberInput = (setter) => (e) => {
    setter(e.target.value.replace(/\D/g, ""));
  };

  const handleBlockCountChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    setBCount(val);

    const num = parseInt(val) || 0;
    setBValues((prev) => {
      const newArr = [...prev];
      if (num > prev.length) {
        // Add empty strings for new inputs
        for (let i = prev.length; i < num; i++) newArr.push("");
      } else {
        // Trim array if user lowers the number
        newArr.length = num;
      }
      return newArr;
    });
  };

  const updateSingleBlock = (index, val) => {
    const cleanVal = val.replace(/\D/g, "");
    setBValues((prev) => {
      const newArr = [...prev];
      newArr[index] = cleanVal;
      return newArr;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out empty inputs to prevent errors
    const validBlocks = bValues.filter((v) => v !== "");
    onComplete(qCount, validBlocks);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 selection:bg-emerald-500/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-xl"
      >
        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          <div className="bg-blue-500/20 p-3 rounded-xl text-blue-400">
            <Settings size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-100">System Setup</h1>
            <p className="text-slate-500 text-sm font-mono">
              Configure the Buffer Cache
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hash Queues Input */}
          <div>
            <label className="block text-slate-400 font-bold text-sm mb-2">
              Number of Hash Queues (Default: 4)
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={qCount}
              onChange={handleNumberInput(setQCount)}
              placeholder="e.g. 4"
              className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono transition-colors"
            />
          </div>

          {/* Initial Blocks Count Input */}
          <div>
            <label className="block text-slate-400 font-bold text-sm mb-2">
              Number of Initial Free Blocks
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={bCount}
              onChange={handleBlockCountChange}
              placeholder="e.g. 12"
              className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono transition-colors"
            />
          </div>

          {/* Dynamic Scrollable List for Block Values */}
          <AnimatePresence>
            {bValues.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-slate-950/50 p-5 rounded-xl border border-slate-800 overflow-hidden"
              >
                <label className="block text-emerald-400 font-bold text-xs mb-4 uppercase tracking-wider items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Assign Block Numbers:
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-60 overflow-y-auto custom-scrollbar pr-2 pb-2 pt-1 pl-1">
                  {bValues.map((val, idx) => (
                    <input
                      key={idx}
                      type="text"
                      inputMode="numeric"
                      value={val}
                      onChange={(e) => updateSingleBlock(idx, e.target.value)}
                      placeholder={`Block ${idx + 1}`}
                      // CHANGED: Default is subtle border-slate-700. Glow only applies on 'focus:'
                      className="w-full bg-[#0f172a] border-2 border-slate-700 text-slate-200 p-2.5 rounded-xl text-center font-mono text-sm transition-all placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:shadow-[0_0_8px_rgba(16,185,129,0.6)] focus:bg-slate-900"
                      required
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors mt-4 shadow-lg cursor-pointer"
          >
            <Play size={20} /> Initialize System
          </button>
        </form>
      </motion.div>
    </div>
  );
}
