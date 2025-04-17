'use client';
import React from 'react'
import { useState,useEffect } from 'react';
import Success from '../_components/Success';

function UpdateTodo({ setShowUpdateTask ,updateTask,task}) {
    

  const [successMessage, setSuccessMessage] = useState()
 const [taskData, setTaskData] = useState({task})
 useEffect(() => {
  setTaskData(task)
 }, [])
 const handleChange=(e)=>{
    setTaskData({
        ...taskData,
        [e.target.name]:e.target.value

    })
    
 }
 
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(taskData)
    updateTask(taskData)
    setSuccessMessage(true)
  }
 
  return (
    <div className=" fixed inset-0  z-10 top-0 flex bg-opacity-50 bg-black justify-center items-center  px-4">
        <div className=' flex flex-col  bg-white gap-8 items-center w-full  max-w-md   py-5 px-4 sm:px-8 md:px-10 rounded-lg'>
            <div><h1 className='font-bold text-3xl text-red-200  '>Update a Task</h1></div>
            <form className='bg-white rounded px-10 py-12 space-y-14 w-full  max-w-md  ' onSubmit={handleSubmit}>
                <div className='flex gap-2  flex-col sm:flex-row '>
                    <label className='w-20'>Title</label>
                    <input 
                          className='h-12 bg-gray-100 p-4 w-full '
                          type="text"
                          value={taskData && taskData.title}
                          name="title"
                          onChange={handleChange}

                />
                </div>
                <div className='flex gap-2 flex-col w-full  sm:flex-row '>
                    <label className='w-20 '>Description</label>
                    <textarea 
                    cols={30}
                    rows={20}
                    className='h-12 bg-gray-100 p-4 '
                    type="text"
                    value={taskData && taskData.description}
                    name="description"
                    onChange={handleChange}
                              />
                </div>
                <div className='flex gap-6 flex-col sm:flex-row'>
                    <label className='w-20'>Status</label>
                    <select name="" id="" value={taskData && taskData.status} className='border p-2 w-full' onChange={e=>setTaskData({...task,
                      status:e.target.value
                    })}>

                      <option value="PENDING">PENDING</option>
                      <option value="COMPLTED">COMPLETED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                </div>
                <div className='text-center justify-center flex gap-1 sm:gap-10'>
                    <button className='inline-block rounded-sm border border-indigo-600 bg-indigo-600 p-2  sm:px-12 sm:py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden' type="submit">Submit</button>
                    <button className='inline-block rounded-sm border border-indigo-600  p-2  sm:px-12 sm:py-3 ext-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-3 focus:outline-hidden' type="submit" onClick={()=>setShowUpdateTask(false)}>Close</button>
              </div>
            </form>
              {successMessage && <Success  message={"todos updated successfully"}/>}
        </div>
    </div>
    
  )
}

export default UpdateTodo