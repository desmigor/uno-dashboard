import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../../components/ui/Sidebar'
import Navbar from '../../../components/ui/Navbar'

function Layout() {
  return (
    <div className='flex flex-row overflow-hidden'>
      <Sidebar />
      <div className='w-[90%] overflow-hidden'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout