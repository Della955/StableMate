import { useContext, useState, useEffect } from "react";
import { userContext } from "../App";
import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../utilities"; 
import "./horse.css"

export const StablePage = () =>{
    const token = localStorage.getItem("token")
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const { user } = useContext(userContext); 

    const [stable, setStable] = useState([])
    const [icon, setIcon] = useState([])

    useEffect(() =>{
    const getStable = async() => {
        let response = await api.get("stable/")
        let stabledata = response.data
        setStable(stabledata)
    }
    getStable()
    }, [])

    useState(() => {
    const getHorseIcon = async () => {
        let response = await api.get("noun")
        let icon_data = response.data 
        console.log(icon_data)
        setIcon(icon_data)
    }
    getHorseIcon()
}, [])

    return(
        <div>
        <h2>Stable page</h2>

        {stable.map((list, index) =>(
                <div className="all_horses" key={index}> 
                    {list.name} 
                    {list.horses.map((task_item, index) =>
                       <div className="horse_icon" key={index}>
                       <Link to={`/stable/${task_item.id}`}><img src={icon} /></Link>
                       <div className="horse_name">{task_item.name} </div> 
                        </div> 
                    )}
                </div>)
            )}
            <button className="add_horse"><Link to="/addHorse">Add a horse</Link></button>
           
        </div>
    )
}