import React,{ lazy } from 'react';
import Home from './pages/Home'
import Auth from './pages/Auth'
import Group from './pages/Groups'
import Chats from './pages/Chat'
import Privateroute from './components/auth/privateroute';
import {useAuth} from './hooks/authstate'
import NotFound from './pages/NotFound'

import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom';

// const Login = lazy(()=>{import("./pages/Login")});
// const Home = lazy(()=>{import("./pages/Home")});

function App() {
  let {login}=useAuth();

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
