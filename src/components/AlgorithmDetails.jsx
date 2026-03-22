import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CodeXml, Server, ShieldQuestion, Zap } from "lucide-react";
// Import the syntax highlighter and the VS Code Dark theme
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// We define the code as a raw string up here so React formatters don't mess up the line breaks
const pseudocodeString = `algorithm getblk(block_number) {
  while (buffer not found) {
    if (block is in hash queue) {
      if (buffer is busy) {
        /* Scenario 3: Wait for specific block */
        sleep("wait for buffer to free");
        continue; 
      }
      
      /* Scenario 1: Cache Hit */
      mark buffer busy;
      remove from free list;
      return buffer;
    } 
    else { /* Block not in hash queue */
      if (free list is empty) {
        /* Scenario 4: Resource Exhaustion */
        sleep("wait for ANY buffer to free");
        continue; 
      }
      
      remove first buffer from free list;
      
      if (buffer marked for delayed write) {
        /* Scenario 5: Must save old data first */
        initiate asynchronous write to disk;
        continue; 
      }
      
      /* Scenario 2: Cache Miss / Reassignment */
      remove from old hash queue;
      put on new hash queue;
      mark buffer busy;
      return buffer;
    }
  }
}`;

export default function AlgorithmModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-800/50 shrink-0">
              <h2 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                <CodeXml size={22} /> The UNIX Buffer Cache Algorithm
              </h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors bg-slate-800 p-1.5 rounded-full cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar text-slate-300 text-sm leading-relaxed space-y-8">
              {/* What & Why Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50">
                  <h3 className="text-blue-400 font-bold text-lg mb-2 flex items-center gap-2">
                    <ShieldQuestion size={18} /> What is it?
                  </h3>
                  <p className="text-slate-400">
                    In classic UNIX System V, the kernel manages a pool of
                    memory called the <strong>Buffer Cache</strong>. When a
                    program wants to read data from the hard drive, it uses the{" "}
                    <code className="text-blue-300 bg-slate-800 px-1 py-0.5 rounded">
                      getblk
                    </code>{" "}
                    algorithm to securely allocate a memory buffer for that
                    specific disk block.
                  </p>
                </div>
                <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50">
                  <h3 className="text-amber-400 font-bold text-lg mb-2 flex items-center gap-2">
                    <Zap size={18} /> Why do we need it?
                  </h3>
                  <p className="text-slate-400">
                    Disk I/O is incredibly slow. By keeping frequently used
                    blocks in RAM (Hash Queues) and tracking unused ones (Free
                    List/LRU), the system prevents the CPU from waiting on the
                    physical disk. It also prevents data corruption by "locking"
                    blocks (Busy state) so two processes don't edit them at
                    once.
                  </p>
                </div>
              </div>

              {/* The 5 Scenarios & Example */}
              <div>
                <h3 className="text-emerald-400 font-bold text-lg mb-3 flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Server size={18} /> How it works: The 5 Scenarios
                </h3>
                <p className="mb-4 text-slate-400">
                  When you request a block, the kernel enters an infinite loop
                  and evaluates five distinct possibilities:
                </p>

                {/* FIXED: Now stacked vertically instead of a grid */}
                <div className="space-y-3 mb-6">
                  <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                    <strong className="text-emerald-300">1. Cache Hit:</strong>{" "}
                    The block is found, and it's Free. We lock it and use it.
                  </div>
                  <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                    <strong className="text-blue-300">2. Cache Miss:</strong>{" "}
                    Not found. We take the oldest block from the Free List,
                    clear it, and assign it to our new block.
                  </div>
                  <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                    <strong className="text-rose-300">3. Locked Block:</strong>{" "}
                    The block is found, but someone else is using it. The kernel
                    puts us to sleep until it frees up.
                  </div>
                  <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                    <strong className="text-slate-400">
                      4. Out of Memory:
                    </strong>{" "}
                    Not found, and the Free List is 100% empty. We sleep until
                    any process releases a block.
                  </div>
                  <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                    <strong className="text-amber-300">
                      5. Delayed Write:
                    </strong>{" "}
                    Not found. We grab the oldest free block, but it contains
                    unsaved data! We trigger an Async Write to disk and restart
                    the search.
                  </div>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500 text-slate-300">
                  <strong className="text-blue-400">Real-World Example:</strong>{" "}
                  Imagine a process requests Block 105. The kernel checks the
                  Hash Queues and doesn't see it. It looks at the Free List and
                  sees Block 14 at the very front (the oldest block). The kernel
                  ejects Block 14, loads Block 105 into that memory space, puts
                  it in the correct Hash Queue, and hands it to the process.
                </div>
              </div>

              {/* Code Editor Styled Pseudocode */}
              <div>
                <h3 className="text-lg font-bold text-slate-100 mb-3 border-b border-slate-800 pb-2">
                  Pseudocode
                </h3>
                <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
                  {/* Editor "Tab" bar */}
                  <div className="bg-[#2D2D2D] px-4 py-2 flex items-center gap-2 border-b border-[#1E1E1E]">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  </div>
                  {/* The Code rendered via Third Party Viewer */}
                  <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: "1.25rem",
                      fontSize: "13px",
                      backgroundColor: "transparent",
                    }}
                  >
                    {pseudocodeString}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
