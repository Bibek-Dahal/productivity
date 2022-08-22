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
            <h1 className="groupTitle">
                {name}
            </h1>
        </div>

    );
}




export default GroupDashboard;

