import React,{
    useState
} from 'react';
import './PersonalDashboardPage.css';

import {
    Sidebarleft,
    Sidebarright,
    PersonalDashboard,
    MainNavigation,
    UserProfile,
    Modal,
    CreateGroup
} from '../../Components/index';

import {
    Outlet
} from 'react-router-dom';

const PersonalDashboardPage = () =>{

  const [showAddGroup,setShowAddGroup] = useState(false);

  function toggle(){
    setShowAddGroup(prev => !prev);
  }

    return(
        <div className = 'personaldashboardpage'>
            <div className="dashboardpage__container">
                <Sidebarleft>
                    <MainNavigation 
                        toggle = {toggle}
                    />
                </Sidebarleft>
                <Outlet />
                <Sidebarright>
                    <UserProfile />
                </Sidebarright>
            </div>
            {
                showAddGroup &&
                <Modal
                    className = "visible padding-dribble"
                >
                    <CreateGroup toggle = {toggle}/>
                </Modal>
            }

        </div>

    );
}

export default PersonalDashboardPage;

