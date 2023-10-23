import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Public from './routes/public';
import Private from './routes/private';
import SupportLogin from './dashboards/supportFeatures/authentication/components/Login';
import Login from './dashboards/adminFeatures/authentication/components/AdminLogin';
import ResetPassword from './dashboards/supportFeatures/authentication/components/ResetPassword';
import ChangePassword from './dashboards/supportFeatures/authentication/components/ChangePassword';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/support' element={<SupportLogin />} />
          <Route path='/reset' element={<ResetPassword />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/admin' element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
