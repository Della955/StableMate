import { useContext, useState, useEffect } from "react";
import { userContext } from "../App";
import { Link } from "react-router-dom"; 
import axios, { all } from "axios";
import { api } from "../utilities";
import Navbar from "./Navbar";
import "./list.css"; 

export const ListPage = () => {
    const [addList, setAddList] = useState([])
    const [allList, setAllList] = useState([])
    const [deletedList, setDeletedList] = useState([])

    const { user } = useContext(userContext); 
    const token = localStorage.getItem("token")
    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    const createList = async(e) => {
        e.preventDefault() 
        let response = await api.post("list/", {
            list_name: addList
        })
        let name = response.data
        setAddList(name)
        e.preventDefault() 
    }
    

    const deleteList = async(e, list_id) => {
        e.preventDefault() 
        let response = await api.delete(`list/${list_id}`)
        setDeletedList(list_id) 
    }

    useEffect(() =>{
    const getAllLists = async() => {
        let response = await api.get("list/")
        let listData = response.data
        setAllList(listData)
    }
    
    getAllLists()

    }, [deletedList, addList])

    
    return (
      <div>
        <h1>List</h1>
        <h3>Click on a list to view tasks</h3>
        <div className="list_of_list">
        {
            allList && (
            <>
            {allList.map((list, index) =>(
                <div key={index}> 
                    <Link to={`/list/${list.id}`}>{list.list_name}</Link>
                    <button onClick={(e) =>{deleteList(e, list.id)}}>Delete</button> 
                </div>)
            )}
            
            </>  
        )}
        </div>
        <div className="add_list_form">
        <form onSubmit={(e) =>createList(e)}>
            <input type="text" 
            placeholder="name" 
            value={addList}
            onChange={(e) => setAddList(e.target.value)} />
            <button type="submit">Add new List</button>
        </form>
        </div>
      </div>
    );
  };