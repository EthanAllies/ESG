import React from 'react'
import SideBar from "../components/AppSidebar"
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='flex'>
      <SideBar />
      <div className='flex flex-col w-screen h-screen'>
        <div className=' h-[60px] flex items-center justify-end'>
          <div className='pr-9 pt-5'>
            <button className='btn-signup'>Sign in</button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )

}