import { useContext, useState, useEffect } from "react";
import { userContext } from "../App";
import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../utilities"; 
import { ListPage } from "./ListPage";

export const AddHorse = () =>{
    const token = localStorage.getItem("token")
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const { user } = useContext(userContext); 
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [horse, setHorse] = useState([])
    const [icon, setIcon] = useState([])

    useState(() => {
    const getHorseIcon = async () => {
        let response = await api.get("noun")
        let icon_data = response.data 
        console.log(icon_data)
        setIcon(icon_data)
    }
    getHorseIcon()
}, [])
// http://127.0.0.1:8000/api/v1/stable/1/horse/12/carelist/ 

    const addHorse = async(e) => {
        e.preventDefault() 
        let user = await api.get('user/info/')

        let response = await api.post(`stable/${user.data.id}/horse/`, {
            name: name,
            age: age 
        })
        let horse_data = response.data
         
        setHorse(horse_data)
        navigate("/stable")
  
    }

    return(
        <div>
        <h2>Add Horse</h2>
        <form onSubmit={(e) => addHorse(e)}>
        <h3>Add a horse to your stable</h3>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange= {(e) => setName(e.target.value)} 
          />
          <input
            type="text"
            placeholder="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input type="submit" />
        </form>
        </div>
        
    )
   
}