import { useState } from "react";

export function useBufferCache() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [numQueues, setNumQueues] = useState(4); // Default to 4

  const [hashQueues, setHashQueues] = useState([]);
  const [freeList, setFreeList] = useState([]);
  const [waitingQueue, setWaitingQueue] = useState([]);
  const [logs, setLogs] = useState([]);

  const log = (msg) => setLogs((prev) => [...prev, msg]);

  // NEW: Dynamic Initialization
  const initializeSystem = (queuesCount, initialBlocksArray) => {
    const qCount = parseInt(queuesCount);
    const finalQCount = isNaN(qCount) || qCount <= 0 ? 4 : qCount;

    setNumQueues(finalQCount);

    let newHQ = Array.from({ length: finalQCount }, () => []);
    let newFree = [];

    initialBlocksArray.forEach((blk) => {
      const blockNum = parseInt(blk);
      if (!isNaN(blockNum) && blockNum > 0) {
        newHQ[blockNum % finalQCount].push({ id: blockNum, status: "f" });
        newFree.push({ id: blockNum, status: "f" });
      }
    });

    setHashQueues(newHQ);
    setFreeList(newFree);
    log(
      `System Initialized with ${finalQCount} Hash Queues and ${newFree.length} blocks.`,
    );
    setIsConfigured(true);
  };

  const getblk = (blkno) => {
    if (isNaN(blkno) || blkno <= 0) return;

    let hq = [...hashQueues.map((q) => [...q])];
    let fl = [...freeList];
    let wq = [...waitingQueue];
    const rem = blkno % numQueues; // Now uses dynamic numQueues
    const hqIndex = hq[rem].findIndex((b) => b.id === blkno);

    if (hqIndex !== -1) {
      if (hq[rem][hqIndex].status === "b") {
        log(`[getblk] Scenario 3: Block ${blkno} found, but busy. Sleep.`);
        if (!wq.some((b) => b.id === blkno))
          wq.push({ id: blkno, status: "w" });
      } else {
        log(`[getblk] Scenario 1: Block ${blkno} found and free. Allocating.`);
        hq[rem][hqIndex].status = "b";
        fl = fl.filter((b) => b.id !== blkno);
      }
    } else {
      if (fl.length === 0) {
        log(
          `[getblk] Scenario 4: Block ${blkno} not found, Free List empty. Sleep.`,
        );
        if (!wq.some((b) => b.id === blkno))
          wq.push({ id: blkno, status: "w" });
      } else {
        const delayedWrites = fl.filter((b) => b.status === "d");
        if (delayedWrites.length > 0) {
          log(
            `[getblk] Scenario 5: Found Delayed Writes. Initiating async write.`,
          );
          delayedWrites.forEach((db) => {
            const dRem = db.id % numQueues;
            const targetIndex = hq[dRem].findIndex((b) => b.id === db.id);
            if (targetIndex !== -1) hq[dRem][targetIndex].status = "a";
          });
          fl = fl.filter((b) => b.status !== "d" && b.status !== "a");
        }

        if (fl.length > 0) {
          log(
            `[getblk] Scenario 2: Reassigned buffer from Free List for block ${blkno}.`,
          );
          const oldBlock = fl.shift();
          const oldRem = oldBlock.id % numQueues;
          hq[oldRem] = hq[oldRem].filter((b) => b.id !== oldBlock.id);
          hq[rem].push({ id: blkno, status: "b" });
        }
      }
    }
    setHashQueues(hq);
    setFreeList(fl);
    setWaitingQueue(wq);
  };

  const brelse = (blkno) => {
    if (isNaN(blkno) || blkno <= 0) return;
    let hq = [...hashQueues.map((q) => [...q])];
    let fl = [...freeList];
    let wq = [...waitingQueue];
    const rem = blkno % numQueues;
    const hqIndex = hq[rem].findIndex((b) => b.id === blkno);

    if (hqIndex !== -1) {
      const status = hq[rem][hqIndex].status;
      hq[rem][hqIndex].status = "f";
      fl = fl.filter((b) => b.id !== blkno);

      if (status === "a") {
        fl.unshift({ id: blkno, status: "f" });
        log(`[brelse] Block ${blkno} (Async) released to FRONT of Free List.`);
      } else {
        fl.push({ id: blkno, status: "f" });
        log(`[brelse] Block ${blkno} released to BACK of Free List.`);
      }
    } else {
      log(`[brelse] Error: Block ${blkno} not found!`);
    }

    if (wq.length > 0) {
      const awakened = wq.shift();
      log(`[WAKEUP] Process waiting for block ${awakened.id} awakened!`);
    }
    setHashQueues(hq);
    setFreeList(fl);
    setWaitingQueue(wq);
  };

  const changeStatus = (blkno, newStatus) => {
    if (isNaN(blkno) || blkno <= 0) return;
    let hq = [...hashQueues.map((q) => [...q])];
    let fl = [...freeList];
    const rem = blkno % numQueues;
    const hqIndex = hq[rem].findIndex((b) => b.id === blkno);

    if (hqIndex !== -1) {
      hq[rem][hqIndex].status = newStatus;
      if (newStatus === "f") {
        if (!fl.some((b) => b.id === blkno))
          fl.push({ id: blkno, status: "f" });
      } else {
        fl = fl.filter((b) => b.id !== blkno);
      }
      log(`[Status] Block ${blkno} changed to '${newStatus}'`);
      setHashQueues(hq);
      setFreeList(fl);
    } else {
      log(`[Status] Block ${blkno} not in Cache.`);
    }
  };

  const addBlock = (blkno) => {
    if (isNaN(blkno) || blkno <= 0) return;
    let hq = [...hashQueues.map((q) => [...q])];
    let fl = [...freeList];
    const rem = blkno % numQueues;

    if (hq[rem].some((b) => b.id === blkno)) {
      log(`[Add] Block ${blkno} already in system.`);
      return;
    }

    hq[rem].push({ id: blkno, status: "f" });
    fl.push({ id: blkno, status: "f" });
    log(`[Add] Block ${blkno} manually injected.`);
    setHashQueues(hq);
    setFreeList(fl);
  };

  return {
    isConfigured,
    initializeSystem,
    numQueues,
    hashQueues,
    freeList,
    waitingQueue,
    logs,
    getblk,
    brelse,
    changeStatus,
    addBlock,
  };
}
