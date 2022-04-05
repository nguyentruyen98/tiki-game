import React, { useState } from 'react';

import './App.css';

function App() {
  const [sizeMatrix, setSizeMatrix] = useState<any>(0)
  const [coordinates, setCoordinates] = useState<any>({ x: 0, y: 0 })
  const [matrix, setMatrix] = useState<any>([])
  const handleGenerateMatrix = () => {

    const matrix: any = [];
    for (let i = 0; i < sizeMatrix; i++) {
      matrix[i] = []
      for (let j = 0; j < sizeMatrix; j++) {
        if (j % 2 === 1) {
          matrix[i].push(matrix[i][j - 1] + 2 * (sizeMatrix - i) - 1)
        }
        else { matrix[i].push(j * sizeMatrix + i + 1) }
      }
    }
    setMatrix(matrix)
    console.log(matrix);
  }

  const handleDrag = (e: any) => {
    setCoordinates({
      x: e.target.id.slice(0, 1), y: e.target.id.slice(2, 3)
    })
  }

  const handleDrog = (e: any) => {
    e.preventDefault();
    const x = e.target.id.slice(0, 1);
    const y = e.target.id.slice(2, 3);

    const newMatrix = [...matrix]
    const prev = newMatrix[coordinates.x - 1][coordinates.y - 1]
    const next = newMatrix[x - 1][y - 1]
    newMatrix[coordinates.x - 1][coordinates.y - 1] = next
    newMatrix[x - 1][y - 1] = prev


    setMatrix(newMatrix)

  }
  const allowDrop = (e: any) => {
    e.preventDefault();
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type='number' value={sizeMatrix} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSizeMatrix(+e.target.value)} />
        <button onClick={handleGenerateMatrix}>Generate Matrix</button>
        <div className="matrix-container">
          {matrix?.map((x: any, xIndex: number) => <tr>{x.map((y: number, yIndex: number) => <td id={`${xIndex + 1} ${yIndex + 1}`} draggable={true} onDrop={handleDrog} onDrag={handleDrag} onDragOver={allowDrop}>{y}</td>)}</tr>)}
        </div>
      </header>
    </div>
  );
}

export default App;
