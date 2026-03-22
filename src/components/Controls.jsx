import React, { useState } from "react";

export default function Controls({ getblk, brelse, changeStatus, addBlock }) {
  const [inputValue, setInputValue] = useState("");

  const handleAction = (action) => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    action(val);
    setInputValue("");
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-xl">
      <h2 className="text-lg font-bold text-slate-200 mb-4 font-mono tracking-wider">
        SYSTEM CONTROLS
      </h2>

      <input
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value.replace(/\D/g, ""))} // Strips all non-numbers
        placeholder="Target Block ID..."
        className="w-full bg-slate-900 border border-slate-600 text-slate-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono mb-4 placeholder-slate-500"
      />

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => handleAction(getblk)}
          className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg font-bold transition-colors"
        >
          getblk()
        </button>
        <button
          onClick={() => handleAction(brelse)}
          className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-lg font-bold transition-colors"
        >
          brelse()
        </button>
        <button
          onClick={() => handleAction(addBlock)}
          className="col-span-2 bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-lg font-bold transition-colors text-sm"
        >
          Inject New Block
        </button>
      </div>

      <h3 className="text-xs uppercase font-bold text-slate-500 mb-2 tracking-wider">
        Force Status Mutation
      </h3>
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => {
            changeStatus(parseInt(inputValue), "f");
            setInputValue("");
          }}
          className="bg-slate-700 hover:bg-emerald-600 border border-emerald-500/30 text-white p-2 rounded-lg text-xs font-bold transition-colors"
        >
          Set Free
        </button>
        <button
          onClick={() => {
            changeStatus(parseInt(inputValue), "b");
            setInputValue("");
          }}
          className="bg-slate-700 hover:bg-rose-600 border border-rose-500/30 text-white p-2 rounded-lg text-xs font-bold transition-colors"
        >
          Set Busy
        </button>
        <button
          onClick={() => {
            changeStatus(parseInt(inputValue), "d");
            setInputValue("");
          }}
          className="bg-slate-700 hover:bg-amber-600 border border-amber-500/30 text-white p-2 rounded-lg text-xs font-bold transition-colors"
        >
          Set Delayed
        </button>
      </div>
    </div>
  );
}
