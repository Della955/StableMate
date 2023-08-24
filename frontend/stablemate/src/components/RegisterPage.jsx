import { useState, useContext, useEffect } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import {api } from "../utilities"; 
import "./register.css"

export const RegisterPage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")
    const { setUser } = useContext(userContext);
    const navigate = useNavigate() 

    const signUp = async (e) => {
      e.preventDefault();
      let response = await api.post("user/signup/", {
        email: userName,
        password: password,
      });
      let user = response.data.user;
      let token = response.data.token;
      // Store the token securely (e.g., in localStorage or HttpOnly cookies)
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      // set the user using with useContext to allow all other pages that need user information
      setUser(user);
      navigate("/home");
    };



return (
    <> 
    <div className="allItems"> 
    <main className="main">
    <div className="logo_image"></div>
    
    <form onSubmit={(e) => signUp(e)}>
      <input
        type="name"
        value={name}
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      /> 
      <input
        type="email"
        value={userName}
        placeholder="email"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
    </main>
    </div>
    </>
  );
}