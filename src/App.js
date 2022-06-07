import React from 'react'
import script from './python/main.py';
import script2 from './python/main2.py';
import logo from './logo.svg';
import './App.css';
import PyComp from './components/PyComp';
import react from 'react';

const App = () => {
  const [code, setCode] = React.useState(script);
  const [reload, setReload] = React.useState(false);
  const handleReloadClick = () => {
    setReload(!reload)
    reload ? setCode(script) : setCode(script2) 
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PyComp code={code}/> 
        <button onClick={handleReloadClick}>Reload</button>
      </header>
    </div>
  );
}

export default App;
