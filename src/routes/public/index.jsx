import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../../features/authentication/components/Login'
import ChangePassword from '../../features/authentication/components/ChangePassword'
import { CHANGE_PASSWORD } from '../../assets/constants'

function Public() {
  return (
    <>
        <Routes>
            <Route index element={<Login />} />
            <Route path={CHANGE_PASSWORD} element={<ChangePassword />} />
        </Routes>
    </>
  )
}

export default Public