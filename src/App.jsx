import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
import AppContext from './context';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const { type, userToken } = useSelector((state) => state.auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState('not-logged-in');

  useEffect(() => {
    getLoggedIn();
  }, [type]);

  const getLoggedIn = () => {
    type === 'admin' ? setLoggedIn('admin') : type === 'support' ? setLoggedIn('support') : setLoggedIn('not-logged-in');
  }

  return (
    <AppContext.Provider value={{ isAdmin, setIsAdmin, loggedIn, setLoggedIn}}>
      <Router>
        <Routes>
          {loggedIn === 'not-logged-in' ? 
          <Route>
            <Route path='/support' element={<SupportLogin />} />
            <Route path='/reset' element={<ResetPassword />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/admin' element={<Login />} />
          </Route>
          :
          loggedIn === 'support' ? 
            <Route path='/support/dashboard/' element={<Layout />} >
              <Route index element={<Dashboard />} />
              <Route path='/support/dashboard/pending' element={<Pending />} />
              <Route path='/support/dashboard/package' element={<Packages />} />
              <Route path='/support/dashboard/courier' element={<Couriers />} />
              <Route path='/support/dashboard/settings' element={<Settings />} />
            </Route>
          :
            <Route path='/admin/dashboard' element={<Layout />} >
              <Route index element={<AdminDashboard />} />
              <Route path='/admin/dashboard/pending' element={<Pending />} />
              <Route path='/admin/dashboard/package' element={<Packages />} />
              <Route path='/admin/dashboard/courier' element={<Couriers />} />
              <Route path='/admin/dashboard/settings' element={<Settings />} />
            </Route>
          }
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App
