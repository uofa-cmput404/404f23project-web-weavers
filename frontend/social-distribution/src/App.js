import './App.css';
import Login from './pages/login_signup/tab_screens/login';
import Home from './pages/main/home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useEffect, useState} from 'react';
import LandingPage from './pages/login_signup/landingPage';
import Signup from './pages/login_signup/tab_screens/signup';
import AdminLogin from './pages/login_signup/tab_screens/adminLogin';
import Settings from './pages/main/settings';
import Inbox from './pages/main/inbox';
import Profile from './pages/main/profile';
import Explore from './pages/main/explore';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className = {"App"} >
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<LandingPage />} />
          <Route path = "/login" element = {<Login setLoggedIn={setLoggedIn}/>} />
          <Route path = "/home" element = {<Home/>}/>
          <Route path = "/signup" element = {<Signup />} />
          <Route path = "/admin" element = {<AdminLogin />} />
          <Route path = "/explore" element = {<Explore/>}/>
          <Route path = "/profile" element = {<Profile/>}/>
          <Route path = "/inbox" element = {<Inbox/>}/>
          <Route path = "/settings" element = {<Settings/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
