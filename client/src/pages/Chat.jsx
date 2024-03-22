import React from 'react'
import AppLayout from '../components/style/AppLayout'
import Input from '../components/layouts/input'
import MsgBox from '../components/layouts/MsgBox'
import {useState} from 'react'
import socket from '../util/Socket'
function Chat({friendId,CurrentUser}) {
    // Handle the message input
    let [message, setMessage] = useState('');

    function handleMessage(e) {
      setMessage(e.target.value);
    }
  
    // Send the message
    function sendMessage(e) {
      e.preventDefault();
      console.log(message);
      socket.emit('message', { message, friendId, CurrentUser });
      setMessage('');
    }
  return (
    <div className='w-full flex flex-col border-2 h-[93vh] justify-center items-center '>
      <MsgBox />
      <Input send={sendMessage} handle={handleMessage} message={message} />
    </div>
  )
}

export default AppLayout()(Chat);