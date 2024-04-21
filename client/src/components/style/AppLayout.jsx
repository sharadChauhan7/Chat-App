import React, { useEffect,useState } from 'react'
import Header from '../layouts/Header'
import User from '../shared/user'
import SearchIcon from '@mui/icons-material/Search'
import {useAuth} from '../../hooks/authstate'
import socket from '../../util/Socket'
const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        let [friendSocketId,setFriendSocketId]=useState();

        // Choosing the User to Chat
        function letsChat(data){
            setFriendSocketId(data.socketID);
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
            return {status:false,socketID:""}
        }
        return (
            <>
                <Header />
                {allUsers.length?<div className='flex h-full'>
                    <div className=' w-4/12 border-r-2 h-[93vh] bg-black'>
                    <div className='w-full rounded-3xl h-10 my-2 px-2 border bg-slate-200 flex items-center'><input type="search" className='w-[90%] h-full px-8 text-xl focus:outline-none rounded-xl bg-slate-200 border-slate-600 ' placeholder='Search' /><SearchIcon/></div>
                        {allUsers.map((user,index)=>{
                            
                            let live=isOnline(user);

                            return <User key={user._id} userId={user._id} name={user.name} live={live} letsChat={letsChat} friendSocketId={friendSocketId}/>
                        })
                        }
                    </div>
                    <WrappedComponent {...props} {...{ friendSocketId }}  />
                    <div className='w-2/12 h-[93vh] max-md:hidden bg-black'>Third</div>
                </div>:null}
            </>
        );
    }
}

export default AppLayout