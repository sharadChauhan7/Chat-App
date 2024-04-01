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
import { useParams } from 'react-router-dom';



function App() {


  let userId=useParams();

  let {login,user}=useAuth();

  useEffect(()=>{

    login?preSetup():console.log("Not loged in user");

    
    // Pre Setup
    
    function preSetup(){
      const session=JSON.parse(localStorage.getItem('session'));
      if(session){
        socket.auth={sessionID:session.sessionID};
        socket.userID=session.userID;
      }
      else{
        socket.auth={userName:user.name};
      }
      socket.connect();
    }

    // Getting Session 
    socket.on('session',({sessionID,userID,userName})=>{
      socket.auth={sessionID};
      localStorage.setItem('session',JSON.stringify({sessionID,userID}));
      socket.userID=userID;
      socket.userName=userName;
    })

    socket.on("user connected",(req)=>{
      toast.success(`${req.userName} joined the chat`);
    });
    socket.on("connect_error", (err) => {

      if (err.message === "invalid username") {
        toast.error("Invalid Username");
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
          <Route path='chats/:userId' element={<Chats/>}/>
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
