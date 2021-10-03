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
import './projectOwner.css';

import { AuthContext } from '../../context/Auth';

//A form for submitting a project funding request

export default function ProjectsForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sector, setSector] = useState('');
  const [requiredFunding, setRequiredFunding] = useState('');
  const [urgency, setUrgency] = useState(false);
  const auth = useContext(AuthContext);

  //Handling data changes in the form

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
    if (event.target.checked) {
      setUrgency('Urgent')
    } else {
      setUrgency('Not Urgent')
    }
  };

  //Submitting and clearing the form and calling the createProject function from the context

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.createProject(name, description, sector, requiredFunding, urgency);
    event.target.reset();
    setSector('');
  }

  return (
    <>
      <h3 className='title'>Project Form</h3>
      <div id="formContainer">
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          onSubmit={(e) => { handleSubmit(e) }}
        >
          <br />
          <TextField label="Project Name" variant="standard" onChange={handleNameChange} required/>
          <br />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Description"
            style={{ width: 200 }}
            onChange={handleDescriptionChange}
            required
          />
          <br />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="label">Sector</InputLabel>
            <Select
              labelId="label"
              id="demo-simple-select-standard"
              onChange={handleSectorChange}
              value={sector}
              label="Sector"
              required
            >
              <MenuItem value='Agriculture'>Agriculture</MenuItem>
              <MenuItem value='Education'>Education</MenuItem>
              <MenuItem value='Energy'>Energy</MenuItem>
              <MenuItem value='Health'>Health</MenuItem>
              <MenuItem value='Pharmaceuticals'>Pharmaceuticals</MenuItem>
            </Select>
          </FormControl>
          <br />
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
            <Input
              id="standard-adornment-amount"
              onChange={handleRequiredFundingChange}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Required Funding"
              type='number'
              placeholder='Required Funding'
              required
            />
          </FormControl>
          <InputLabel> <Checkbox className="checkbox" onChange={handleUrgencyChange} />Urgent</InputLabel>

          <Button className="submitButton" variant="contained" type="submit" >Send Request</Button>
        </Box>
      </div>
    </>
  );
}
