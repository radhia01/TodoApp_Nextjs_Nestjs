'use client';
import React from 'react'
import { useState,useEffect } from 'react';
import Success from '../_components/Success';

function Todo({setShowAddToDo,addTask}) {
  const [title, setTitle] = useState("")
  const [successMessage, setSuccessMessage] = useState(false)
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("PENDING")
  const handleSubmit=(e)=>{
    e.preventDefault()
    addTask({title,description,status})
   
  }
 
  return (
    <div   className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
        <div className=' flex flex-col w-full  max-w-md  gap-8 items-center bg-white  py-5 px-4 sm:px-8 md:px-10 rounded-lg'>
            <div><h1 className='font-bold text-3xl  text-indigo-500  '>Add new Task</h1></div>
            <form  className='bg-white rounded px-10 py-12 space-y-14 w-full max-w-md flex-col sm:flex-row ' onSubmit={handleSubmit}>
              <div >
                  <label for="Search">
                  <span class="text-sm font-medium text-gray-700"> Title </span>
                  <div class="relative">
                      <input
                      type="text"
                      id="Search"
                      class="mt-0.5 w-full h-12 rounded border-gray-300 pe-10 shadow-sm sm:text-sm  border"
                      value={title}
                      onChange={e=>setTitle(e.target.value)}
                        /> 
                  </div>
                  </label>
              </div>
              <div>
                  <label for="Search">
                  <span class="text-sm font-medium text-gray-700"> Description </span>
                  <div class="relative">
                  <textarea
                      type="text"
                      id="Search"
                      cols={30}
                      rows={20}
                      class="mt-0.5 w-full h-12 rounded border border-gray-300 pe-10 shadow-sm sm:text-sm"
                      value={description}
                      onChange={e=>setDescription(e.target.value)}
                                 />
                  </div>
                  </label>
              </div>

              <div className='text-center justify-center flex gap-2 '>
                    <button className='inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden' type="submit">Submit</button>
                    <button className='inline-block rounded-sm border border-indigo-600 px-1 py-1  sm:py-3 sm:px-4 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-3 focus:outline-hidden' type="submit" onClick={()=>setShowAddToDo(false)}>Close</button>
              </div>
          </form>
                         {successMessage && <Success  message={"todos added successfully"}/>}
        </div>
    </div>
    
  )
}

export default Todo