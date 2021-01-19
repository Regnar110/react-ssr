import React, { useState } from 'react'
import './App.css';

const App = () => {

  const [count, setCount] = useState(0);

  const handleIncrament = () => {
    setCount(count+1)
  }

  const handleDecrament = () => {
    setCount(count -1)
  }

  return (
    <div className="App">
      <p>{count}</p>
      <button onClick={handleIncrament}>Incrament</button>
      <button onClick={handleDecrament}>Decrament</button>
    </div>
  );
}

export default App;
