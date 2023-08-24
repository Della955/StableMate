import { useContext, useState, useEffect } from "react";
import { userContext } from "../App";
import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../utilities"; 
import "./horse.css"
import { ListPage } from "./ListPage";

export const HorseIdPage = () =>{
    const token = localStorage.getItem("token")
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const navigate = useNavigate(); 
    const {horse_id} = useParams();
    const [horseInfo, setHorseInfo] = useState([])
    const [careList, setCareList] = useState([])
    const [editCareList, setEditCareList] = useState([])
    const [feedType, setFeedType] = useState("")
    const [supplements, setSupplements] = useState("")
    const [farrier, setFarrier] = useState("")
    const [turnout, setTurnOut] = useState("")
    const [deletedHorse, setDeletedHorse] = useState([])



    const updateCareList = async(e) => {
        e.preventDefault()
        let user = await api.get('user/info/')
        let response = await api.put(`stable/${user.data.id}/horse/${horse_id}/carelist/`,{
            feed_type: feedType,
            supplements:supplements,
            farrier:farrier, 
            turnout:turnout,
        }) 
        
        setEditCareList(response)  
    }

    const deleteHorse = async(e, horse_id) => {
        e.preventDefault()
        // let get_task = await api.get(`list/${list_id}/task/`)
        // let get_id = get_task.id
        let user = await api.get('user/info/')
        console.log(user.data.id)
        let response = await api.delete(`stable/${user.data.id}/horse/${horse_id}`)
        setDeletedHorse(horse_id) 
        navigate("/stable")
    }

    useEffect( () => {
        const getCareList = async() => {
            let user = await api.get('user/info/')
            console.log(user.data.id)
            let response = await api.get(`stable/${user.data.id}/horse/${horse_id}/carelist/`)
            let care_list_data = response.data 
            setCareList(care_list_data)
        }
        getCareList()
        }, [editCareList])

    useEffect(() => {
    const getHorseInfo = async() => {
        let user = await api.get('user/info/')
        let response = await api.get(`stable/${user.data.id}/horse/${horse_id}`)
        let horse_data = response.data
        setHorseInfo(horse_data)
        }

        getHorseInfo()
    }, [editCareList])

    
    return (
        <div>
        <h1>Name: {horseInfo.name}</h1>
        <div>
        </div>
        

         {
            careList && (
            <div className="form_info">
                <div className="horse_info">ID Number: {horseInfo.id}</div>
                <div>Feed type: {careList.map((item, index) => [item.feed_type])}</div>
                <div>Supplements: {careList.map((item, index) => [item.supplements])}</div>
                <div>Farrier date: {careList.map((item, index) => [item.farrier])}</div>
                <div>Turnout: {careList.map((item, index) => [item.turnout.toString()])}</div>
            
        </div>
        
        )}   
         
            <form>
            <input type="text" 
            placeholder="hay" 
            value={feedType}
            onChange={(e) => setFeedType(e.target.value)}
           />
            Feed Type
            <input type="text" 
            placeholder="none" 
            value={supplements}
            onChange={(e) => setSupplements(e.target.value)}
            />
            Supplements
            <input type="text" 
            placeholder="2023-08-16"
            value={farrier}
            onChange={(e) => setFarrier(e.target.value)}
            />
            Farrier (YYYY-MM-DD)
            <input type="text" 
            placeholder= "True" 
            value={turnout}
            onChange={(e) => setTurnOut(e.target.value)}
            />
            Turnout (True/False)
            <button type="submit" onClick={(e) =>{updateCareList(e)}}>Edit</button>
        </form>
        <button onClick={(e)=> {deleteHorse(e,horse_id)}}>Delete Horse</button>
        </div>
    )
   
}