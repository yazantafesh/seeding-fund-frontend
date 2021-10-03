import React, {useContext} from 'react';
import Project from './Project';
import './projectOwner.css';
const {AuthContext} = require('../../context/Auth');

//Maping over projects received from the backend

export default function AllProjects() {
  const auth = useContext(AuthContext);
  return (
    <div id="requestsContainer">
      <h3 className='requestsTitle'>Project Requests</h3>
      {
        auth.user.projects.map((project)=>{
          return(
            <Project project={project} key={project.name} />
          )
        })
      }
    </div>
  )
}
