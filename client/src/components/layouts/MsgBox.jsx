import React, { useState, useEffect } from 'react'
import socket from '../../util/Socket'
function MsgBox({messages}) {
  return (
    <div className='border- w-full h-full flex flex-col justify-end py-5'>
      {messages.map((msg, index) => {
        return <div className={`flex my-3 ${msg.from=="me"?" justify-end":"justify-start"} `} key={index}><p className={`px-3 py-1 ${msg.from=="me"?"bg-blue-500 text-white":" bg-gray-400"} rounded-3xl`}>{msg.content}</p></div>
      })}
    </div>
  )
}

export default MsgBox