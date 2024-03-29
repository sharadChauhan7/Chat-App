import React from 'react'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <div className=' bg-[#222831] text-[#EEEEEE] h-[7vh] rounded-sm px-4 flex items-center text-2xl'>
        <div>
          Chat App
        </div>
        {/* Login & SignUp Button */}
        <div className='ml-auto'>
          <Link to='/auth' className='mr-4'>Login</Link>
          <Link to='/auth'>SignUp</Link>
          </div>
    </div>
  )
}

export default Header