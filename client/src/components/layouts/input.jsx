import React,{useState} from 'react'

function Input({send,handle,message}) {
  return (
    <div className='w-full p-2 g-20 bg-slate-800'>
      <form className='rounded-3xl bg-white'>
        <input type='text' className=' w-10/12 h-10 border outline-none px-3 rounded-3xl' value={message} onChange={handle} />
        <button type='submit' className='w-2/12 h-10 rounded-3xl bg-[#00ADB5]' onClick={send}>Send</button>
    </form>
    </div>
  )
}

export default Input