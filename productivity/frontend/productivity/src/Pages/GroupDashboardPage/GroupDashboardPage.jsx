import React from 'react';
import './GroupDashboardPage.css';
import {
    useParams,
    Outlet
} from 'react-router-dom';
import { 
    Sidebarleft,
    Sidebarright,
    GroupDashboardNavigation, 
    GroupDashboardSidebar
} from '../../Components';

const GroupDashboardPage = () =>{
  
    const {name} = useParams();

    return(
        <div className = 'groupdashboardpage'>
            <div className="dashboardpage__container">
                <Sidebarleft>
                    <GroupDashboardNavigation />
                </Sidebarleft>
                <Outlet />
                <Sidebarright>
                    <GroupDashboardSidebar />
                </Sidebarright>
            </div>
        </div>
    );
}

export default GroupDashboardPage;

