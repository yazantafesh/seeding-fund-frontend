import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
const {AuthContext} = require('../../context/Auth');

export default function Project(props) {
  const auth = useContext(AuthContext);
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            
          </Typography>
          <Typography variant="h5" component="div">
          {props.project.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Sector: {props.project.sector}
          </Typography>
          <Typography variant="body2">
          {props.project.description}
          </Typography>
          <Typography variant="body2">
          Required Funding: ${props.project.requiredFunding}
          </Typography>
          <Typography variant="body2">
          {props.project.urgency}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=>{auth.deleteProject(props.project.name)}}>Delete</Button>
        </CardActions>
      </Card>
    </Box>
  );
}