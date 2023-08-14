import { useState, useContext, useEffect } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import {api } from "../utilities"; 


export const RegisterPage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(userContext);
    const navigate = useNavigate() 

    const signUp = async(e) => {
      e.preventDefault() 
      let response = await api.post("user/signup/", {
        email : userName,
        password : password, 
      })
      console.log(response)
      let user = response.data.user
      let token = response.data.token  
      localStorage.setItem("token", token)
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      setUser(user) 
      navigate("/home"); 
    }



return (
    <> 
    <form onSubmit={(e) => signUp(e)}>
      <h3>Welcome to Stablemate</h3>
      <h5>Sign Up</h5>
      <input
        type="email"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
    </>
  );
}