import React from 'react'
import { useState } from 'react'
import Login_img from '../assets/login.jpg'
import Login_Component from '../components/auth/login_comp'
import Signup_Component from '../components/auth/signup_comp'
function Auth() {
  let [auth, setAuth] = useState(true);
  return (
    <div className='bg-orange-100 py-20 px-36  h-screen'>
      <div className='bg-white flex h-[80vh]'>
        <div className='w-2/5'>
          <img src={Login_img} alt="" className=' w-full h-full object-cover' />
        </div>
        <div className='w-3/5 px-24 py-16'>
          <h1 className='font-medium text-xl mb-10'>Interective Brand</h1>
          {auth ? <Login_Component toggleAuth={()=>setAuth(!auth)}/> : <Signup_Component toggleAuth={()=>setAuth(!auth)}/>}
        </div>
      </div>
    </div>
  )
}

export default Auth