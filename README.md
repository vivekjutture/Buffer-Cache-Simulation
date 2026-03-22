# UNIX Buffer Cache Simulator 🐧💾

A professional, interactive visual simulator for the classic **UNIX System V** buffer cache management algorithms (`getblk` and `brelse`). This tool is designed for Computer Science students to visualize kernel-level disk I/O buffering.

Built with the cutting-edge **React 19.2** and **Tailwind CSS v4.2** stack.

---

## 🧠 The Algorithm: A Deep Dive

The UNIX kernel uses a **Buffer Cache** to bridge the speed gap between the fast CPU and the slow Hard Disk. The `getblk` algorithm is the "manager" that finds or allocates memory for disk blocks.

### The 5 Scenarios of `getblk`
1. **Cache Hit:** The block is already in the Hash Queue and is **Free**. The kernel locks it and hands it to the process.
2. **Cache Miss:** The block is not in memory. The kernel grabs the **oldest** buffer from the Free List (Least Recently Used), reassigns it to the new block, and moves it to the correct Hash Queue.
3. **Locked Block:** The block is found, but it is **Busy** (locked by another process). The requesting process goes to sleep.
4. **Out of Memory:** The block is not found, and the Free List is completely empty. The process goes to sleep waiting for *any* buffer to be released.
5. **Delayed Write:** The kernel tries to reuse a buffer from the Free List, but it contains unsaved modifications. It initiates an **Asynchronous Write** and restarts the search.

---

## 🎮 How to Use the Simulator

### 1. Initialization
When you first load the app, you will see the **System Setup** screen. 
- **Hash Queues:** Enter how many bins you want to organize blocks into (Default is 4).
- **Initial Blocks:** Enter the total number of blocks to start with.
- **Assign Block Numbers:** A list of emerald-bordered inputs will appear. Enter your starting block IDs here. These inputs strictly allow only numbers.

### 2. Main Dashboard
Once initialized, you have full control over the kernel:
- **[getblk]**: Type a Block ID in the control panel to request it. Watch the animations as blocks slide between Hash Queues and the Free List.
- **[brelse]**: Type a Busy block's ID and click release to return it to the back of the Free List (LRU policy).
- **Force Status**: Manually set blocks to **Delayed** or **Busy** to test how the algorithm reacts to Scenario 3 or Scenario 5.

---

## 🛠️ Technical Implementation

### File Structure
- `App.jsx`: Main entry point and high-level layout.
- `useBufferCache.js`: The "Brain" - holds the full C++ logic translated to React state.
- `SetupScreen.jsx`: Dynamic initialization wizard with numeric validation.
- `AlgorithmModal.jsx`: Comprehensive theory guide with VS Code-style syntax highlighting.
- `GuideModal.jsx`: Step-by-step interactive user walkthrough.
- `Block.jsx`: Animated UI component for the disk blocks.

### Tech Stack
- **React 19.2**: Utilizing Concurrent Rendering.
- **Tailwind CSS v4.2**: Ultra-fast CSS-first styling engine.
- **Framer Motion**: Smooth "sliding" layout animations.
- **Lucide React**: Professional system iconography.

---

## 🚀 Installation & Setup

1. Clone the repository:
   git clone https://github.com/your-username/unix-buffer-simulator.git

2. Install Dependencies:
   npm install

3. Run Development Server:
   npm run dev

4. Build for Production:
   npm run build

---

## 📄 License
MIT License - Feel free to use this for educational purposes.