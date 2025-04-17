import React from 'react'

function DeleteTask({taskId,setDeleteTask,deleteTask}) {
    const handleSubmit=()=>{
      deleteTask(taskId)
      setDeleteTask(false)
    }
  
  return (
    <div className='  fixed  z-10  inset-0 flex bg-opacity-50 bg-black justify-center items-center'>
         <div className=" flex flex-col gap-4 py-10 px-5 bg-white">
               <div className="">
                <h1>Do you want to delete this task</h1>
               </div>
               <div className=" flex justify-between px-10">
                         <button className='bg-red-500 text-white px-5 py-2' onClick={handleSubmit}>yes</button>
                         <button className='bg-red-300 text-white px-5 py-2' onClick={()=>setDeleteTask(false)}>No</button>
               </div>
         </div>
    </div>
  )
}

export default DeleteTask