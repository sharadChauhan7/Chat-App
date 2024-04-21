import React, { useState, useEffect } from 'react'
function MsgBox({messages , CurrentUserId}) {
  
  return (
    <div className=' w-full h-full flex flex-col justify-end py-5 bg-black '>
      {messages?messages.map((msg, index) => {
        return <div className={`flex my-3 p-3 ${msg.from==CurrentUserId?" justify-end":"justify-start"} `} key={index}><p className={`px-3 py-1 ${msg.from==CurrentUserId?"bg-blue-500 text-white":" bg-gray-400"} rounded-3xl`}>{msg.content}</p></div>
      }):null}
    </div>
  )
}

export default MsgBox