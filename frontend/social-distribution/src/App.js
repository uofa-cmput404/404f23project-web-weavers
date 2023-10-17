import './App.css';
import Login from './login';
import Home from "./home"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useEffect, useState} from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className = {"App"}>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Login setLoggedIn={setLoggedIn}/>} />
          <Route path = "/home" element = {<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
