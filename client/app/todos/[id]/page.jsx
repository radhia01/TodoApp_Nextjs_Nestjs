"use client"
import React from 'react'
import Link from 'next/link'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'
function Todo({params}) {
   const [task, setTask] = useState()
   const router=useRouter()
     const {token}=useAuth()
     const id=params.id
  useEffect(() => {
   const getTask=async()=>{
    const response=await axios.get(`https://nest-js-backend-five.vercel.app/tasks/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    console.log(response.data)
    setTask(response.data)
   }
   getTask()
  }, [])
   
  useEffect(() => {
   if(!token) router.push("/login")
  }, [token,router])
  
  return (
    <div className='bg-white h-screen flex  flex-col  '>
     
          <div className='text-center p-4'>
              <h1 className='text-2xl font-bold text-red-400'>{task && task.title}
              </h1>
          </div>
          <hr></hr>
          <div className='text-center p-4'> 
             <h1>{task && task.description}</h1>
          </div>
          <hr></hr>
          <div className='text-center p-4'> 
            <h1 className=' font-bold'>Created At :{task  && task.createdAt.slice(0,10)}</h1>   
      </div>
      <div className='text-center p-4'> 
            <h1 className=' font-bold'>Status: {task  && task.status}</h1>   
      </div>
      <div className='fixed bottom-20 right-10'>
            <Link href ="/todos" className='text-blue-950'> Go to Home page </Link>
      </div>
      
           
    </div>
  )
}

export default Todo