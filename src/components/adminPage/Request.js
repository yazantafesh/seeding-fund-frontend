import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
const {AuthContext} = require('../../context/Auth');

export default function Request(props) {
  const auth = useContext(AuthContext);
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            
          </Typography>
          <Typography variant="h5" component="div">
          {props.request.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Sector: {props.request.sector}
          </Typography>
          <Typography variant="body2">
          {props.request.description}
          </Typography>
          <Typography variant="body2">
          Required Funding: ${props.request.requiredFunding}
          </Typography>
          <Typography variant="body2">
          {props.request.urgency}
          </Typography>
          <Typography variant="body2">
          Owner's E-mail: {props.request.email}
          </Typography>
          <Typography variant="body2">
          Status: {props.request.status}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=>{auth.updateProjectStatus(props.request.name, props.request.email, 'Accepted')}}>Accept</Button>
          <Button size="small" onClick={()=>{auth.updateProjectStatus(props.request.name, props.request.email, 'Declined')}}>Decline</Button>
        </CardActions>
      </Card>
    </Box>
  );
}