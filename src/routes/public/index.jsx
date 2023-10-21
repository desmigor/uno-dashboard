import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CHANGE_PASSWORD } from '../../assets/constants'
import Login from '../../dashboards/supportFeatures/authentication/components/Login'
import ChangePassword from '../../dashboards/supportFeatures/authentication/components/ChangePassword'
import AdminLogin from '../../dashboards/supportFeatures/authentication/components/AdminLogin'

function Public() {
  return (
    <>
        <Routes>
            <Route index element={<Login />} />
            {/* <Route index element={<AdminLogin />} />
            <Route index element={<ChangePassword />} /> */}
        </Routes>
    </>
  )
}

export default Public