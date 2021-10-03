import React, { useContext } from 'react';
import Request from './Request';
import './adminPage.css';
const { AuthContext } = require('../../context/Auth');

//Here we map over all the requests received from the backend

export default function AllRequests() {
  const auth = useContext(AuthContext);
  return (
    <div id="requestsContainer">
      <h3 className='requestsTitle'>Project Requests</h3>
      {
        auth.user.projects.map((request, idx) => {
          return (
            <Request request={request} key={idx} />
          )
        })
      }
    </div>
  )
}
