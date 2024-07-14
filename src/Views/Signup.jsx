import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Confing/Firebase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
      <div className="card" style={{ padding: '20px', maxWidth: '400px', width: '100%', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h2 className="text-center mb-4">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group mb-3">
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
          <div className="form-group mb-3">
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
          <Button type="submit" variant="contained" className="btn btn-primary w-100" style={{ marginTop: '10px' }}>
            Signup
          </Button>
        </form>
        {error && <p className="alert alert-danger mt-3" style={{ marginTop: '10px' }}>{error}</p>}
        {success && <p className="alert alert-success mt-3" style={{ marginTop: '10px' }}>{success}</p>}
      </div>
    </div>
  );
};

export default Signup;
