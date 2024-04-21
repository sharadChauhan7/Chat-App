import React from 'react'
import {Avatar,ListItemText} from '@mui/material';
import Ryan from '../../assets/Ryan.jpeg'
import {Link,useParams} from 'react-router-dom'
import socket from '../../util/Socket';

function User({name="Sharad Chauhan", userId ,lastMsg="Jan 9, 2014",live=false ,letsChat,friendSocketId}) {

  let shouldDisable = live.status===false;

  function checkValidity(e){
    if(shouldDisable){
      e.preventDefault();
      return;
    }
    else{
      return;
    }
  }
  console.log(friendSocketId);
  return (
    <>
    <div className={`${friendSocketId===live.socketID && friendSocketId!="" ?"bg-[#6e6969]":""}`}  >
    <Link to={`/chats/${userId}`} onClick={checkValidity} >
    <div className={`flex h-16 border-b-2  items-center px-3 cursor-pointer `} onClick={()=>{letsChat(live)}} >
        <Avatar alt="Remy Sharp" src={Ryan} sx={{ width: 50, height: 50 }} />
        <div className='px-3'>
         <ListItemText className='text-white font-bold' primary={name+((live.socketID)==socket.id?" (You)":"")}  />
         <p className='text-white font-thin p-0'>{lastMsg}</p>
        </div>
        {live.status?<div className='bg-green-500 w-3 h-3 rounded-full'></div>:<div className='bg-red-500 w-3 h-3 rounded-full'></div>}
    </div>
    </Link>
    </div>
    </>
  )
}

export default User