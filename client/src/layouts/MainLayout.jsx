import React from 'react'
import SideBar from "../components/AppSidebar"
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='flex flex-row overflow-hidden '>
      <SideBar/>
      <div className='flex flex-col w-screen h-screen '>
        <div className=' h-[60px] flex items-center justify-end px-4  '>
            <button className='btn-signup'>Sign in</button>
        </div>
        <div className='h-[calc(100%-60px)] overflow-y-auto'>
          <Outlet />
        </div>
        
      </div>
    </div>
  )

}