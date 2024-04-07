import React, { useEffect } from 'react'
import AppLayout from '../components/style/AppLayout'
import Input from '../components/layouts/input'
import MsgBox from '../components/layouts/MsgBox'
import {useState} from 'react'
import { useParams } from 'react-router-dom'
import socket from '../util/Socket'
import Cookies from 'js-cookie';
import axios from 'axios'
function Chat({friendSocketId}) {
  // Get the friend's user id & your userId from the URL and cookies

    let { userId } = useParams();
    
    // Prev Conversation with the user
    let [prevUser, setPrevUser] = useState(userId);

    let CurrentUserId=Cookies.get('user')? JSON.parse(Cookies.get('user'))._id : null;
    // Handle the message input
    let [message, setMessage] = useState('');
    
    function handleMessage(e) {
      setMessage(e.target.value);
    }
  
    // Send the message
    function sendMessage(e) {
      e.preventDefault();
      setChats((prev) => {
        // Create a copy of the previous state
        const newChats = { ...prev };
      
        // Check if the user ID exists
        if (userId in newChats) {
          // Update the chat for the existing user
          newChats[userId].push({content:message,from:CurrentUserId});
        } else {
          // Add a new chat object for the user
          newChats[userId] = [{content:message,from:CurrentUserId}];
        }
      
        return newChats;
      });
      socket.emit('private message', {  content: message, to: friendSocketId, userId:CurrentUserId});
      setMessage('');
    }
      // A data structure to store the messages and the user who sent it
  let [chats, setChats] = useState({});
  useEffect(() => {
    socket.on("private message", (data) => {
      console.log("Triggered");

      setChats((prev) => {
        // Create a copy of the previous state
        const newChats = { ...prev };
      
        // Check if the user ID exists
        if (data.userId in newChats) {
          // Update the chat for the existing user
          newChats[data.userId].push({content:data.content,from:data.from});
        } else {
          // Add a new chat object for the user
          newChats[data.userId] = [{content:data.content,from:data.from}];
        }
      
        return newChats;
      });
    });
    return () => {
      socket.off("private message");
    };

  }, []);

  // 
  useEffect(()=>{
    try{
    async function sendConversation(chats){
        // if(chats.length>0){
        //   console.log(chats);
        //   let result = await axios.post('http://localhost:3000/setconversation',{chats,friendId:userId,userID:CurrentUserId});
        //   console.log(result.data);
        //   console.log("Sending Conversation");
        //   setChats([]);
        // }
        if(chats.length>0){
          localStorage.setItem(`${prevUser}`,JSON.stringify(chats));
          setPrevUser(userId);
          console.log("Sending Conversation");
          setChats([]);
        }
      }
      // sendConversation(chats);
    async function getConversation(){
      
      // let result = await axios.post('http://localhost:3000/getconversation',{friendId:userId,userID:CurrentUserId});
      // console.log(result.data);
      // if(result.data=="No Convo"){
      //   setChats([]);
      // }else{
      //   setChats(result.data.messages);
      // }
      let result = localStorage.getItem(`${userId}`,JSON.stringify(chats));
      setPrevUser(userId);
      result=JSON.parse(result);
      if(result ){
        setChats(result);
      }
      else{
        setChats([]);
      }

    }
    // getConversation();
    }
    catch(err){
      console.log(err);
    }
  },[userId]);
  console.log(userId);
  console.log(chats);
  console.log(chats[userId]);
  
  return (
    <div className='w-full flex flex-col border-2 h-[93vh] justify-center items-center overflow-hidden '>
      <MsgBox messages={chats[userId]} CurrentUserId={CurrentUserId}  />
      <Input send={sendMessage} handle={handleMessage} message={message} />
    </div>
  )
}

export default AppLayout()(Chat);