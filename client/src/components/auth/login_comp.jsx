import React from 'react'
import {useInputValidation,useStrongPassword} from '6pp'
import {phoneValidator} from '../../util/validators'
import { Typography } from '@mui/material';
import { redirect } from "react-router-dom"
import {useAuth} from '../../hooks/authstate'
import axios from 'axios';
import Cookies from 'js-cookie';
function Login_comp({toggleAuth}) {
  let {setLogin,setUser}=useAuth();

  const password = useStrongPassword();
  const phoneNumber = useInputValidation("",phoneValidator);

  async function handelLogin(e){
    e.preventDefault();
    let result=await axios.post('http://localhost:3000/auth/login',{phone:phoneNumber.value,password:password.value});
    if(result.data){
      Cookies.set('authToken',JSON.stringify(result.data.token),{expires:7});
      Cookies.set('user',JSON.stringify(result.data.user),{expires:7});
      setLogin(true);
      setUser(result.data.user);
      console.log("Working Login");
      return redirect('/chat');
    }
      console.log("Error during Login");
  }
  return (
    // Login form goes here
    <>
          <form className='w-full'>
            <h1 className='text-4xl font-semi-bold mb-5'>Login</h1>
            <p className='mb-6'>Welcome back! Please enter your details.</p>
            <div className='mb-5'>
              <input type="text" id='phone' placeholder='Phone' className='w-full border-b-2  border-gray-300 py-2 focus:outline-none focus:border-blue-500' value={phoneNumber.value} onChange={phoneNumber.changeHandler} required/>
              {phoneNumber.error&&<Typography variant='caption' color='error'>{phoneNumber.error}</Typography>}
            </div>
            <div className='mb-5'>
              <input type="password" id='password' placeholder='Password' className='w-full border-b-2 border-gray-300  py-2  focus:outline-none focus:border-blue-500' value={password.value} onChange={password.changeHandler} required />
              {password.error&&<Typography variant='caption' color='error'>{password.error}</Typography>}
            </div>
            <div className='mb-5'>
              <button className='w-full bg-black text-xl text-white py-2 rounded-md' onClick={handelLogin}>Login</button>
            </div>
            {/* Make a boundary */}
            <div className='flex justify-between items-center mb-5'>
              <div className='w-2/5 border-b-2 border-gray-300'></div>
              <div>or</div>
              <div className='w-2/5 border-b-2 border-gray-300'></div>
            </div>
            {/* Sign in with google button */}
            <div className='mb-5'>
              <button className='w-full bg-red-500 text-xl text-white py-2 rounded-md'>Sign in with Google</button>
            </div>
            <div className='flex justify-center'>
              <p>Don't have an account? <span className='text-blue-500 hover:cursor-pointer' onClick={toggleAuth}>Signup</span></p>
            </div>
          </form>
    </>
  )
}

export default Login_comp