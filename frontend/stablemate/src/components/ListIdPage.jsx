import { useContext, useState, useEffect } from "react";
import { userContext } from "../App";
import { Link, useParams } from "react-router-dom";
import { api } from "../utilities"; 
import { ListPage } from "./ListPage";
import "./list.css"
export const ListIdPage = () => {
    const token = localStorage.getItem("token")
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const { list_id } = useParams(); 
    const [addedTask, setAddTask] = useState("")
    const [allTask, setAllTask] = useState([])
    const [deletedTask, setDelTask] = useState([])
    const [submit, setSubmit] = useState(false)


    const addATask = async(e) => {
        e.preventDefault() 
        let response = await api.post(`list/${list_id}/task/`, {
            task_name: addedTask
        })
        let new_task = response.data 
        // setAddTask(new_task)
        setAddTask(new_task)
    
        
    }

    const deleteTask = async(e, task_id) => {
        e.preventDefault()
        // let get_task = await api.get(`list/${list_id}/task/`)
        // let get_id = get_task.id
        let response = await api.delete(`list/${list_id}/task/${task_id}`)
        setDelTask(task_id) 
    }

    useEffect(() => {
    const getAllTask = async() => {
        let response = await api.get(`list/${list_id}/task`)
        let taskData = response.data 
        setAllTask(taskData)


    }
    getAllTask()
    // setSubmit(true)
    }, [addedTask, deletedTask])

    return (
        <div>


    {
        allTask && (
        <>
        {allTask.map((item, index) =>
        <div className="task" key={index}> 
            {item.task_name}
            <button onClick={(e)=> {deleteTask(e,item.id)}}>Delete</button>
        </div>)}
        
        </>  
    )}

    
        <form onSubmit={(e) =>addATask(e)}>
        <input type="text" 
        placeholder="Task" 
        value={addedTask}
        onChange={(e) => setAddTask(e.target.value)} />
        <input type="submit" />
        <h4>Add or delete a task list</h4>
    </form>
    </div>
    )
}; 