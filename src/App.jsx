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
import CreatePackages from './dashboards/supportFeatures/packages/components/CreatePackages';
import ChooseAddress from './dashboards/supportFeatures/packages/components/ChooseAddress';
import { PrivateRoute } from './utils/PrivateRouter';
import { PublicRoute } from './utils/PublicRouter';

function App() {
  const { type, userInfo } = useSelector((state) => state.auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState('not-logged-in');

  useEffect(() => {
    // getLoggedIn();
    console.log(userInfo);
  }, []);

  // const getLoggedIn = () => {
  //   type === 'admin' ? setLoggedIn('admin') : type === 'support' ? setLoggedIn('support') : setLoggedIn('not-logged-in');
  // }

  return (
    <AppContext.Provider value={{ isAdmin, setIsAdmin, loggedIn, setLoggedIn}}>
      <Router>
        <Routes>
          <Route>
            <Route path='/support' element={<PublicRoute><SupportLogin /></PublicRoute>} />
            <Route path='/reset' element={<PublicRoute><ResetPassword /></PublicRoute>} />
            <Route path='/forgot-password/:uid64/:token' element={<PublicRoute><ChangePassword /></PublicRoute>} />
            <Route path='/admin' element={<PublicRoute><Login /></PublicRoute>} />
          </Route>
          <Route path='/support/dashboard/' element={<PrivateRoute isAllowed={userInfo?.type?.id === 4} redirectTo='/admin/dashboard/'><Layout /></PrivateRoute>} >
            <Route index element={<Dashboard />} />
            <Route path='/support/dashboard/pending' element={<Pending />} />
            <Route path='/support/dashboard/package' element={<Packages />} />
            <Route path='/support/dashboard/package/new' element={<CreatePackages />} />
            <Route path='/support/dashboard/courier' element={<Couriers />} />
            <Route path='/support/dashboard/settings' element={<Settings />} />
          </Route>
          <Route path='/support/dashboard/package/choose-address' element={<PrivateRoute isAllowed={userInfo?.type?.id !== 3} redirectTo='/admin/dashboard/'><ChooseAddress /></PrivateRoute>} />
          <Route path='/admin/dashboard' element={<PrivateRoute isAllowed={userInfo?.type?.id === 3} redirectTo='/support/dashboard/'><Layout /></PrivateRoute>} >
            <Route index element={<AdminDashboard />} />
            <Route path='/admin/dashboard/pending' element={<Pending />} />
            <Route path='/admin/dashboard/package' element={<Packages />} />
            <Route path='/admin/dashboard/package/new' element={<CreatePackages />} />
            <Route path='/admin/dashboard/courier' element={<Couriers />} />
            <Route path='/admin/dashboard/settings' element={<Settings />} />
          </Route>
          <Route path='/admin/dashboard/package/choose-address' element={<PrivateRoute isAllowed={userInfo?.type?.id === 3} redirectTo='/support/dashboard/'><ChooseAddress /></PrivateRoute>} />
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App
