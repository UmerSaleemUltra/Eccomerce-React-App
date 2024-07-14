// src/Views/Signup.jsx

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Confing/Firebase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('User signed up successfully!');
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              style: { color: '#007bff' },
            }}
          />
        </div>
        <div className="form-group">
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              style: { color: '#007bff' },
            }}
          />
        </div>
        <Button type="submit" variant="contained" className="submit-button">
          Signup
        </Button>
      </form>
      {error && <p className="message error">{error}</p>}
      {success && <p className="message success">{success}</p>}
    </div>
  );
};

export default Signup;
