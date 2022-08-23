import React,{
    useState
} from 'react';
import './GroupDashboard.css';

import {
    useParams
} from 'react-router-dom';
import { GroupDashboardNavigation } from '..';

const GroupDashboard = ({}) =>{

    const {id} = useParams();

    return(
        <div className = 'groupdashboard'>
            <h1 className="groupTitle">
                group dashboard of {id}
            </h1>
        </div>

    );
}




export default GroupDashboard;

