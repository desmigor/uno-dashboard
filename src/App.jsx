import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Public from './routes/public';
import Private from './routes/private';
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

function App() {


  return (
      <Router>
        <Routes>
          <Route>
            <Route path='/login' element={<SupportLogin />} />
            <Route path='/reset' element={<ResetPassword />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/admin' element={<Login />} />
          </Route>
          <Route path='/' element={<Layout />} >
            <Route index element={<Dashboard />} />
            <Route path='/pending' element={<Pending />} />
            <Route path='/package' element={<Packages />} />
            <Route path='/courier' element={<Couriers />} />
            <Route path='/settings' element={<Settings />} />
          </Route>
        </Routes>
      </Router>
  )
}

export default App
