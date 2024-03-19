import React from 'react'
import AppLayout from '../components/style/AppLayout'
import Input from '../components/layouts/input'
import MsgBox from '../components/layouts/MsgBox'
function Chat() {
  return (
    <div className='w-full flex flex-col border-2 h-[95vh] justify-center items-center '>
      <MsgBox />
      <Input />
    </div>
  )
}

export default AppLayout()(Chat);