import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [gridData, setGridData] = useState(null)
  const [obstacles, setObstacles] = useState([])
  const [flightPath, setFlightPath] = useState([])
  const [qMetrics, setQMetrics] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/grid')
      .then(res => res.json())
      .then(data => setGridData(data))
  }, [])

  const runAIPrediction = () => {
    setFlightPath([]) // Clear old path
    setQMetrics(null) // Clear old metrics
    fetch('http://127.0.0.1:8000/api/predict')
      .then(res => res.json())
      .then(data => setObstacles(data.obstacles))
  }

  const runQuantumRoute = () => {
    fetch('http://127.0.0.1:8000/api/route/quantum', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        start_node: "0,0",
        end_node: "4,4",
        obstacles: obstacles
      })
    })
      .then(res => res.json())
      .then(data => {
        setFlightPath(data.path)
        setQMetrics(data.metrics)
      })
  }

  return (
    <div className="dashboard">
      <h1>Hybrid UAV Routing Control</h1>
      
      <div className="controls">
        <button className="btn-ai" onClick={runAIPrediction}>1. Predict Environment</button>
        <button className="btn-quantum" onClick={runQuantumRoute} disabled={obstacles.length === 0}>
          2. Execute Quantum Route
        </button>
      </div>

      {qMetrics && (
        <div className="telemetry-panel">
          <p><strong>Status:</strong> Quantum Optimized</p>
          <p><strong>Simulated Qubits:</strong> {qMetrics.qubits_used}</p>
          <p><strong>Circuit Depth:</strong> {qMetrics.circuit_depth}</p>
        </div>
      )}
      
      {!gridData ? (
        <p>Connecting...</p>
      ) : (
        <div className="grid-container">
          {gridData.nodes.map(node => {
            const isObstacle = obstacles.includes(node.id)
            const isPath = flightPath.includes(node.id)
            const isStartOrEnd = node.id === "0,0" || node.id === "4,4"
            
            let classes = "grid-node "
            if (isObstacle) classes += "obstacle "
            if (isPath) classes += "path "
            if (isStartOrEnd) classes += "endpoint "

            return (
              <div key={node.id} className={classes}>
                {node.id}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default App