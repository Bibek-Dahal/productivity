import { useEffect,useState } from 'react';
import {
    Route,
    Routes,
    Navigate,
    NavLink,
    useNavigate,
    useParams,
    useSearchParams
} from 'react-router-dom';

import { Store } from 'react-notifications-component';


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

import useSocketContext from '../../hooks/useSocketContext';

import {
    SideModal,
    ConfirmModal
} from '../../components/shared/';

import useAxios from '../../hooks/useAxios';
import baseURL from '../../utils/endpoints/baseURL';
import endpoints from '../../utils/endpoints/otherEndpoints';

import groupsData from '../../utils/groups.json';
import './GroupDashboard.page.css';
import useAuthContext from '../../hooks/useAuthContext';
import useNotification from '../../hooks/useNotification';

function DashboardPage(){

    const {socket} = useSocketContext();

    const navigate = useNavigate();
    const [projects,setProjects] = useState([]);

    const [group,setGroup] = useState({})
    const [admin,setAdmin] = useState(null);
    const [members,setMembers] = useState([]);
    const [tasks,setTasks] = useState([]);

    const [memberToRemove,setMemberToRemove] = useState(null);
    const [confirmRemoveMember,setConfirmRemoveMember] = useState(false);
    const [removeMemberConfirmation,setRemoveMemberConfirmation] = useState(false);

    const [taskToRemove,setTaskToRemove] = useState(null);
    const [confirmRemoveTask,setConfirmRemoveTask] = useState(false);
    const [removeTaskConfirmation,setRemoveTaskConfirmation] = useState(false);

    const [showAddProject,setShowAddProject] = useState(false);
    const [showMemberAdd,setShowMemberAdd] = useState(false);

    const axiosInstance = useAxios();

    const {user} = useAuthContext()

    const msg = useSearchParams()[0].get('msg');

    async function getProjects(){
        // try{
        //     const res = await axiosInstance.get(endpoints.getGroups);
        //     console.log('res = ',res)
        //     setProjects(prev => (res.data.groups))
        // }catch(err){
        //     console.log('error',err);
        // }
    }

    useEffect(() => {
        if(msg){
            Store.addNotification({
                title: "Wonderful!",
                message: msg,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                  pauseOnHover : true
                }
            });
        }
    },[])

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

    const removeMember = (e) => {
        // const memberId = (JSON.parse(e.target.getAttribute('info'))).id;
        const info = JSON.parse(e.target.getAttribute('info'));
        console.log('removing',info._id);
        setRemoveMemberConfirmation(true);
        setMemberToRemove(info._id);
    }

    const removeTask = (e) => {
        // const memberId = (JSON.parse(e.target.getAttribute('info'))).id;
        const info = JSON.parse(e.target.getAttribute('info'));
        console.log('removing',info._id);
        setRemoveTaskConfirmation(true);
        setTaskToRemove(info._id);
    }

    const createNotification = useNotification();
    
    const {group_id} = useParams();

    useEffect(() => {
        // getProjects();
        getGroupDetail();
    },[])

    useEffect(() => {
        socket?.emit('new-user',{
            roomId : group._id
        })
    },[socket])

    useEffect(() => {
        if(confirmRemoveMember){
            // axiosInstance.delete(`${endpoints.removeMember}/`)
        }
    },[removeMember,confirmRemoveMember,memberToRemove])

    useEffect(() => {
        if(confirmRemoveTask){
            // axiosInstance.delete(`${endpoints.removeMember}/`)
            console.log('confirmed to remove Task',taskToRemove);
            axiosInstance.delete(`${endpoints.deleteTask}/${group_id}/${taskToRemove}`)
                .then(res => {
                    createNotification('success','deleted task','deleted task successfully',5000)
                    setRemoveTaskConfirmation(false);
                    setTaskToRemove(null);
                    getGroupDetail();
                })
                .catch(err => createNotification('danger','failure','error occured while deleting task',5000));
        }
    },[confirmRemoveTask,taskToRemove])

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
                        className = {(navData) => navData.isActive ? "active" : "" }
                    >
                        <Icon icon = "bxs:dashboard" /> group dashboard
                    </NavLink>
                    <NavLink 
                        to = {`/group/${group_id}/activity`}
                        className = {(navData) => navData.isActive ? "active" : "" }
                    >
                       <Icon icon = "fluent:shifts-activity-20-filled" /> group activity
                    </NavLink>
                    <NavLink 
                        to = {`/group/${group_id}/chat`}
                        className = {(navData) => navData.isActive ? "active" : "" }
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
                                    onClick = {() => {}}
                                    key = {task._id}
                                >
                                    <span className="hashtag">
                                        #
                                    </span>
                                    {task.task_title}
                                    <span 
                                        className="deleteBtn" 
                                        onClick = {removeTask}
                                        info = {JSON.stringify(task)}
                                    >
                                        <Icon icon = "akar-icons:cross" />
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
                <Route path = "/chat" element = {<GroupChat group ={group} className = "dashboard-center"/>} />
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
                                    <div 
                                        className="people"
                                        key = {member._id}
                                    >
                                        <img src="https://picsum.photos/200" alt="" />
                                        <span className='username'>
                                            {member?.username}
                                        </span>
                                        <span 
                                            className="deleteBtn"
                                            onClick = {removeMember}
                                            info = {JSON.stringify(member)}
                                        >
                                            <Icon icon = "akar-icons:cross" />
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
                        getGroupDetail = {getGroupDetail}
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
            {
                removeMemberConfirmation &&
                <SideModal
                    toggle = {() => setRemoveMemberConfirmation(prev => !prev)}
                    height = "auto"
                >
                    <form action="" className = "confirmDeleteForm" onSubmit = {(e) => e.preventDefault()}>
                        <h2>Remove member!</h2>
                        <p>
                            Are you sure you want to remove this member?
                        </p>
                        <div className="grid-btns">
                            <button
                                className='canceldelete'
                                onClick = {() => setRemoveMemberConfirmation(prev => !prev)}
                            >
                                cancel
                            </button>
                            <button
                                className='confirmdelete'
                                onClick = {() => setConfirmRemoveMember(true)}
                            >
                                confirm
                            </button>
                        </div>
                    </form>
                </SideModal>
            }
            {
                removeTaskConfirmation &&
                <SideModal
                    toggle = {() => setRemoveTaskConfirmation(prev => !prev)}
                    height = "auto"
                >
                    {/* <form action="" className = "confirmDeleteForm" onSubmit = {(e) => e.preventDefault()}>
                        <h2>Remove task!</h2>
                        <p>
                            Are you sure you want to remove this task?
                        </p>
                        <div className="grid-btns">
                            <button
                                className='canceldelete'
                                onClick = {() => setRemoveMemberConfirmation(prev => !prev)}
                            >
                                cancel
                            </button>
                            <button
                                className='confirmdelete'
                                onClick = {() => setConfirmRemoveMember(true)}
                            >
                                confirm
                            </button>
                        </div>
                    </form> */}
                    <ConfirmModal
                        setConfirmation = {() => setRemoveTaskConfirmation(prev => !prev)}
                        setConfirm = {() => setConfirmRemoveTask(true)}
                        title = "Remove task!"
                        detail = "Are you sure you want to remove this task?"
                    />
                </SideModal>
            }
        </div>
    )
}

export default DashboardPage;