import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
const {AuthContext} = require('../../context/Auth');

//Rendering a card containing each project's data

export default function Project(props) {
  const auth = useContext(AuthContext);
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" id="card">
        <CardContent className="cardContent">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            
          </Typography>
          <Typography variant="h5" component="div">
          {props.project.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <b>Sector: </b>{props.project.sector}
          </Typography>
          <Typography variant="body2">
          <b>Description: </b>{props.project.description}
          </Typography>
          <Typography variant="body2">
          <b>Required Funding:</b> ${props.project.requiredFunding}
          </Typography>
          <Typography variant="body2" >
            <b>Status: </b>
            <span className={props.project.status == 'Pending' ? 'pending' : props.project.status == 'Accepted' ? 'accepted' : 'declined'}>{props.project.status}</span>
          </Typography>
          <Typography variant="body2" className={props.project.urgency == 'Urgent' ? 'urgent' : 'notUrgent'}>
            {props.project.urgency}
          </Typography>
        </CardContent>
        <div className="cardButtonContainer">
        <CardActions>
          <Button className="cardPOwnerButton" variant="outlined" size="small" onClick={()=>{auth.deleteProject(props.project.name)}}>Delete</Button>
        </CardActions>
        </div>
      </Card>
    </Box>
  );
}