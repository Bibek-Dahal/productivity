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
    CreateGroup
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

    const [groups,setGroups] = useState([]);

    const axiosInstance = useAxios();

    function toggle(){
        setShowAddGroup(prev => !prev);
    }

    async function getGroups(){
        try{
            const res = await axiosInstance.get(endpoints.getGroups);
            console.log(res);
            setGroups(res.data.groups);
        }catch(err){
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
                    <CreateGroup 
                        toggle = {toggle}
                        setGroups = {setGroups}
                    />
                </Modal>
            }

        </div>

    );
}

export default PersonalDashboardPage;

