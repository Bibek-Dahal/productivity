import React,{
  useState
} from 'react';
import './PersonalDashboard.css';

import {
    OverallPerformance,
    Analytics,
    Modal
} from '../index';

import Tooltip from 'rc-tooltip'

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

