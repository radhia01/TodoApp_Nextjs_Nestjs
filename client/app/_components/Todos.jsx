'use client';
import { useEffect,useState } from 'react';
import Cookies from 'js-cookie'
import axios from 'axios';
import Card from '../_components/Card';
import Todo from "../_components/Todo"
import Navbar from '../_components/Navbar'
import Success from '../_components/Success';
export default function TodosList() {
   const token=(Cookies.get('token'))
   const [tasks, setTasks] = useState()
   const [successMessage, setSuccessMessage] = useState(false)
   const [item, setItem] = useState("")
 useEffect(() => {
   const getTasks=async()=>{
    try {
         const response=await axios.get("https://nest-js-backend-five.vercel.app/tasks",{
          headers:{
            Authorization:`Bearer ${token}`
          }
         })
         setTasks(response.data)
    } catch (error) {
      
    }
   }
   getTasks()
 }, [])
 
  const [showAddToDo, setShowAddToDo] = useState(false)

  const deleteTask=async(id)=>{
     try {
        const response=await axios.delete(`https://nest-js-backend-five.vercel.app/tasks/${id}`,{
          headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
          }
        })
        if(response){
          setSuccessMessage("Todo deleted successfully")
          setTasks(tasks.filter(task=>task.id!==response.data.id))
        }
       
     
     } catch (error) {
        console.log(error)
     }
  }
  const addTask=async(task)=>{
     try {
         const response=await axios.post("https://nest-js-backend-five.vercel.app/tasks",task,{
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          }
         })
         if(response){
          setSuccessMessage("Todo added successfully")
          setTasks([...tasks,response.data])
         }
        
     } catch (error) {
        console.log(error)
     }
  }
  const updateTask=async(task)=>{
    try {
      const response=await axios.patch(`https://nest-js-backend-five.vercel.app/tasks/${task.id}`,task,{
       headers:{
         "Content-Type":"application/json",
         Authorization:`Bearer ${token}`
       }
      })
      if(response){
       setSuccessMessage("Todo updated successfully")
       setTasks(tasks.map(element=>element.id==task.id?task:element))
      }
 
  } catch (error) {
     console.log(error)
  }
}
  return <div className='h-screen relative flex flex-col gap-8 items-center bg-red-200 py-20'>
            <Navbar/>
            <div className='flex justify-between   w-full px-20'>
                <h1 className='font-bold text-3xl  text-white'>Todos List</h1>
                    {/* <input placeholder="search " className='w-1/2 h-12 p-3' onChange={e=>setItem(e.target.value)}/> */}
            <div >

            <div class="relative">
                <input
                  type="text"
                  id="Search"
                  class="mt-0.5 w-full h-12 rounded border-gray-300 p-2 shadow-sm sm:text-sm  border"
                  placeholder="Search .."
                  onChange={e=>setItem(e.target.value)}
                 /> 
            </div>
    
            </div>
                <button className='bg-black text-white rounded  px-4 py-2 hover:bg-white hover:text-red-500'  onClick={()=>setShowAddToDo(true)}>Add new Todo</button></div> 
                <div className="grid grid-cols-4 gap-8 sm:grid-cols-1 lg:grid-cols-3  md:grid-cols-2 ">
                  {tasks && tasks.filter(task=>task.title.toUpperCase().includes(item.toUpperCase())).map(task=>(
                          <Card key={task.id} task={task}  deleteTask={deleteTask} updateTask={updateTask} />
                        ))}
                 </div>    
                    {successMessage && <Success message={successMessage}/>}
                    {showAddToDo && <Todo setShowAddToDo={setShowAddToDo}  addTask={addTask} />}

  </div>;
}
