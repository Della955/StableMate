import { useContext, useState, useEffect } from "react";
import { userContext } from "../App";
import { Link } from "react-router-dom"; 
import axios, { all } from "axios";
import { api } from "../utilities";

export const ListPage = () => {
    const [list, setList] = useState([])
    const [allList, setAllList] = useState([])

    const { user } = useContext(userContext); 
    const token = localStorage.getItem("token")
    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    const createList = async(e) => {
        e.preventDefault() 
        let response = await api.post("list/", {
            list_name: list
        })
        console.log(response.data)
        let name = response.data.list_name
        setList(name)
    }

    useEffect(() =>{
    const getAllLists = async() => {
        let response = await api.get("list/")
        let listData = response.data
        console.log(listData)
        setAllList(listData)
    }
    
    getAllLists()

    }, [])

    
    return (
      <div>
        <h1>This is the list page</h1>
        <h3>View your current lists</h3>
        <form onSubmit={(e) =>createList(e)}>
            <input type="text" 
            placeholder="List Name" 
            value={list}
            onChange={(e) => setList(e.target.value)} />
            <input type="submit" />
        </form>
        <div>

        {
            allList && (
            <>
            {allList.map((list, index) =>(
                <div key={index}> 
                    <Link to={`/list/${list.id}`}>{list.list_name} </Link>
                    {list.tasks.map((task_item, index) =>
                       <li key={index}>{task_item.task_name}
                        </li> 
                    )}
                </div>)
            )}
            
            </>  
        )}
        </div>
      </div>
    );
  };