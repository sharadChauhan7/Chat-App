import React from 'react'
import {Navigate} from 'react-router-dom'
import { Outlet } from 'react-router-dom'
function Privateroute({children, user,path="/auth"}) {
    if(!user){
        return <Navigate to={path}/>
    }
  return children?children:<Outlet/>;
}

export default Privateroute