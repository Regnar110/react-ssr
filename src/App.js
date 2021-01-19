import React, { useState } from 'react'
import withStyles from 'isomorphic-style-loader/withStyles'
import appStyles from './App.css';

const App = (context) => {

  const [count, setCount] = useState(0);

  const handleIncrament = () => {
    setCount(count+1)
  }

  const handleDecrament = () => {
    setCount(count -1)
  }

  return (
    <div className={appStyles.App}>
      <p>{count}</p>
      <button onClick={handleIncrament}>Incrament</button>
      <button onClick={handleDecrament}>Decrament</button>
    </div>
  );
}

export default withStyles(appStyles)(App);
