import React, { useEffect } from 'react'
import { createContext,useContext,useState } from 'react'
import Cookies from 'js-cookie';
import { json } from 'react-router-dom';
import axios from 'axios';

const AuthContext=createContext(null);


export function AuthState({children}) {
  // Auth States
  let [allUsers,setAllUsers]=useState([]);


    useEffect(()=>{
      async function getUsers(){
      let result = await axios.get('http://localhost:3000/auth/users');
      setAllUsers(result.data);
      }
      getUsers();
    },[]);
  let[login,setLogin]=useState( Cookies.get('authToken')? true : false);


  return (
    <AuthContext.Provider value={{login,setLogin,allUsers}}>
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