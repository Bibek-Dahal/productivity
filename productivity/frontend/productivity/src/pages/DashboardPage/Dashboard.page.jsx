import { useEffect,useState } from 'react';
import {
    Route,
    Routes,
    Navigate,
    NavLink,
    useNavigate
} from 'react-router-dom';

import {Icon} from '@iconify/react'

import {ReactComponent as Logo} from '../../svgs/logoSml.svg'

import {
    Dashboard,
    PersonalActivity,
    SidebarLeft,
    SidebarRight,
    AddGroup,
    CreateGroup
} from '../../components/';

import {
    SideModal
} from '../../components/shared/';

import useAxios from '../../hooks/useAxios';
import baseURL from '../../utils/endpoints/baseURL';
import endpoints from '../../utils/endpoints/otherEndpoints';

import groupsData from '../../utils/groups.json';
import './Dashboard.page.css';

function DashboardPage(){

    const navigate = useNavigate();
    const [groups,setGroups] = useState([]);

    const [showAddGroup,setShowAddGroup] = useState(false);

    const axiosInstance = useAxios();

    async function getGroups(){
        try{
            const res = await axiosInstance.get(endpoints.getGroups);
            console.log('res = ',res)
            setGroups(prev => (res.data.groups))
        }catch(err){
            console.log('error',err);
        }
    }

    useEffect(() => {
        getGroups();
    },[])


    return(
        <div className="dashboard-container dashboardpage">
            <SidebarLeft>
                <div className="logo-image">
                    <Logo 
                        onClick = {() => navigate('/dashboard')}
                        style = {{
                            cursor : "pointer"
                        }}
                    />
                </div>
                <hr/>
                <div className="navigation">
                    <NavLink 
                        to = "/dashboard"
                        activeClassName= "active"
                    >
                        <Icon icon = "bxs:dashboard" /> dashboard
                    </NavLink>
                    <NavLink 
                        to = "/dashboard/activity"
                        activeClassName = "active"
                    >
                       <Icon icon = "fluent:shifts-activity-20-filled" /> activity
                    </NavLink>
                </div>
                <hr/>
                <div className="groupsList">
                    <div className="title">
                        <span >
                            Groups
                        </span>
                        <div 
                            className="add-group-btn"
                            onClick = {() => setShowAddGroup(true)}
                        >
                            <Icon icon = "carbon:add-alt" />
                        </div>
                    </div>
                    <ul>
                        {
                            groups.map(group => (
                                <li
                                    onClick = {() => navigate(`/group/${group._id}/dashboard`)}
                                >
                                    <span className="hashtag">
                                        #
                                    </span>
                                    {group.name}
                                    <span className="deleteBtn">
                                        <Icon icon = "fluent-emoji-flat:cross-mark" />
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </SidebarLeft>
            <Routes>
                <Route path = "/" element = {<Dashboard className = "dashboard-center"/>}/>
                <Route path = "/activity" element = {<PersonalActivity className = "dashboard-center"/>}/>
            </Routes>
            <SidebarRight>
                user profile
            </SidebarRight>
            {
                showAddGroup &&
                <SideModal
                    toggle = {() => setShowAddGroup(prev => !prev)}
                >
                    <CreateGroup 
                        setGroups = {setGroups}
                        toggle = {() => setShowAddGroup(prev => !prev)}
                    />
                </SideModal>
            }
        </div>
    )
}

export default DashboardPage;