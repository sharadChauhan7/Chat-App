import React from 'react'
import User from './user'
import SearchIcon from '@mui/icons-material/Search'
import {useAuth} from '../../hooks/authstate'
import socket from '../../util/Socket'
import {useState} from 'react'
function AllUsers() {
    let CurrentUser=socket.id;

        let [friendId,setFriendId]=useState();

        // Choosing the User to Chat

        function letsChat(data){

            data.socketID==CurrentUser?setFriendId(null):setFriendId(data.socketID);
        }

        let {allUsers,liveUsers}=useAuth();

        // Checking if User is Live or not
        function isOnline(user){
            if(liveUsers.length){
                for(let i of liveUsers){
                    if(user.name==i.userName){
                        return {status:true,socketID:i.userID}   
                    }
                }
            }
            return {status:false,socketID:null}
        }
  return (
    <>
      {allUsers.length?<div className='flex h-full'>
                    <div className=' w-4/12 border-r-2 h-[93vh]'>
                    <div className='w-full rounded-3xl h-9 my-2 px-2 border-b-slate-700'><input type="search" className='w-[90%] h-full px-5 text-xl focus:outline-none' placeholder='Search' /><SearchIcon/></div>
                        {allUsers.map((user,index)=>{
                            let live=isOnline(user);
                            return <User key={user._id} userId={user._id} name={user.name} live={live} letsChat={letsChat} friendId={friendId}/>
                        })
                        }
                    </div>
        </div>:null}
    </>
  )
}

export default AllUsers