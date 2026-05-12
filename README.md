# 🚁 Hybrid Quantum-Classical UAV Routing Pipeline

An interactive, full-stack web application designed to solve dynamic pathfinding problems for Unmanned Aerial Vehicles (UAVs). This project bridges the gap between classical machine learning and quantum computing by simulating an environment where an AI predicts real-time flight hazards, and a hybrid quantum algorithm calculates the most efficient route to avoid them.

## 🌟 Key Features

* **Dynamic Airspace Simulation:** Maps a 2D coordinate grid representing UAV waypoints using Python's `networkx` graph theory library.
* **AI Predictive Layer:** Simulates a machine learning environment that dynamically identifies and updates high-risk zones (e.g., wind shear, signal jamming) in real-time.
* **Quantum Routing Layer (Qiskit):** Translates the optimized flight path into a quantum circuit using IBM's Qiskit. Simulates quantum statevectors to extract telemetry metrics like qubit usage and circuit depth.
* **Full-Stack Observability:** A responsive React dashboard that visualizes the drone's radar, live obstacle generation, and the final quantum-optimized flight path.

## 🛠️ Tech Stack

* **Frontend:** React, Vite, CSS (Radar-style UI)
* **Backend Orchestration:** FastAPI, Uvicorn, Python
* **Quantum Computing:** IBM Qiskit, Qiskit Aer Simulator
* **Mathematical Modeling:** NetworkX (Graph Theory)

## 🏗️ Architecture

This pipeline operates in three distinct phases:

1.  **The API Foundation:** FastAPI serves the baseline 5x5 mathematical grid to the frontend. All edge weights (flight costs) are initialized at `1.0`.
2.  **The Predictive Phase:** The user triggers the AI layer. The backend calculates dynamic hazard zones and updates the specific graph edge weights to `999.0` (impassable). 
3.  **The Quantum Phase:** The backend calculates the mathematical shortest path avoiding the hazards. It then generates a corresponding quantum circuit (using Hadamard and CNOT gates to entangle the path's state) and simulates the circuit to verify the route and output quantum telemetry to the UI.

## 💻 How to Run This on Your Own Laptop

Since this project requires a live Python backend to run the IBM Qiskit quantum simulations, it cannot be hosted on a static site like GitHub Pages. However, you can easily run the entire full-stack application locally on your machine!

### Prerequisites
Before you begin, ensure you have the following installed on your computer:
* **[Node.js](https://nodejs.org/)** (v16 or higher)
* **[Python](https://www.python.org/downloads/)** (v3.8 or higher)
* **Git**

### Step 1: Clone the Repository
First, download the code to your machine by running this in your terminal:
```bash
git clone [https://github.com/BhoomikaSalunke/Hybrid-Quantum-UAV-Routing.git](https://github.com/BhoomikaSalunke/Hybrid-Quantum-UAV-Routing.git)
cd Hybrid-Quantum-UAV-Routing

```

### Step 2: Boot Up the Quantum Backend (Python)

Open a terminal in the root folder of the project to start the FastAPI server.

1. **Install the required Python libraries:**
```bash
pip install fastapi uvicorn pydantic networkx qiskit qiskit-aer

```


2. **Start the server:**
```bash
python -m uvicorn server:app --reload

```


*(Keep this terminal open and running! The API is now live at `http://127.0.0.1:8000`)*

### Step 3: Boot Up the Frontend Dashboard (React)

Open a **second, separate terminal** (leave the Python server running in the first one), and navigate to the frontend folder:

1. **Move into the React folder:**
```bash
cd uav-dashboard

```


2. **Install the Node dependencies:**
```bash
npm install

```


3. **Start the dashboard:**
```bash
npm run dev

```



### Step 4: Run the Simulation

Once the React server starts, it will give you a local web link (usually `http://localhost:5173`).

* Ctrl+Click (or Cmd+Click) that link to open the dashboard in your browser.
* Click **"Predict Environment"** to simulate AI danger zones.
* Click **"Execute Quantum Route"** to watch the backend generate the quantum circuit and map the safest flight path!
