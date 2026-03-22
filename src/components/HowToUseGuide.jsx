import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MousePointerClick,
  LayoutDashboard,
  Sliders,
  Route,
} from "lucide-react";

export default function GuideModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-800/50 shrink-0">
              <h2 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                <MousePointerClick size={22} /> Application Manual & Walkthrough
              </h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors bg-slate-800 p-1.5 rounded-full cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content Grid */}
            <div className="p-6 overflow-y-auto custom-scrollbar text-slate-300 text-sm leading-relaxed">
              <p className="mb-6 text-slate-400 text-base">
                This dashboard allows you to play the role of the UNIX kernel.
                You will receive requests from programs, allocate memory
                buffers, and manage the disk cache in real-time.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* LEFT COLUMN: Interface & Controls */}
                <div className="space-y-6">
                  {/* The Interface Explanation */}
                  <section>
                    <h3 className="text-lg font-bold text-slate-100 mb-3 flex items-center gap-2 border-b border-slate-800 pb-2">
                      <LayoutDashboard size={18} className="text-indigo-400" />{" "}
                      Understanding the Interface
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
                        <strong className="text-indigo-300">
                          Hash Queues (HQ):
                        </strong>{" "}
                        The "Fast Lookup" bins. Blocks are mathematically sorted
                        here (Block Number % Number of Queues) so the system can
                        instantly check if a block is currently in memory.
                      </div>
                      <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
                        <strong className="text-emerald-300">Free List:</strong>{" "}
                        The "Return Cart." This contains blocks that are in
                        memory but not currently being used. It operates on a
                        strict <strong>LRU (Least Recently Used)</strong>{" "}
                        policy. The oldest block is at the front (left), and the
                        newest is at the back (right).
                      </div>
                      <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
                        <strong className="text-slate-400">Wait Queue:</strong>{" "}
                        If a program asks for a block that is currently locked{" "}
                        <span className="text-rose-400 font-bold">[B]</span>,
                        the program goes to sleep here until the block is
                        released.
                      </div>
                    </div>
                  </section>

                  {/* The Controls Explanation */}
                  <section>
                    <h3 className="text-lg font-bold text-slate-100 mb-3 flex items-center gap-2 border-b border-slate-800 pb-2">
                      <Sliders size={18} className="text-blue-400" /> Operations
                      & Controls
                    </h3>
                    <ul className="space-y-2 list-disc pl-5 text-slate-400">
                      <li>
                        <strong className="text-blue-400">getblk():</strong> The
                        core algorithm. Click this to request the block number
                        typed in the input box.
                      </li>
                      <li>
                        <strong className="text-purple-400">brelse():</strong>{" "}
                        "Buffer Release". Click this to tell the system you are
                        done with a busy block.
                      </li>
                      <li>
                        <strong className="text-emerald-400">
                          Inject New Block:
                        </strong>{" "}
                        Manually forces a block into the system without running
                        the algorithm (useful for setting up specific test
                        states).
                      </li>
                      <li>
                        <strong className="text-amber-400">
                          Force Status Mutation:
                        </strong>{" "}
                        Use these buttons to manually change a block to Free,
                        Busy, or Delayed to test how the <code>getblk</code>{" "}
                        algorithm handles edge cases.
                      </li>
                    </ul>
                  </section>
                </div>

                {/* RIGHT COLUMN: Interactive Walkthrough */}
                <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2 border-b border-slate-700/50 pb-2">
                    <Route size={20} /> Try This Step-by-Step Example
                  </h3>
                  <p className="text-slate-400 mb-5">
                    Close this window and follow these exact steps to see the
                    entire caching engine in action:
                  </p>

                  <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="relative pl-6 border-l-2 border-slate-700">
                      <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.75 top-1"></div>
                      <h4 className="font-bold text-slate-200">
                        1. The Perfect Cache Hit
                      </h4>
                      <p className="text-slate-400 mt-1">
                        Look at the Free List and pick any block you see (e.g.,{" "}
                        <code>64</code>). Type it in the box and hit{" "}
                        <strong className="text-blue-400">getblk()</strong>.
                        Watch it turn{" "}
                        <span className="text-rose-400">[B] Busy</span> and
                        vanish from the Free List. You just successfully served
                        a block from memory!
                      </p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative pl-6 border-l-2 border-slate-700">
                      <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-1.75 top-1"></div>
                      <h4 className="font-bold text-slate-200">
                        2. Releasing the Block (LRU Policy)
                      </h4>
                      <p className="text-slate-400 mt-1">
                        Make sure your block number is still in the input box.
                        Click{" "}
                        <strong className="text-purple-400">brelse()</strong>.
                        Watch the block jump to the very <em>end</em> of the
                        Free List. Because it was just used, it is now the "Most
                        Recently Used" block, protecting it from being deleted.
                      </p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative pl-6 border-l-2 border-slate-700">
                      <div className="absolute w-3 h-3 bg-rose-500 rounded-full -left-1.75 top-1"></div>
                      <h4 className="font-bold text-slate-200">
                        3. A Cache Miss (Replacing old data)
                      </h4>
                      <p className="text-slate-400 mt-1">
                        Type a number that is NOT on the screen (e.g.,{" "}
                        <code>999</code>) and hit{" "}
                        <strong className="text-blue-400">getblk()</strong>. The
                        system doesn't have it. Watch as it deletes the block at
                        the <em>front</em> of the Free list (the oldest one),
                        reassigns that memory to <code>999</code>, and places it
                        in the correct Hash Queue.
                      </p>
                    </div>

                    {/* Step 4 */}
                    <div className="relative pl-6 border-l-2 border-transparent">
                      <div className="absolute w-3 h-3 bg-amber-500 rounded-full -left-1.75 top-1 ring-4 ring-slate-900"></div>
                      <h4 className="font-bold text-slate-200">
                        4. The Delayed Write Trap
                      </h4>
                      <p className="text-slate-400 mt-1">
                        Look at the first block on the Free list. Type its
                        number and click the{" "}
                        <strong className="text-amber-500">Set Delayed</strong>{" "}
                        button. It will turn orange{" "}
                        <span className="text-amber-500">[D]</span>. Now,
                        request a completely new block (e.g., <code>888</code>)
                        with <strong className="text-blue-400">getblk()</strong>
                        . The system will try to delete the oldest block,
                        realize it has unsaved data, mark it{" "}
                        <span className="text-cyan-400">[A] Async</span> to save
                        to the disk, and restart the whole search process!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
