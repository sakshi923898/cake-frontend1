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

      localStorage.setItem('ownerToken', res.data.token); // Store JWT
      navigate('/owner/dashboard'); // Redirect to dashboard
    } catch (err) {
      alert('Invalid login');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Owner Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default OwnerLogin;
