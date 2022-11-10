import { useEffect,useState } from 'react';
import {
    Route,
    Routes,
    Navigate,
    NavLink,
    useNavigate,
    useParams
} from 'react-router-dom';

import {Icon} from '@iconify/react'

import {ReactComponent as Logo} from '../../svgs/logoSml.svg'

import {
    GroupDashboard,
    GroupActivity,
    SidebarLeft,
    SidebarRight,
    AddGroup,
    CreateGroup,
    CreateProject,
    GroupChat,
    AddMember
} from '../../components/';

import {
    SideModal
} from '../../components/shared/';

import useAxios from '../../hooks/useAxios';
import baseURL from '../../utils/endpoints/baseURL';
import endpoints from '../../utils/endpoints/otherEndpoints';

import groupsData from '../../utils/groups.json';
import './GroupDashboard.page.css';
import useAuthContext from '../../hooks/useAuthContext';

function DashboardPage(){

    const navigate = useNavigate();
    const [projects,setProjects] = useState([]);

    const [group,setGroup] = useState({})
    const [admin,setAdmin] = useState(null);
    const [members,setMembers] = useState([]);
    const [tasks,setTasks] = useState([]);

    const [showAddProject,setShowAddProject] = useState(false);
    const [showMemberAdd,setShowMemberAdd] = useState(false);

    const axiosInstance = useAxios();

    const {user} = useAuthContext()

    async function getProjects(){
        // try{
        //     const res = await axiosInstance.get(endpoints.getGroups);
        //     console.log('res = ',res)
        //     setProjects(prev => (res.data.groups))
        // }catch(err){
        //     console.log('error',err);
        // }
    }

    async function getGroupDetail(){
        axiosInstance.get(`api/group/${group_id}/retrive`)
            .then(res => {{
                console.log(res)
                setGroup(res.data.group)
                setAdmin(res.data.group.user);
                setMembers(res.data.group.members)
                console.log('setting tasks = ',res.data.group.task)
                setTasks(res.data.group.task)
            }})
            .catch(err => console.log('error = ',err))
    }

    const {group_id} = useParams();

    useEffect(() => {
        // getProjects();
        getGroupDetail();
    },[])

    useEffect(() => {
        console.log('tasks = ',tasks)
    },[tasks])

    return(
        <div className="dashboard-container dashboardpage group-dashboard">
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
                        to = {`/group/${group_id}/dashboard`}
                        activeClassName= "active"
                    >
                        <Icon icon = "bxs:dashboard" /> group dashboard
                    </NavLink>
                    <NavLink 
                        to = {`/group/${group_id}/activity`}
                        activeClassName = "active"
                    >
                       <Icon icon = "fluent:shifts-activity-20-filled" /> group activity
                    </NavLink>
                    <NavLink 
                        to = {`/group/${group_id}/chat`}
                        activeClassName = "active"
                    >
                       <Icon icon = "ant-design:message-outlined" /> Chat with friends
                    </NavLink>
                </div>
                <hr/>
                <div className="groupsList">
                    <div className="title">
                        <span >
                            Tasks
                        </span>
                        <div 
                            className="add-group-btn"
                            onClick = {() => setShowAddProject(true)}
                        >
                            <Icon icon = "carbon:add-alt" />
                        </div>
                    </div>
                    <ul>
                        {
                            tasks?.length !== 0 &&
                            tasks?.map(task => (
                                <li
                                    onClick = {() => navigate(`/group/${task._id}/dashboard`)}
                                >
                                    <span className="hashtag">
                                        #
                                    </span>
                                    {task.task_title}
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
                <Route path = "/dashboard" element = {<GroupDashboard className = "dashboard-center"/>}/>
                <Route path = "/activity" element = {<GroupActivity className = "dashboard-center"/>}/>
                <Route path = "/chat" element = {<GroupChat className = "dashboard-center"/>} />
            </Routes>
            <SidebarRight>
                <div className="members-container">
                        <div>
                            <span className="title">admin</span>
                            <div className="people">
                                <img src="https://picsum.photos/200" alt="" />
                                <span className='username'>
                                    {admin?.username}
                                </span>
                            </div>
                        </div>
                        <div>
                            <span className="title">
                                members
                                {
                                    admin?._id == user.id &&
                                    <div className="addMemberIcon" onClick = {() => setShowMemberAdd(true)}>
                                        <Icon icon = "carbon:add-alt" />
                                    </div>
                                }
                            </span>
                            {
                                members?.map(member => (
                                    member.username !== admin.username && 
                                    <div className="people">
                                        <img src="https://picsum.photos/200" alt="" />
                                        <span className='username'>
                                            {member?.username}
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                </div>
            </SidebarRight>
            {
                showAddProject &&
                <SideModal
                    toggle = {() => setShowAddProject(prev => !prev)}
                >
                    <CreateProject 
                        setProjects = {setTasks}
                        toggle = {() => setShowAddProject(prev => !prev)}
                    />
                </SideModal>
            }
            {
                showMemberAdd &&
                <SideModal
                    toggle = {() => setShowMemberAdd(prev => !prev)}
                >
                    <AddMember 
                        group_name = {group?.name}
                        toggle = {() => setShowMemberAdd(prev => !prev)}
                    />
                </SideModal>
            }
        </div>
    )
}

export default DashboardPage;