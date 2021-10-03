import React, {useContext} from 'react';
import AllRequests from './AllRequests';
import Chart from './Chart';
import { AuthContext } from '../../context/Auth';
import './adminPage.css';

export default function AdminPage() {
  const auth = useContext(AuthContext);
  return (
    <div id="adminContainer">
      <AllRequests/>
      <Chart Accepted={auth.projectStatus.Accepted} Declined={auth.projectStatus.Declined} Pending={auth.projectStatus.Pending}/>
    </div>
  )
}
