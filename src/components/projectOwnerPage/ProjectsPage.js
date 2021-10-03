import React from 'react';
import AllProjects from './AllProjects';
import ProjectsForm from './ProjectsForm';
import './projectOwner.css';

export default function ProjectsPage() {
  return (
    <div id="ownerContainer">
      <AllProjects/>
      <ProjectsForm/>
    </div>
  )
}
