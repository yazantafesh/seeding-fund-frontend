import * as React from 'react';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { AuthContext } from '../../context/Auth';
import { Redirect } from 'react-router-dom';
import './registration.css';

//This is the form that handles the registration

export default function RegForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [signedUp, setSignedUp] = useState(false)
  const auth = useContext(AuthContext);

  //Handling data change in the form

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlefirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handlelastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  //Submitting the new user data and calling the signup function from the context

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.signup(email, password, firstName, lastName, role);
    setSignedUp(true);
  }

  return (
    <div className="mainContainer">
    <div className="signupContainer">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        onSubmit={(e) => { handleSubmit(e) }}
      >
        <h3 className="signupTitle">Signup </h3>
        <TextField label="Email" variant="standard" onChange={handleEmailChange} required />
        <br/>
        <TextField label="Password" type="password" variant="standard" onChange={handlePasswordChange} required />
        <br/>
        <TextField label="First Name" variant="standard" onChange={handlefirstNameChange} required />
        <br/>
        <TextField label="Last Name" variant="standard" onChange={handlelastNameChange} required />
        <br/>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={role}
            onChange={handleRoleChange}
            label="Role"
            required
          >
            <MenuItem value='projectOwner'>Project Owner</MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
          </Select>
        </FormControl>
        <br/>
        <br/>
        <Button className="signupButton" variant="contained" type="submit" >Signup</Button>
      </Box>
      {signedUp && (
        <Redirect to="/" />
      )}
    </div>
    </div>
  );
}

