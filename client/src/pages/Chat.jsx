import React, { useEffect } from 'react'
import AppLayout from '../components/style/AppLayout'
import Input from '../components/layouts/input'
import MsgBox from '../components/layouts/MsgBox'
import {useState} from 'react'
import socket from '../util/Socket'
function Chat({friendId}) {
    // Handle the message input
    let [message, setMessage] = useState('');
    
    function handleMessage(e) {
      setMessage(e.target.value);
    }
  
    // Send the message
    function sendMessage(e) {

      e.preventDefault();
      setChats((prev)=>{
        return [...prev,{content:message,from:"me",time:Date.now()}]
      })
      socket.emit('private message', {  content: message, to: friendId,timestamp: Date.now()});
      setMessage('');
    }
      // A data structure to store the messages and the user who sent it
  let [chats, setChats] = useState([]);
  
  useEffect(() => {
    socket.on("private message", ({ content, from,time }) => {
      setChats((prev) => {
        return [...prev, { content, from ,time}];
      });
    });
    return () => {
      socket.off("private message");
    };

  }, []);
  return (
    <div className='w-full flex flex-col border-2 h-[93vh] justify-center items-center overflow-hidden '>
      <MsgBox messages={chats} />
      <Input send={sendMessage} handle={handleMessage} message={message} />
    </div>
  )
}

export default AppLayout()(Chat);