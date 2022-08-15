import React from 'react';
import './PersonalDashboard.css';

import {
    OverallPerformance,
    Analytics
} from '../index';

const PersonalDashboard = () =>{
  
 return(
     <div className = 'personaldashboard nav-padding'>
       <h1>Dashboard</h1>
       <OverallPerformance />
       <Analytics />
     </div>

 );
}

export default PersonalDashboard;

