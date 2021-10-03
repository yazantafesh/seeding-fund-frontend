import * as React from 'react';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthContext } from '../../context/Auth';
import './login.css';

//This is the login form component

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext);

  //This handles email in change in form

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  //This handles password in change in form

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //This handles calling the login function from the context

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.login(email, password);
  }

  return (
    <div className="bigContainer">
      <div className="loginContainer" >
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          onSubmit={(e) => { handleSubmit(e) }}
        >
          <h3 className="loginTitle">Login </h3>
          <TextField label="Email" variant="standard" onChange={handleEmailChange} required />
          <br />
          <TextField label="Password" variant="standard" onChange={handlePasswordChange} type='password' required />
          <br />
          <br />
          <Button className="loginButton" variant="contained" type="submit" >Login</Button>
        </Box>
      </div>
    </div>
  );
}
