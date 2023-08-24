import { useState } from 'react'
import Navbar from './components/Navbar';
import { GrTask } from "react-icons/gr";
import { GrCalendar } from "react-icons/gr";
import {GiHorseshoe} from "react-icons/gi"
import { Link, Outlet } from "react-router-dom";
import { createContext } from "react";
import { useEffect, useRef } from "react";
import { api } from "./utilities";
import { useNavigate, useLocation} from "react-router-dom";
export const userContext = createContext() 
import axios from 'axios';
import "./App.css"
export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const lastVisited = useRef();
  const [user, setUser] = useState(null);
  const [icon, setIcon] = useState([])
  useEffect(() =>{
    console.log(user)
  }, [user])

  const whoAmI = async () => {
    // Check if a token is stored in the localStorage
    let token = localStorage.getItem("token");
    if (token) {
      // If the token exists, set it in the API headers for authentication
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      // Fetch the user data from the server using the API
      let response = await api.get("user/info");
      // Check if the response contains the user data (email field exists)
      if (response.data.email) {
        // Set the user data in the context or state (assuming `setUser` is a state update function)
        setUser(response.data);
        // If the user is authenticated and there is a stored lastVisited page,
        // navigate to the lastVisited page; otherwise, navigate to the default homepage "/home"
        if (lastVisited.current) {
          navigate(lastVisited.current);
        } else {
          navigate("/home");
        }
      }
    } else {
      // If no token is found, navigate to the login page
      navigate("/login");
    }
  };

  const logout = async() => {
    let response = await api.post("user/logout/"); 
    if (response.status === 204){
      localStorage.removeItem("token")
      setUser(null)
      delete api.defaults.headers.common["Authorization"]
      navigate("/login")
    }
  }
  useEffect(() => {
    whoAmI();
  }, []);

  useEffect(() => {
    if (!user) {
      // If the user is not authenticated, update the lastVisited ref with the current location pathname
      lastVisited.current = location.pathname;
    }
  }, [location, icon]);

  useEffect( () => {
    const getBarnIcon = async () => {
      let response = await api.get("noun/barn")
      let icon_data = response.data 
      setIcon(icon_data)
    }
    getBarnIcon()
  }, [])
  return (
    <div className="app">
      <nav>{
        user
        ?
        <>
          <div className='home_logo_image'>
          </div>
          <Link to="/home"><h3><img src={icon} />Home</h3></Link> 
          <div>
          <h3><GrTask className='task_icon'/><Link to="/list">Lists</Link></h3>
          </div>
          <h3><GiHorseshoe className="stable_icon"/><Link to="/stable">Stable</Link></h3>
          <h3><GrCalendar className="calendar_icon" /><Link to="/calendar">Calendar</Link></h3>
          <button className="logout" onClick={logout}>Logout</button>
          
        </>
          :
        <>
          <h3><Link to="/">Register</Link></h3>
          <h3><Link to="/login">Log In</Link></h3>
        </>
        }
       
      </nav>
      <userContext.Provider value={{ user, setUser }}>
        <Outlet />
      </userContext.Provider>
    </div>
  ); 
}


