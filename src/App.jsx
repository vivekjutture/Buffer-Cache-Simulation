import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useBufferCache } from "./hooks/useBufferCache";
import Block from "./components/Block";
import Controls from "./components/Controls";
import Legend from "./components/Legend";
import LogViewer from "./components/LogViewer";
import SetupScreen from "./components/SetupScreen";
import AlgorithmModal from "./components/AlgorithmDetails";
import GuideModal from "./components/HowToUseGuide";
import HowToUseGuide from "./components/HowToUseGuide";
import AlgorithmDetails from "./components/AlgorithmDetails";
import { BookOpen, MousePointerClick } from "lucide-react";

export default function App() {
  const {
    isConfigured,
    initializeSystem,
    hashQueues,
    freeList,
    waitingQueue,
    logs,
    getblk,
    brelse,
    changeStatus,
    addBlock,
  } = useBufferCache();

  // Manage modal states globally so they can be opened from anywhere
  const [isAlgoModalOpen, setIsAlgoModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const renderQueue = (title, list, type) => (
    <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl mb-4 shadow-inner">
      <h2 className="text-sm font-bold text-slate-400 mb-3 font-mono tracking-wider">
        {title}
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 min-h-22 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {list.length === 0 && (
            <span className="text-slate-600 italic text-sm mt-4 font-mono">
              Queue Empty...
            </span>
          )}
          {list.map((b) => (
            <Block key={`${type}-${b.id}`} block={b} listType={type} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6 lg:p-10 selection:bg-blue-500/30 flex flex-col font-sans">
      {/* Global Modals */}
      <AlgorithmModal
        isOpen={isAlgoModalOpen}
        onClose={() => setIsAlgoModalOpen(false)}
      />
      <GuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />

      {/* GLOBAL HEADER - Always Visible */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6 border-b border-slate-800 pb-6 shrink-0">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent tracking-tight">
            UNIX Buffer Cache Simulator
          </h1>
          <p className="text-slate-500 font-mono text-sm mt-2">
            Interactive System V Kernel Visualization
          </p>
        </div>

        {/* Always Visible Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setIsGuideModalOpen(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 px-5 py-2.5 rounded-full font-bold transition-all border border-slate-700 shadow-[0_0_15px_rgba(59,130,246,0.15)] cursor-pointer"
          >
            <MousePointerClick size={18} className="text-blue-400" /> How to Use
          </button>
          <button
            onClick={() => setIsAlgoModalOpen(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 px-5 py-2.5 rounded-full font-bold transition-all border border-slate-700 shadow-[0_0_15px_rgba(16,185,129,0.15)] cursor-pointer"
          >
            <BookOpen size={18} className="text-emerald-400" /> Learn Algorithm
          </button>
        </div>
      </header>

      {/* CONDITIONAL RENDERING: Setup vs Dashboard */}
      {!isConfigured ? (
        // This wrapper ensures the SetupScreen is perfectly centered in the remaining screen height
        <div className="flex-1 flex items-center justify-center -mt-8">
          <SetupScreen onComplete={initializeSystem} />
        </div>
      ) : (
        <div className="flex-1 flex flex-col animate-in fade-in duration-700">
          <Legend />

          {/* Main Interactive Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-12">
            <div className="xl:col-span-8 space-y-6">
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-sm">
                <h2 className="text-xl font-black text-slate-200 mb-4 border-b border-slate-800 pb-2">
                  Hash Queues
                </h2>
                {hashQueues.map((queue, idx) =>
                  renderQueue(`HQ [${idx}]`, queue, `hq-${idx}`),
                )}
              </div>

              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-sm">
                <h2 className="text-xl font-black text-slate-200 border-b border-slate-800 pb-2 mb-4">
                  Free List{" "}
                  <span className="text-sm font-normal text-slate-500">
                    (LRU Policy)
                  </span>
                </h2>
                {renderQueue("AVAILABLE BUFFERS", freeList, "fl")}
              </div>

              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-sm">
                <h2 className="text-xl font-black text-slate-200 border-b border-slate-800 pb-2 mb-4">
                  Wait Queue{" "}
                  <span className="text-sm font-normal text-slate-500">
                    (Sleeping Processes)
                  </span>
                </h2>
                {renderQueue("SLEEPING", waitingQueue, "wq")}
              </div>
            </div>

            <div className="xl:col-span-4 space-y-6 flex flex-col">
              <Controls
                getblk={getblk}
                brelse={brelse}
                changeStatus={changeStatus}
                addBlock={addBlock}
              />

              {/* Flex-1 ensures the LogViewer stretches to match the height of the Hash Queues */}
              <div className="flex-1 min-h-100">
                <LogViewer logs={logs} />
              </div>
            </div>
          </div>

          {/* Bottom Documentation Section (Visible immediately below the simulation) */}
          <div className="space-y-8 pb-10">
            <HowToUseGuide />
            <AlgorithmDetails />
          </div>
        </div>
      )}
    </div>
  );
}
