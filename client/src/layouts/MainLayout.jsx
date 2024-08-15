import React from 'react'
import SideBar from "../components/AppSidebar"
import { Outlet } from 'react-router-dom'

export default function MainLayout(){
    return(
      <div className='flex'> 
      <SideBar/>
      <div className='w-full'>
        <div className='bg-gray-200 h-[100px] text-center'>Header</div>
      <Outlet/>
      </div>
      </div>
    )

}