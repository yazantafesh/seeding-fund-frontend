import React, {useContext} from 'react';
import Request from './Request';
import './adminPage.css';
const {AuthContext} = require('../../context/Auth');

export default function AllRequests() {
  const auth = useContext(AuthContext);
  return (
    <div id="requestsContainer">
      {
        auth.user.projects.map((request, idx)=>{
          return(
            <Request request={request} key={idx}/>
          )
        })
      }
    </div>
  )
}
