import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
const { AuthContext } = require('../../context/Auth');

//This is the card component for each single request

export default function Request(props) {
  const auth = useContext(AuthContext);
  return (
    <Box sx={{ minWidth: 275 }} >
      <Card variant="outlined" id="card">
        <CardContent className="cardContent">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>

          </Typography>
          <Typography variant="h5" component="div">
            {props.request.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <b>Sector: </b>{props.request.sector}
          </Typography>
          <Typography variant="body2">
            <b>Description: </b>{props.request.description}
          </Typography>
          <Typography variant="body2">
            <b>Required Funding:</b> ${props.request.requiredFunding}
          </Typography>
          <Typography variant="body2">
            <b>Owner's E-mail: </b>{props.request.email}
          </Typography>
          <Typography variant="body2" >
            <b>Status: </b>
            <span className={props.request.status == 'Pending' ? 'pending' : props.request.status == 'Accepted' ? 'accepted' : 'declined'}>{props.request.status}</span>
          </Typography>
          <Typography variant="body2" className={props.request.urgency == 'Urgent' ? 'urgent' : 'notUrgent'}>
            {props.request.urgency}
          </Typography>
        </CardContent>
        <div className="cardButtonContainer">
        <CardActions >
          <Button className="cardButton" variant ="outlined" size="small" onClick={() => { auth.updateProjectStatus(props.request.name, props.request.email, 'Accepted') }}>Accept</Button>
          <Button className="cardButton" variant ="outlined" size="small" onClick={() => { auth.updateProjectStatus(props.request.name, props.request.email, 'Declined') }}>Decline</Button>
        </CardActions>
        </div>
      </Card>
    </Box>
  );
}