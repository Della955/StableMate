import { useContext, useState, useEffect } from "react";
import { userContext } from "../App";
import { Link, useParams } from "react-router-dom";
import { api } from "../utilities"; 
import { ListPage } from "./ListPage";

export const ListIdPage = () => {
    const token = localStorage.getItem("token")
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const { list_id } = useParams(); 
    console.log(list_id)
    const [addTask, setAddTask] = useState("")
    const [allTask, setAllTask] = useState([])


    const addATask = async(e) => {
        e.preventDefault() 
        let response = await api.post(`list/${list_id}/task/`, {
            task_name: addTask
        })
        let new_task = response.data 
        setAddTask(new_task)
        console.log(new_task)

    }

    useEffect(() => {
    const getAllTask = async() => {
        let response = await api.get(`list/${list_id}/task`)
        let taskData = response.data 
        setAllTask(taskData)
        console.log(taskData.data)

    }
    getAllTask()
    }, [])

    return (
        <div>
        <h3>Add, edit and update a task list</h3>

        <form onSubmit={(e) =>addATask(e)}>
        <input type="text" 
        placeholder="Task" 
        value={addTask}
        onChange={(e) => setAddTask(e.target.value)} />
        <input type="submit" />
    </form>
    {
        allTask && (
        <>
        {console.log(allTask.is_complete)}
        {allTask.map((item) =><div key={allTask.id}> {item.task_name}
        </div>)}
        </>  
    )}
    </div>
    )
}; 