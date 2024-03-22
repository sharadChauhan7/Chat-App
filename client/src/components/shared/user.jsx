import React from 'react'
import {Avatar,ListItemText} from '@mui/material';
import Ryan from '../../assets/Ryan.jpeg'
import {Link} from 'react-router-dom'
import socket from '../../util/Socket';

function User({name="Sharad Chauhan", lastMsg="Jan 9, 2014",live=false ,letsChat,friendId}) {
  return (
    <div className={`flex h-16 border-b-2  items-center px-3 ${friendId==live.socketID?"bg-[#ececec]":""} cursor-pointer transition ease-in-out `} onClick={()=>{letsChat(live)}} >
        <Avatar alt="Remy Sharp" src={Ryan} sx={{ width: 50, height: 50 }} />
        <div className='px-3'>
         <ListItemText primary={name+((live.socketID)==socket.id?" (You)":"")} secondary={lastMsg} />
        </div>
        {live.status?<div className='bg-green-500 w-3 h-3 rounded-full'></div>:<div className='bg-red-500 w-3 h-3 rounded-full'></div>}
    </div>
  )
}

export default User