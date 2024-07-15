import React from 'react';
import Router from './Confing/Router'; 
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router />
      </header>
    </div>
  );
}

export default App;
