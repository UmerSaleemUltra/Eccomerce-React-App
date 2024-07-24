import React, { useState } from 'react';
import { LoginUser } from '../Confing/Firebase';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await LoginUser(email, password);
      alert('User logged in successfully!');
      console.log(user);
    } catch (e) {
      console.error('Error logging in:', e);
      alert(e.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="loginEmail">Email</label>
        <input
          id="loginEmail"
          type="email"
          className="form-control"
          value={email}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="loginPassword">Password</label>
        <input
          id="loginPassword"
          type="password"
          className="form-control"
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
    </div>
  );
}
