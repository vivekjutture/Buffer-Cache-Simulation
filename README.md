# UNIX Buffer Cache Simulator 🐧💾

A highly interactive, visual simulator for the classic UNIX System V buffer cache management algorithms (`getblk` and `brelse`). Built with React 19, Tailwind CSS v4, and Framer Motion.

This project is designed as an educational tool for Computer Science students and operating system enthusiasts to visualize how kernels manage disk I/O through intermediate memory buffers.

![Simulator Preview Placeholder](https://via.placeholder.com/800x400.png?text=Simulator+Screenshot+Here) *(Add your screenshot here later)*

## ✨ Features

* **Real-time Visualization:** Watch blocks physically slide between Hash Queues, the Free List, and Waiting Queues.
* **Faithful Recreation:** Accurately simulates Maurice J. Bach's 5 core scenarios of the `getblk` algorithm.
* **Interactive Controls:** Request blocks (`getblk`), release them (`brelse`), or manually mutate states to simulate edge cases (Delayed Writes, Cache Misses).
* **Terminal Logging:** A built-in log viewer tracks exactly which algorithm scenario is being triggered at any given moment.
* **Modern Tech Stack:** Utilizes React 19's Strict-Mode optimizations and the blazing-fast Tailwind v4 Lightning CSS engine.

## 🧠 Understanding the Algorithm

The UNIX kernel rarely reads/writes directly to a hard disk. Instead, it uses a **Buffer Cache** in main memory to speed up operations. The `getblk` algorithm is responsible for finding a buffer for a requested disk block. 

It manages two main data structures:
1. **Hash Queues:** Allows the kernel to instantly check if a block is already in memory.
2. **The Free List:** A doubly-linked list tracking buffers that aren't currently being used, utilizing an **LRU (Least Recently Used)** caching policy.

### The 5 Scenarios of `getblk`
When you request a block in this simulator, it processes one of five distinct paths:
1. **Cache Hit (Ideal):** The block is found on the Hash Queue and is Free. It is marked Busy and removed from the Free List.
2. **Cache Miss (Allocation):** The block is not in memory. The oldest buffer is popped off the front of the Free List, reassigned to the new block, and added to the Hash Queue.
3. **Locked Block:** The block is found, but another process is currently writing to it (Busy). The process goes to sleep (moves to Wait Queue).
4. **Out of Memory:** The block is not found, and the Free List is completely empty. The process goes to sleep waiting for *any* block to free up.
5. **Delayed Write:** The kernel attempts Scenario 2, but the block it grabs from the Free List contains modified data that hasn't been saved to disk yet. It initiates an Async Write and restarts the search.

## 🚀 How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) installed.

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/unix-buffer-simulator.git](https://github.com/yourusername/unix-buffer-simulator.git)
   cd unix-buffer-simulator