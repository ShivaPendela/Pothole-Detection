import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserLogin.css';

export default function UserLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', { username, password });
      const token = response.data.accessToken;
      localStorage.setItem('token', token);
      toast.success('Login Successful');
      navigate('/detection');
    } catch (error) {
      console.error(error);
      toast.error('Login Failed');
    }
  };

  return (
    <div className="login-box">
      <ToastContainer />O
      <form className="login-form" onSubmit={handleLogin}>
        <img src="/Login.svg" alt="Blind Object Detection" className="banner-image" />
        <input className="user-login" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input className="password-login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Log in</button>
        <div className="link-signup">
          <Link to="/signup">Don't have an account? Sign up here.</Link>
        </div>
      </form>
    </div>
  );
}