import React, { useState } from 'react'
import './App.css';
import p1 from './images/p1.jpg'

const App = (context) => {

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
      <img src={p1} />
    </div>
  );
}

export default App;
