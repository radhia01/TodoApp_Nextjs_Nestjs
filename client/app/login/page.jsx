"use client"
import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Error from '../_components/Error'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
function Login() {
  const router=useRouter()
  const {login,getUser}=useAuth()
  const [user, setUser] = useState({
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
      const response=await axios.post('https://nest-js-backend-five.vercel.app/auth/signin',user,{
        headers:{
          "Content-Type":"application/json"
        }
      })
      if(response){
        const {token,user}=await response.data;
       login(token,user)
        
      }
      
      router.push("todos")
    } catch (error) {
    
          const message=error.response.data.message
          console.log(message)
      setErrorMessage(message)
         
    }
    

  }
  return (
    <div className='min-h-screen flex justify-center items-center px-4 py-10 bg-gray-50'>
        <form
        className='bg-gray-200 rounded-lg flex flex-col gap-6 p-8 w-full max-w-md'
        onSubmit={handleSubmit}
            >
            <h1 className='text-3xl font-bold text-indigo-600 text-center'>LOGIN</h1>

            <div className='flex flex-col sm:flex-row sm:items-center gap-2 mb-6'>
                <label className='w-28 text-xl'>Email</label>
                <input
                    className='h-10 bg-gray-100 p-4 border border-gray-500 w-full'
                    type="email"
                    name="email"
                    onChange={handleChange}
                          />
            </div>

            <div className='flex flex-col sm:flex-row sm:items-center gap-2 mb-6'>
              <label className='w-28 text-xl'>Password</label>
              <input
                className='h-10 bg-gray-100 p-4 border border-gray-500 w-full'
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>

            <div className='flex justify-center'>
              <button
                type="submit"
                className='bg-black text-white py-2 px-7 rounded hover:bg-white hover:text-indigo-600 transition'
              >
                Submit
              </button>
            </div>

            <div className='text-center'>
              <Link href="/signup" className="text-indigo-600 hover:underline">
                Don't have an account? Sign Up
              </Link>
            </div>
        </form>

        {errorMessage && <Error message={errorMessage} />}
    </div>

  )
}

export default Login