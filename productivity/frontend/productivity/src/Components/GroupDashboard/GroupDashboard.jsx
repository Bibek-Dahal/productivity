import React,{
    useState,
    useContext,
    useEffect
} from 'react';
import './GroupDashboard.css';

import {
    useParams,
    useOutletContext
} from 'react-router-dom';
import { GroupDashboardNavigation } from '..';

const GroupDashboard = () =>{

    const {groupId,group} = useOutletContext();

    // useEffect(() => {
    //     console.log('rendere GroupDashboard')
    // }, [groupId])

    console.log('groupdetails = ',group)

    return(
        <div className = 'groupdashboard'>
            <h1 className="groupTitle">
                {group.name}
            </h1>
        </div>

    );
}




export default GroupDashboard;

