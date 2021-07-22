import './App.css';
import Movies from './Pages/Movies/Movies';
import React, { useState } from "react";

function App() {
    const [darkMode, setDarkMode] = useState(true);
   const toggleDarkMode=()=>{
      setDarkMode((prev)=> !prev)
  }
  return (
    <div className={`App ${darkMode?'darkMode':''}`}>
      <div className="darkModeWrapper">
       <h2>Toggle Dark</h2>
    <label class="switch">
  <input type="checkbox" onClick={toggleDarkMode} />
  <span class="slider round"></span>
</label>
      </div>
      <div className="moviesContainer"><Movies/></div>
    </div>
  );
}

export default App;
