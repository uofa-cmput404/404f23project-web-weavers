import './App.css';
import Login from './login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useEffect, useState} from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className = {"App"}>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Login setLoggedIn={setLoggedIn}/>} />
          <Route path = "/home"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
