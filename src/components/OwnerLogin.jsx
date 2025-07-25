// src/components/OwnerLogin.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OwnerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://cake-backend1.onrender.com/api/owner/login', {
        email,
        password,
      });

      const token = res.data.token;

      // ✅ Store token in localStorage
      localStorage.setItem('ownerToken', token);

      // ✅ Navigate to owner dashboard
      navigate('/owner/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Owner Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Owner Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Owner Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default OwnerLogin;
