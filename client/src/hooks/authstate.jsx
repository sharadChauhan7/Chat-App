import React, { useEffect } from 'react'
import { createContext,useContext,useState } from 'react'
import Cookies from 'js-cookie';
import { json } from 'react-router-dom';
import socket from '../util/Socket';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext=createContext(null);


export function AuthState({children}) {
  // Auth States
  let [allUsers,setAllUsers]=useState([]);

  let [liveUsers,setLiveUsers]=useState({});

  let[login,setLogin]=useState( Cookies.get('authToken')? true : false);

  let[user,setUser]=useState(Cookies.get('user')? JSON.parse(Cookies.get('user')) : {});

    useEffect(()=>{
      async function getUsers(){
      let result = await axios.get('http://localhost:3000/auth/users');
      setAllUsers(result.data);
      }
      getUsers();

      socket.on("users",(req)=>{
        setLiveUsers(req);
        console.log("Got the All Users");
      });
      
      socket.on("user disconnected",(req)=>{
        toast.error(`${req.userName} left the chat`);
        console.log()
      });

        return ()=>{
          socket.disconnect();
        }
    },[]);
      


  return (
    <AuthContext.Provider value={{login,setLogin,allUsers,user,setUser,liveUsers,setLiveUsers}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  let context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthContext Provider");
  }
  return context;
}