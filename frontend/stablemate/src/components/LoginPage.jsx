import { useState, useContext } from "react";
import { userContext } from "../App";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";


export const LoginPage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(userContext);
    const navigate = useNavigate();

    const login = async(e) => {
        e.preventDefault(); 
        let response = await api.post("user/login/", {
          email : userName,
          password : password, 
        })
        .catch((err) =>{
          alert("Incorrect credentials")
        })
        console.log(response)
        let user = response.data.user 
        let token = response.data.token 
        
        localStorage.setItem("token", token)
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        setUser(user)
        navigate("/home")

        console.log("EMAIL: ", response.data.user)
      }

      return (
        <form onSubmit={(e) => login(e)}>
          <h3>Welcome to Stablemate</h3>
          <h5>Log In</h5>
          <input
            type="email"
            placeholder="email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" />
        </form>
      );
    };
    