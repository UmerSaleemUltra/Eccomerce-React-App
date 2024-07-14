import { useState, useEffect } from 'react';
import Router from './Confing/Router';
import firebase from 'firebase/compat/app';
import firebase from './Confing/Firebase';
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