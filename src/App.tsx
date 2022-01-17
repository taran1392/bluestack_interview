import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000)
    return () => {
      clearInterval(timer);
    }
  }, [])

  return (
    <div className="">
      <div style={{textAlign: 'center'}}>
        <h2>{date.toDateString()}</h2>
        <h2>{date.toTimeString()}</h2>
      </div>
    </div>
  );
}

export default App;
