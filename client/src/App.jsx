import React,{ lazy,useState,useEffect } from 'react';
import Home from './pages/Home'
import Auth from './pages/Auth'
import Group from './pages/Groups'
import Chats from './pages/Chat'
import Privateroute from './components/auth/privateroute';
import {useAuth} from './hooks/authstate'
import NotFound from './pages/NotFound'
import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom';
import socket from './util/Socket';
import toast, { Toaster } from 'react-hot-toast';



function App() {

  let {login,user}=useAuth();
  useEffect(()=>{

    login?socket.connect():console.log("Not loged in user");
    socket.auth={userName:user.name};

    socket.on("user connected",(req)=>{
      toast.success(`${req.userName} joined the chat`);
    });
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        this.usernameAlreadySelected = false;
      }
    });

    return ()=>{
      socket.disconnect();
    }
  },[]);


  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home/>}/>
        <Route element={<Privateroute user={login}/>}>
          <Route path='group' element={<Group/>}/>
          <Route path='chats' element={<Chats/>}/>
        </Route>
        <Route path='/auth' element={<Privateroute user={!login} path='/'>
          <Auth/>
        </Privateroute>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App
