// Import necessary hooks and components
import React, { useState } from 'react';
import { SignUpUser } from '../Confing/Firebase';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux';


export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const user = await SignUpUser({ email, password, fullName, age });
      alert('User signed up successfully!');
      console.log(user);
      navigate('/dashboard', { state: { email: user.email } }); // Pass email to the dashboard
    } catch (e) {
      console.error('Error signing up:', e);
      alert(e.message);
    }
  };

  const themeColor = useSelector(state => state.theme.color);
 
  return (
      
    <Container sx={{backgroundColor: themeColor}} maxWidth="xs">
      <Box  mt={5} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="fullName"
              label="Full Name"
              type="text"
              fullWidth
              variant="outlined"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="age"
              label="Age"
              type="number"
              fullWidth
              variant="outlined"
              value={age}
              onChange={e => setAge(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Link href="/login" variant="body2">
             have an account? 
          </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>

  );
}
