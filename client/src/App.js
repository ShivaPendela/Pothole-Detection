import './App.css';
import UserSignup from './components/UserSignup';
import UserLogin from './components/UserLogin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Detection from './components/Detection';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/" element={<UserLogin />} />
          <Route path="/detection" element={<Detection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
