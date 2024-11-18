import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import signupImage from './public/signup.jpg';
import './UserSignup.css';

export default function UserSignup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/signup', { username, password });

      if (res.status === 200) {
        console.log(res.data);
        navigate('/');
      } else {
        console.log('Signup failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-box">
      <form className="signup-form" onSubmit={handleSubmit}>
      <img src="/signup.jpg" alt="Object Detection AI" className="signup-image" />
        <input className="signup-user" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="btn-login" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn-signup" type="submit">Signup</button>
      </form>
    </div>
  );
}
