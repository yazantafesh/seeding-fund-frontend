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

export default function RegForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [signedUp, setSignedUp] = useState(false)
  const auth = useContext(AuthContext);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.signup(email, password, firstName, lastName, role);
    setSignedUp(true);
  }

  return (
    <div style={{ marginTop: '100px' }}>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => { handleSubmit(e) }}
      >
        <TextField label="Email" variant="standard" onChange={handleEmailChange} />
        <TextField label="Password" variant="standard" onChange={handlePasswordChange} />
        <TextField label="First Name" variant="standard" onChange={handlefirstNameChange} />
        <TextField label="Last Name" variant="standard" onChange={handlelastNameChange} />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={role}
            onChange={handleRoleChange}
            label="Role"
          >
            <MenuItem value='projectOwner'>Project Owner</MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" type="submit" >Submit</Button>
      </Box>
      {signedUp && (
        <Redirect to="/" />
      )}
    </div>
  );
}

