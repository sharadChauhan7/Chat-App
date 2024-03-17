import React,{ lazy,useState,useEffect } from 'react';
import Home from './pages/Home'
import Auth from './pages/Auth'
import Group from './pages/Groups'
import Chats from './pages/Chat'
import Privateroute from './components/auth/privateroute';
import {useAuth} from './hooks/authstate'
import NotFound from './pages/NotFound'
import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom';

import {io} from 'socket.io-client'
const socket = io('http://localhost:3000',{
  autoConnect:false
});


function App() {
  let {login}=useAuth();
  useEffect(()=>{
    socket.connect();
  
    socket.on('connect',()=>{
      console.log("Connected to server");
      // Console socket id
      console.log(socket.id);
    })
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
