import React from 'react'

function signup_comp({toggleAuth}) {
  return (
    <form className='w-full'>
            <h1 className='text-4xl font-semi-bold mb-5'>Signup</h1>
            <p className='mb-6'>Welcome! Please enter your details.</p>
            <div className='mb-5'>
              <input type="text" id='name' placeholder='Name' className='w-full border-b-2  border-gray-300 py-2 focus:outline-none focus:border-blue-500' />
            </div>
            <div className='mb-5'>
              <input type="email" id='phone' placeholder='Phone' className='w-full border-b-2  border-gray-300 py-2 focus:outline-none focus:border-blue-500' />
            </div>
            <div className='mb-5'>
              <input type="password" id='password' placeholder='Password' className='w-full border-b-2 border-gray-300  py-2  focus:outline-none focus:border-blue-500' />
            </div>
            <div className='mb-5'>
              <button className='w-full bg-black text-xl text-white py-2 rounded-md'>Signup</button>
            </div>
            
            <div className='flex justify-center'>
              <p>Already have an account? <span className='text-blue-500 hover:cursor-pointer' onClick={toggleAuth}>Login</span></p>
            </div>
          </form>
  )
}

export default signup_comp