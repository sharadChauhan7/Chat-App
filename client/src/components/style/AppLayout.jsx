import React, { useEffect,useState } from 'react'
import Header from '../layouts/Header'
import User from '../shared/user'
import SearchIcon from '@mui/icons-material/Search';
import {useAuth} from '../../hooks/authstate'
const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        let {allUsers}=useAuth();
        return (
            <>
                <Header />
                <div className='flex h-full'>
                    <div className=' w-4/12 border-r-2 h-[95vh]'>
                    <div className='w-full border-2 rounded-3xl h-9 my-2 px-2 border-b-slate-700'><input type="search" className='w-[90%] h-full px-5 text-xl focus:outline-none' placeholder='Search' /><SearchIcon/></div>
                        {allUsers.map((user,index)=>{
                            return <User key={user._id} name={user.name}/>
                        })
                        }
                    </div>
                    <WrappedComponent {...props} />
                    <div className='w-2/12 border-2 h-[95vh] max-md:hidden'>Third</div>
                </div>
            </>
        );
    }
}

export default AppLayout