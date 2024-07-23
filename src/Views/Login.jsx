import React, { useState } from 'react';
import { LoginUser } from "../Confing/Firebase";
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const SignIn = async () => {
    try {
      await LoginUser(email, password);
      alert('Successfully logged in');
      navigate('/');
    } catch (e) {
      alert(e.message);
    }
  };
const  onBack = () =>{ 
navigate(-1);
};
  return (
    <Container maxWidth="sm" className="mt-5">
       <Button variant="contained" color="primary" onClick={onBack}>
                Back
            </Button>
      <Typography component="h1" variant="h5" className="text-center mb-4">
        Welcome
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={SignIn}
          className="mb-3"
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
