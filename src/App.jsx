import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SupportLogin from './dashboards/supportFeatures/authentication/components/Login';
import Login from './dashboards/adminFeatures/authentication/components/AdminLogin';
import ResetPassword from './dashboards/supportFeatures/authentication/components/ResetPassword';
import ChangePassword from './dashboards/supportFeatures/authentication/components/ChangePassword';
import Pending from './dashboards/supportFeatures/pending/components';
import Packages from './dashboards/supportFeatures/packages/components';
import Couriers from './dashboards/supportFeatures/couriers/components';
import Settings from './dashboards/supportFeatures/settings/components';
import Layout from './routes/private/layout';
import Dashboard from './dashboards/supportFeatures/dashboard/components';
import AdminDashboard from './dashboards/adminFeatures/dashboard';

function App() {


  return (
      <Router>
        <Routes>
          <Route>
            <Route path='/' element={<SupportLogin />} />
            <Route path='/reset' element={<ResetPassword />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/a-login' element={<Login />} />
          </Route>
          <Route path='/support' element={<Layout />} >
            <Route index element={<Dashboard />} />
            <Route path='/support/pending' element={<Pending />} />
            <Route path='/support/package' element={<Packages />} />
            <Route path='/support/courier' element={<Couriers />} />
            <Route path='/support/settings' element={<Settings />} />
          </Route>
          <Route path='/admin' element={<Layout />} >
            <Route index element={<AdminDashboard />} />
            <Route path='/admin/pending' element={<Pending />} />
            <Route path='/admin/package' element={<Packages />} />
            <Route path='/admin/courier' element={<Couriers />} />
            <Route path='/admin/settings' element={<Settings />} />
          </Route>
        </Routes>
      </Router>
  )
}

export default App
