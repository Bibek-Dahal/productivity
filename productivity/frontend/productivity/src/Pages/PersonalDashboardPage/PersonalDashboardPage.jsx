import React from 'react';
import './PersonalDashboardPage.css';

import {
    Sidebarleft,
    Sidebarright,
    PersonalDashboard,
    MainNavigation,
    UserProfile
} from '../../Components/index';

import {
    Outlet
} from 'react-router-dom';

const PersonalDashboardPage = () =>{
  
 return(
     <div className = 'personaldashboardpage'>
        <div className="personaldashboardpage__container ">
            <Sidebarleft>
                <MainNavigation />
            </Sidebarleft>
            <Outlet />
            <Sidebarright>
                <UserProfile />
            </Sidebarright>
        </div>
     </div>

 );
}

export default PersonalDashboardPage;

