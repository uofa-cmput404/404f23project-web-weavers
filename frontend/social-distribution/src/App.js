import './App.css';
import Login from './pages/login_signup/login';
import Home from './pages/main/home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useEffect, useState} from 'react';
import LandingPage from './pages/login_signup/landingPage';
import Signup from './pages/login_signup/signup';
import AdminLogin from './pages/login_signup/adminLogin';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className = {"App"}>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<LandingPage />} />
          <Route path = "/login" element = {<Login setLoggedIn={setLoggedIn}/>} />
          <Route path = "/home" element = {<Home/>}/>
          <Route path = "/signup" element = {<Signup />} />
          <Route path = "/admin" element = {<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
