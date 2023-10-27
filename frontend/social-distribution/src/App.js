import './App.css';
import Login from './pages/login_signup/tab_screens/login';
import Home from './pages/main/home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useState} from 'react';
import LandingPage from './pages/login_signup/landingPage';
import Signup from './pages/login_signup/tab_screens/signup';
import AdminLogin from './pages/login_signup/tab_screens/adminLogin';
import Settings from './pages/main/settings';
import Inbox from './pages/main/inbox';
import Profile from './pages/main/profile';
import Explore from './pages/main/explore';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import {store, persistor } from './store/index';
import {ProtectedRoute} from "./routes/ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className = {"App"} >
      <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <Routes>
            <Route path = "/" element = {<LandingPage />} />

            <Route element={<ProtectedRoute  />}>
              <Route path="/home" element={<Home />} />
            </Route>

            <Route path = "/signup" element = {<Signup />} />
            <Route path = "/admin" element = {<AdminLogin />} />
            <Route path = "/explore" element = {<Explore/>}/>
            <Route path = "/profile" element = {<Profile/>}/>
            <Route path = "/inbox" element = {<Inbox/>}/>
            <Route path = "/settings" element = {<Settings/>}/>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
    </div>
  );
}

export default App;
