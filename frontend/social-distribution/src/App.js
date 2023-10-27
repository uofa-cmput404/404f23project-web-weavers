import './App.css';
import Home from './pages/main/home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useState} from 'react';
import LandingPage from './pages/login_signup/landingPage';
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
            <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>}/>
            <Route path = "/admin" element = {<ProtectedRoute><AdminLogin /></ProtectedRoute>}/>
            <Route path = "/profile" element = {<ProtectedRoute><Profile /></ProtectedRoute>}/>
            <Route path = "/inbox" element = {<ProtectedRoute><Inbox /></ProtectedRoute>}/>
            <Route path = "/settings" element = {<ProtectedRoute><Settings /></ProtectedRoute>}/>
            <Route path = "/home" element = {<ProtectedRoute><Home /></ProtectedRoute>}/>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
    </div>
  );
}

export default App;
