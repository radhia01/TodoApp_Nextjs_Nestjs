"use client"
import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Error from '../_components/Error'
function Signup() {
  const router=useRouter()
  const [user, setUser] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange=(e)=>{
    setUser({...user,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit=async(e)=>{
    setErrorMessage(null)
    e.preventDefault()
    try {
      const response=await axios.post('https://nest-js-backend-five.vercel.app/auth/signup',user,{
        headers:{
          "Content-Type":"application/json"
        }
      })
      if(response){
      router.push("/login")
        
      }
      
    } catch (error) {
    
          const message=error.response.data.message
          console.log(message)
      setErrorMessage(message)
         
    }
    

  }
  return (
    <div className='min-h-screen flex items-center justify-center  px-4 py-10 bg-gray-50  '>
  
        <form  className=' bg-gray-200 rounded-lg flex flex-col  sm:gap-6 md:gap-8 lg:gap-10 p-8 w-full max-w-md ' onSubmit={handleSubmit}>
            <div><h1 className='text-indigo-600 text-3xl font-bold  '>SIGNUP</h1></div>
            <div className='flex gap-2  flex-col sm:flex-row  ' >
                <label className='w-32 text-xl'>FirstName</label>
                <input 
                className='h-10 bg-gray-100 p-4  border border-gray-500 w-full sm:w-2/3'
                type="text"
                name="firstName"
                onChange={handleChange}
              
                />
            </div>
            <div className='flex gap-2  flex-col sm:flex-row  ' >
                <label className='w-32 text-xl'>LastName</label>
                <input 
                  className='h-10 bg-gray-100 p-4  border border-gray-500 w-full sm:w-2/3'
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                
                  />
            </div>
            <div className='flex gap-2  flex-col sm:flex-row  ' >
                <label className='w-32 text-xl'>Email</label>
                <input 
                  className='h-10 bg-gray-100 p-4  border border-gray-500 w-full sm:w-2/3'
                  type="email"
                  name="email"
                  onChange={handleChange}
                  />
            </div>
            <div className='flex gap-2  flex-col sm:flex-row  '>
                <label className='w-32 text-xl '>Password</label>
                <input 
                className='h-10 bg-gray-100 p-4 border border-gray-500  w-full sm:w-2/3'
                type="password"
                name="password"
                onChange={handleChange}
                />
            </div>
            <div className='flex justify-center mt-2  '>
              <button type="submit" className='bg-black  text-white py-2 px-7 rounded  hover:bg-white hover:text-indigo-600  '>Submit</button></div>
       
        </form>
      {errorMessage && <Error message={errorMessage}/>}
    </div>
  )
}

export default Signup