import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../Confing/Firebase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import 'bootstrap/dist/css/bootstrap.min.css';
import googleLogo from '../assets/google-logo.png'; // Ensure you have a Google logo image in your assets

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setSuccess('User signed up successfully with Google!');
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="card" style={{ padding: '20px', maxWidth: '400px', width: '100%', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h2 className="text-center mb-4">Login</h2>
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
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                style: { color: '#007bff' },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button type="submit" variant="contained" className="btn btn-primary w-100" style={{ marginTop: '10px' }}>
            Signup
          </Button>
        </form>
        <Button
          variant="contained"
          onClick={handleGoogleSignup}
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            border: '1px solid #ddd',
            marginTop: '10px',
            textTransform: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={googleLogo} alt="Google Logo" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
          Signup with Google
        </Button>
        {error && <p className="alert alert-danger mt-3" style={{ marginTop: '10px' }}>{error}</p>}
        {success && <p className="alert alert-success mt-3" style={{ marginTop: '10px' }}>{success}</p>}
      </div>
    </div>
  );
};

export default Signup;
