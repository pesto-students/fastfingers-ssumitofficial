import React from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn'
import Home from './components/Home/Home';

function App() {
  const path = window.location.pathname;
  let content = "";
  switch(path){
    case "/home":
      content = <Home/>
      break;
    default:
      content = <SignIn/>
  }

  return (
    <div className="App">
      { content }
    </div>
  );
}

export default App;
