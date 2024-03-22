import React from 'react'
import {Avatar,ListItemText} from '@mui/material';
import Ryan from '../../assets/Ryan.jpeg'

function User({name="Sharad Chauhan", lastMsg="Jan 9, 2014",live=false ,letsChat}) {

  return (
    <div className='flex h-16 border-b-2  items-center px-3 hover:bg-gray-200 transition ease-in-out delay-150' onClick={()=>{letsChat(live)}} >
        <Avatar alt="Remy Sharp" src={Ryan} sx={{ width: 50, height: 50 }} />
        {/* <div className='px-3'>
            <h1 className='text-lg'>{name}</h1>
            <p className='text-sm text-gray-500'>{lastMsg}</p>
        </div> */}
        <div className='px-3'>
         <ListItemText primary={name} secondary={lastMsg} />
        </div>
        <div>{live.status?"Online":"Offline"}</div>
    </div>
  )
}

export default User