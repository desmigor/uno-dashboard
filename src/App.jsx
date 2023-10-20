import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Public from './routes/public';
import Private from './routes/private';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path='/' element={<Public />} /> */}
          <Route path='/' element={<Private />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
