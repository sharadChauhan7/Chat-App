import React from 'react'
import { createContext,useContext,useState } from 'react'

const AuthContext=createContext(null);


export function AuthState({children}) {
  // Auth States
  let[login,setLogin]=useState(localStorage.getItem('token') ? true : false);


  return (
    <AuthContext.Provider value={{login,setLogin}}>
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