"use client";
import React from 'react'
import { useState } from 'react'
import DeleteTask from './DeleteTask'
import Link from 'next/link'
import UpdateTodo from './UpdateTask'
import { IoMdDoneAll } from "react-icons/io";
import { MdOutlinePending } from "react-icons/md";
function Card({task,deleteTask,updateTask}) {

      const [showDeleteTask, setShowDeleteTask] = useState(false)
      const [showUpdateTask, setShowUpdateTask] = useState(false)
      const [taskId, setTaskId] = useState()
 
    const handleDelete=(id)=>{
    setShowDeleteTask(true)
    setTaskId(id)
    } 
    const handleUpdate=(id)=>{
      setShowUpdateTask(true)
     
      } 
  return (
    <div className={`${task.status=='PENDING'?'bg-blue-400':'bg-green-400'}  relative z-4 rounded-lg  shadow p-4 border `}>
        <div className='absolute top-4 right-2'>{task.status==="COMPLTED"?<IoMdDoneAll className="text-2xl text-white " /> :<MdOutlinePending className=" text-white text-2xl"/>}
        </div>

        <div className={`p-3 text-white text-2xl ${task.status=="COMPLTED" ? "text-decoration: line-through":""}`}>{task.title}
        </div>

        <hr/>

        <div className='p-3 text-white'>{task.description}</div> 
        
        <hr />

        <div className='flex gap-4  mt-4'>
          <button className='bg-red-500 px-2 py-1 rounded text-sm  ' onClick={()=>handleDelete(task.id)}>Delete</button>
          <button className='bg-black text-white px-2 py-1  rounded text-sm  ' onClick={handleUpdate}>Update</button>
          <Link className='bg-gray-300 px-2 py-1  rounded text-sm  '  href={`/todos/${task.id}`} >Show details</Link>
        </div>

          {showDeleteTask  && <DeleteTask   taskId={taskId} setDeleteTask={setShowDeleteTask}    deleteTask={deleteTask}/> }
          {showUpdateTask  && <UpdateTodo   setShowUpdateTask={setShowUpdateTask}  updateTask={updateTask} task={task} /> }
  </div>
  )
}

export default Card