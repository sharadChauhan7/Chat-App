import React,{ lazy } from 'react';
import Home from './pages/Home'
import Auth from './pages/Auth'

import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom';

// const Login = lazy(()=>{import("./pages/Login")});
// const Home = lazy(()=>{import("./pages/Home")});

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
      </Routes>
    </Router>
  )
}

export default App
