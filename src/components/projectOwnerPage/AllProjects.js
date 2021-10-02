import React, {useContext} from 'react';
import Project from './Project';
const {AuthContext} = require('../../context/Auth');

export default function AllProjects() {
  const auth = useContext(AuthContext);
  console.log(auth.user)
  return (
    <div>
      <h2>Project Requests</h2>
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
