import { useState, useContext } from "react";
import { userContext } from "../App";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";
import "./login.css"; 

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
   
        let user = response.data.user 
        let token = response.data.token 
        
        localStorage.setItem("token", token)
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        setUser(user)
        navigate("/home")

      }

      return (
        <div className="allItems">
        <main className="main"> 
        <div className="logo_image">
        </div>
        <form onSubmit={(e) => login(e)}>
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
        <footer></footer>
        </main>
        </div>
      );
    };
    