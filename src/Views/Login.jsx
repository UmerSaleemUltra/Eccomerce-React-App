import React, { useState } from 'react';
import { LoginUser } from '../Confing/Firebase';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await LoginUser(email, password);
      alert('User logged in successfully!');
      console.log(user);
      navigate('/dashboard', { state: { email: user.email } }); // Pass email to the dashboard
    } catch (e) {
      console.error('Error logging in:', e);
      alert(e.message);
    }
  };

  const themeColor = useSelector(state => state.theme.color);

  return (
    <Container sx={{backgroundColor: themeColor}} maxWidth="xs">
      <Box  mt={5} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          id="loginEmail"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          id="loginPassword"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Box mt={2}>
       
        </Box>
      </Box>
    </Container>
  );
}
