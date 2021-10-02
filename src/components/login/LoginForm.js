import * as React from 'react';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthContext } from '../../context/Auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    auth.login(email, password);
  }

  return (
    <div style ={{marginTop:'100px'}}>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={(e)=>{handleSubmit(e)}}
    >
      <TextField label="Email" variant="standard" onChange={handleEmailChange}/>
      <TextField label="Password" variant="standard" onChange={handlePasswordChange}/>
        <Button variant="contained" type="submit" >Submit</Button>
    </Box>
    </div>
  );
}

