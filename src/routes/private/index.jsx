import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout'
import Dashboard from '../../features/dashboard/components'

function Private() {
  return (
    <Routes>
        <Route path='/' element={<Layout />} >
            <Route index element={<Dashboard />} />
        </Route>
    </Routes>
  )
}

export default Private