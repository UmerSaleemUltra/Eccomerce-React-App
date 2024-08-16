import React, { useState } from 'react';
import { SignUpUser } from '../Confing/Firebase';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useSelector } from 'react-redux';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');  // Added age state
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const user = await SignUpUser({ email, password, fullName, age });  // Include age in sign up data
      alert('User signed up successfully!');
      console.log(user);
      navigate('/Login'); 
    } catch (e) {
      console.error('Error signing up:', e);
      alert(e.message);
    }
  };

  const themeColor = useSelector(state => state.theme.color);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Container sx={{ backgroundColor: themeColor, padding: 3, borderRadius: 3, boxShadow: 3 }} maxWidth="xs">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="fullName"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              InputProps={{
                sx: { borderRadius: '12px' }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="age"
              label="Age"
              type="number"  // Added age input field
              fullWidth
              variant="outlined"
              value={age}
              onChange={e => setAge(e.target.value)}
              InputProps={{
                sx: { borderRadius: '12px' }
              }}
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
              InputProps={{
                sx: { borderRadius: '12px' }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant="outlined"
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { borderRadius: '12px' }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignUp}
              sx={{ padding: '10px 0', borderRadius: '12px', textTransform: 'none' }}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
