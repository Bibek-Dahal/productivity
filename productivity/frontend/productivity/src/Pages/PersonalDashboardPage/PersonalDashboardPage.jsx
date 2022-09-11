import React,{
    useState,
    useEffect
} from 'react';
import './PersonalDashboardPage.css';

import {
    Sidebarleft,
    Sidebarright,
    PersonalDashboard,
    MainNavigation,
    UserProfile,
    Modal,
    CreateGroup,
    ConfirmDeleteGroup,
    SmallModal
} from '../../Components/index';

import {
    Outlet
} from 'react-router-dom';

import endpoints from '../../utils/endpoints';

import {
    useAxios
} from '../../hooks/index';

const PersonalDashboardPage = () =>{

    const [showAddGroup,setShowAddGroup] = useState(false);
    const [showLogoutUI,setShowLogoutUI] = useState(false);

    const [groups,setGroups] = useState([]);
    const [groupLoading,setGroupLoading] = useState(true);
    
    const axiosInstance = useAxios();

    function toggle(){
        setShowAddGroup(prev => !prev);
    }

    async function getGroups(){
        try{
            console.log('gettingGroups = ',endpoints.getGroups)
            const res = await axiosInstance.get(endpoints.getGroups);
            setGroupLoading(false)
            console.log(res);
            setGroups(prev => res.data.groups);
        }catch(err){
            setGroupLoading(false)
            console.log(err);
        }
    }   

    useEffect(() => {
        getGroups();
    },[])


    return(
        <div className = 'personaldashboardpage bottomUp'>
            <div className="dashboardpage__container">
                <Sidebarleft>
                    <MainNavigation 
                        toggle = {toggle}
                        groups = {groups}
                        groupLoading = {groupLoading}
                        setGroups = {setGroups}
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
                    toggle = {toggle}
                >
                    <CreateGroup 
                        setGroups = {setGroups}
                        toggle = {toggle}
                    />
                </Modal>
            }
            {
                showLogoutUI &&
                <SmallModal
                    
                >
                    are you sure logout?
                    <button>
                        yes
                    </button>
                </SmallModal>
            }
           
        </div>

    );
}

export default PersonalDashboardPage;

