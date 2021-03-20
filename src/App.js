import React from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn'
import Home from './components/Home/Home';
import { Constants } from './Constants';

function App() {
  const path = window.location.pathname;
  let content = "";
  if (path === "/home") {
    if (sessionStorage.getItem(Constants.USER_NAME)
      && sessionStorage.getItem(Constants.DIFFICULTY_LEVEL)) {
      content = <Home />
    }
    else {
      window.location.href = "/";
    }
  }
  else {
    content = <SignIn />
  }

  return (
    <div className="App">
      { content}
    </div>
  );
}

export default App;
