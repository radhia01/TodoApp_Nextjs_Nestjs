'use client';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Card from '../_components/Card';
import Todo from "../_components/Todo"
import Success from '../_components/Success';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
export default function TodosList() {
   const router=useRouter()
   const [tasks, setTasks] = useState()
   const {token,user}=useAuth()
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
      console.log(error)
    }    
   }

   getTasks()
 }, [])
   useEffect(() => {
    if(!token) router.push("/login")
   }, [token,router])
   
 
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
  return <div className='min-h-screen  flex  justify-center items-center flex-col gap-8 px-4 sm:px-10 md:px-16 lg:px-20  bg-red-100   '>
  
             <div className='flex flex-col gap-4 sm:flex-row sm:justify-between w-full'>
                <h1 className='font-bold text-3xl  text-gray-600'>Hello {user && user.firstName}</h1>
                <div className="relative">
                    <input
                        type="text"
                        id="Search"
                        className="mt-0.5 w-full h-12 rounded border-gray-300 p-2 shadow-sm sm:text-sm  border"
                        placeholder="Search .."
                        onChange={e=>setItem(e.target.value)}
                                  />
      
                </div>
              <button className='bg-black text-white rounded  px-4 py-2 hover:bg-white hover:text-red-500'  onClick={()=>setShowAddToDo(true)}>Add new Todo</button>
            </div> 
                   <div className="grid md:grid-cols-2 gap-8 pb-4 sm:grid-cols-1 lg:grid-cols-4 ">
                        {tasks && tasks.filter(task=>task.title.toUpperCase().includes(item.toUpperCase())).map(task=>(
                          <Card key={task.id} task={task}  deleteTask={deleteTask} updateTask={updateTask} />
                        ))}
                    </div>    
                    {successMessage && <Success message={successMessage}/>}
                    {showAddToDo && <Todo setShowAddToDo={setShowAddToDo}  addTask={addTask} />}

  </div>;
}
