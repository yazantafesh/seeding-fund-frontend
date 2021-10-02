import React, {useContext} from 'react';
import Request from './Request';
const {AuthContext} = require('../../context/Auth');

export default function AllRequests() {
  const auth = useContext(AuthContext);
  return (
    <div>
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
