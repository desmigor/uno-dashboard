import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../../features/authentication/components/Login'
import ChangePassword from '../../features/authentication/components/ChangePassword'
import { CHANGE_PASSWORD } from '../../assets/constants'

function Public() {
  return (
    <>
        <Routes>
            <Route path='*' element={<ChangePassword />} />
            <Route  path='login' element={<Login />} />
        </Routes>
    </>
  )
}

export default Public