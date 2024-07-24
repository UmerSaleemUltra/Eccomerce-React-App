import React, { useState } from 'react';
import { SignUpUser } from '../Confing/Firebase';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');

  const handleSignUp = async () => {
    try {
      const user = await SignUpUser({ email, password, fullName, age });
      alert('User signed up successfully!');
      console.log(user);
    } catch (e) {
      console.error('Error signing up:', e);
      alert(e.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          className="form-control"
          value={fullName}
          placeholder="Full Name"
          onChange={e => setFullName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          className="form-control"
          value={age}
          placeholder="Age"
          onChange={e => setAge(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="form-control"
          value={email}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="form-control"
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <Button variant="contained" color="primary" onClick={handleSignUp}>Sign Up</Button>
    </div>
  );
}
