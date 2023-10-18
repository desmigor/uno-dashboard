import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Public from './routes/public';
import Login from './features/authentication/components/Login';
import Private from './routes/private';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Public />} />
          {/* <Route path='/' element={<Private />} /> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
