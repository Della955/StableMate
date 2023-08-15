import { useState } from 'react'
import Navbar from './components/Navbar';
import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { createContext } from "react";
import { useEffect } from "react";
import { api } from "./utilities";
import { useNavigate } from "react-router-dom";
export const userContext = createContext() 

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  useEffect(() =>{
    console.log(user)
  }, [user])

  // const whoAmI = async() => {
  //   let token = localStorage.getItem("token")
  //   if (token){
  //     api.defaults.headers.common["Authorization"] = `Token ${token}`
  //     let response = await api.get("user/info")
  //     setUser(response.data)
  //     navigate("home")
  //   }
  //   else{
  //     setUser(null)
  //     navigate("login")
  //   }
    
  // }

  const logout = async() => {
    let response = await api.post("user/logout/"); 
    if (response.status === 204){
      localStorage.removeItem("token")
      setUser(null)
      delete api.defaults.headers.common["Authorization"]
      navigate("/login")
    }
  }


  // useEffect(() =>{
  //   whoAmI() 
  // }, [])


  return (
    <div id="app">
      <nav>{
        user
        ?
        <>
          <h1>Stablemate</h1>
          <h3><Link to="/home">Home</Link></h3>
          <h3><Link to="/list">Lists</Link></h3>
          <h3>Horses</h3>
          <h3>Calendar</h3>
          <button onClick={logout}>Logout</button>
        </>
          :
        <>
          <Link to="/">Register</Link>
          <Link to="/login">Log In</Link>
        </>
        }
       
      </nav>
      <userContext.Provider value={{ user, setUser }}>
        <Outlet />
      </userContext.Provider>
    </div>
  ); 
}


