import React, {useContext} from 'react';
import AllRequests from './AllRequests';
import Chart from './Chart';
import { AuthContext } from '../../context/Auth';

export default function AdminPage() {
  const auth = useContext(AuthContext);
  return (
    <div style={{marginTop:'100px'}}>
      <AllRequests/>
      <Chart Accepted={auth.projectStatus.Accepted} Declined={auth.projectStatus.Declined} Pending={auth.projectStatus.Pending}/>
    </div>
  )
}
