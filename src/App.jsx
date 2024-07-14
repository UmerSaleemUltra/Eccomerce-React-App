import { useState, useEffect } from 'react';
import Router from '../src/Confing/Router'; // Ensure the directory name is correct
import firebase from 'firebase/compat/app';
import './index.css';

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
