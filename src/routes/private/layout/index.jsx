import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../../components/ui/Sidebar'
import Navbar from '../../../components/ui/Navbar'

function Layout() {
  return (
    <div className='w-full flex flex-row h-screen overflow-hidden'>
      <Sidebar />
      <div className='w-[94%] 2xl:w-[90%] '>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout