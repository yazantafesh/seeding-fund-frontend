import * as React from 'react';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';

import { AuthContext } from '../../context/Auth';

export default function ProjectsForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sector, setSector] = useState('');
  const [requiredFunding, setRequiredFunding] = useState('');
  const [urgency, setUrgency] = useState(false);
  const auth = useContext(AuthContext);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSectorChange = (event) => {
    setSector(event.target.value);
  };

  const handleRequiredFundingChange = (event) => {
    setRequiredFunding(event.target.value);
  };

  const handleUrgencyChange = (event) => {
    if(event.target.checked){
      setUrgency('Urgent')
    }else{
      setUrgency('Not Urgent')
    }
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    auth.createProject(name, description, sector, requiredFunding, urgency);
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
      onSubmit={(e)=>{handleSubmit(e)}}
      >
        <TextField label="Project Name" variant="standard" onChange={handleNameChange} />
        <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          placeholder="Description"
          style={{ width: 200 }}
          onChange={handleDescriptionChange}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Sector</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={sector}
            onChange={handleSectorChange}
            label="Sector"
          >
            <MenuItem value='Agriculture'>Agriculture</MenuItem>
            <MenuItem value='Education'>Education</MenuItem>
            <MenuItem value='Energy'>Energy</MenuItem>
            <MenuItem value='Health'>Health</MenuItem>
            <MenuItem value='Pharmaceuticals'>Pharmaceuticals</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
          <Input
            id="standard-adornment-amount"
            value={requiredFunding}
            onChange={handleRequiredFundingChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Required Funding"
            type='number'
            placeholder='Required Funding'
          />
        </FormControl>
        <InputLabel>Urgent</InputLabel>
        <Checkbox onChange={handleUrgencyChange}/>
        <Button variant="contained" type="submit" >Submit</Button>
      </Box>
    </div>
  );
}
