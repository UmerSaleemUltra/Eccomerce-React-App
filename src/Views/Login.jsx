import React, { useState } from 'react';
import { LoginUser } from '../Confing/Firebase';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import { useSelector } from 'react-redux';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await LoginUser(email, password);
      alert('User logged in successfully!');
      console.log(user);
      navigate('/', { state: { email: user.email } }); // Pass email to the dashboard
    } catch (e) {
      console.error('Error logging in:', e);
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
          InputProps={{
            sx: { borderRadius: '12px' }
          }}
        />
        <TextField
          id="loginPassword"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
          margin="normal"
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
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ mt: 2, padding: '10px 0', borderRadius: '12px', textTransform: 'none' }}
        >
          Login
        </Button>
        <Box mt={2}>
          <Link href="/Signup" variant="body2">
            Create New Account
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
