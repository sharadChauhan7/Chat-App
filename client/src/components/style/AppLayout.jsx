import React from 'react'
import Header from '../layouts/Header'
import User from '../shared/user'
import SearchIcon from '@mui/icons-material/Search';
const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        return (
            <>
                <Header />
                <div className='flex h-full'>
                    <div className=' w-3/12 border-r-2 h-[95vh]'>
                    <div className='w-full border-2 rounded-3xl h-9 my-2 px-2 border-b-slate-700'><input type="search" className='w-[90%] h-full px-5 text-xl focus:outline-none' placeholder='Search' /><SearchIcon/></div>
                        <User/>
                        <User/>
                        <User/>
                        <User/>
                        <User/>
                    </div>
                    <WrappedComponent {...props} />
                    <div className='w-3/12 border-2 h-[95vh]'>Third</div>
                </div>
            </>
        );
    }
}

export default AppLayout