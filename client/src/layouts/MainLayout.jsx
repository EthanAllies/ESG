import React from 'react'
import SideBar from "../components/AppSidebar"
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='flex'>
      <SideBar />
      <div className='w-full'>
        <div className=' h-[60px] flex items-center justify-end'>
          <div className='pr-9 pt-5'>
            <button className='bg-white outline outline-regal-blue px-9 py-2 text-base   hover:bg-slate-950 hover:text-white rounded-xl'>Sign in</button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )

}