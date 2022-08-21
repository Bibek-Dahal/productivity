import React from 'react';
import './GroupDashboard.css';

import {
    useParams
} from 'react-router-dom';
import { GroupDashboardNavigation } from '..';

const GroupDashboard = () =>{
  
    const {name} = useParams();

    return(
        <div className = 'groupdashboard'>
            GroupDashboard of {name}
        </div>

    );
}

export default GroupDashboard;

