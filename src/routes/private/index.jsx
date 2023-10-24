import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout'
import Dashboard from '../../dashboards/supportFeatures/dashboard/components'
import Pending from '../../dashboards/supportFeatures/pending/components';
import Packages from '../../dashboards/supportFeatures/packages/components';
import Couries from '../../dashboards/supportFeatures/couriers/components';
import Settings from '../../dashboards/supportFeatures/settings/components';

function Private() {
  return (
    <Routes>
        <Route path='/' element={<Layout />} >
            <Route index element={<Dashboard />} />
            <Route path='pending' element={<Pending />} />
            <Route path='package' element={<Packages />} />
            <Route path='courier' element={<Couries />} />
            <Route path='settings' element={<Settings />} />
        </Route>
    </Routes>
  )
}

export default Private