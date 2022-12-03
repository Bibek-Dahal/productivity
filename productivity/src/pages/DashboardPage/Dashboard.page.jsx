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
    CreateGroup,
    Profile
} from '../../components/';

import {
    SideModal
} from '../../components/shared/';

import useAxios from '../../hooks/useAxios';
import baseURL from '../../utils/endpoints/baseURL';
import endpoints from '../../utils/endpoints/otherEndpoints';

import groupsData from '../../utils/groups.json';
import './Dashboard.page.css';
import useAuthContext from '../../hooks/useAuthContext';
import useNotification from '../../hooks/useNotification';

function DashboardPage({setSelfGroups}){

    const [taskReports,setTaskReports] = useState({});
    const [goalReports,setGoalReports] = useState({});

    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();
    const [groups,setGroups] = useState([]);
    // just for temp
    const [userProfile,setUserProfile] = useState(null);
    const [userSummary,setUserSummary] = useState(null);

    
    const [showAddGroup,setShowAddGroup] = useState(false);
    const [deleteConfirmation,setDeleteConfirmation] = useState(false);
    const [deleteConfirmed,setDeleteConfirmed] = useState(false);
    const [groupToDelete,setGroupToDelete] = useState(null);
    const [monthlyReport,setMonthlyReport] = useState(null);

    const {user} = useAuthContext();

    const axiosInstance = useAxios();
    const createNotification = useNotification();
    
    async function getGroups(){
        try{
            const res = await axiosInstance.get(endpoints.getGroups);
            setGroups(prev => (res.data.groups))
            setSelfGroups(res.data.groups)
        }catch(err){
            console.log('error',err);
        }
    }

    async function getProfile(){
        try{
            const res = await axiosInstance.get(endpoints.getProfile);
            setUserProfile(prev => (res.data.data))
        }catch(err){
            console.log('error',err);
        }
    }

    async function deleteGroup(e){
        e.stopPropagation();
        const groupId = e.target.getAttribute('groupid');
        console.log('groupid',groupId)
        setGroupToDelete(groupId);
        setDeleteConfirmation(true);
    }
    
    async function getUserHistory(){
        try{
            const res = await axiosInstance.get(`${endpoints.getUserHistory}`);
            console.log('user summary = ',res.data,res.data.numOfGroupCreated);

            let data = {
                groups_joined : res.data["numOfGroupJoined"],
                groups_created : res.data["numOfGroupJoined"],
                goals_created : 0,
                goals_completed : 0,
                tasks_created : 0,
                tasks_completed : 0
            }

            res.data.history.forEach(group => {
                data["goals_created"] += group.goalCreated;
                data["goals_completed"] += group.goalCompleted;
                data["tasks_created"] += group.taskCreated;
                data["tasks_completed"] += group.taskCompleted;
            })  
            setUserSummary(prev => (data))
        }catch(err){
            console.log('error',err);
        }
    }

    async function getMonthlyReport(){
        console.log('getting monthly report')
        let taskReports = [];
        let goalReports = [];
        try{
            let res;
            groups.forEach(async group => {
                res = await axiosInstance.get(`${endpoints.getMonthlyReportUser}/${group._id}`);
                // taskReports = [...taskReports,res.data.taskReport];
                // goalReports = [...goalReports,res.data.goalReport]
                console.log('report=',res)
                let tasks = res.data.taskReport;
                let goals = res.data.goalReport;

                // setTaskReports(prev => {
                    // tasks = {
                    //     "Dec" : [],
                    //     "jan" : []
                    // }
                    // taskReport = {
                        // "dec" : ["","","",""]
                    // }
                    // taskRepor["dec"]
                    Object.keys(tasks).forEach((key,index) => {
                        let keyReport = []
                        setTaskReports(prev => {
                            if(prev){
                                if(prev[key]){
                                    return{
                                        ...prev,
                                        [key] : [...prev[key],...tasks[key]]
                                    }
                                }

                            }
                            return {
                                [key] : tasks[key]
                            }
                        })
                    })
                    Object.keys(goals).forEach((key,index) => {
                        let keyReport = []
                        setGoalReports(prev => {
                            if(prev){
                                if(prev[key]){
                                    return{
                                        ...prev,
                                        [key] : [...prev[key],...goals[key]]
                                    }
                                }
                            }
                            return {
                                [key] : goals[key]
                            }
                        })
                    })
                    
                // })
            })
            // setMonthlyReport(prev => (data))
        }catch(err){
            console.log('error',err);

        }
    }

    console.log('taskReport = ',taskReports,goalReports)

    useEffect(() => {
        console.log('inside dashboard page')
        getGroups();
        getProfile();
        getUserHistory();
       
        setLoading(false);
    },[])


    useEffect(() => {
        if(groups){
            getMonthlyReport();
        }
    },[groups])

    // useEffect(() => {
    //     if(goalReports){
    //         Object.keys(goalReports).forEach((key,index) => {
    //             let count = 0;
    //             goalReports[key].forEach(goal => {
    //                 if(goal.goal_is_completed) count++;
    //             })
    //             setUserSummary(prev => ({
    //                 ...prev,
    //                 [key] : {
    //                     created : goalReports[key].length,
    //                     completed : count
    //                 }
    //             }))
    //         })
    //     }
    // },[goalReports])

    useEffect(() => {
        if(deleteConfirmed){
            axiosInstance.delete(`${endpoints.deleteGroup}/${groupToDelete}/delete`)
                .then(res => {
                    getGroups();
                    setDeleteConfirmation(false);
                    setDeleteConfirmed(false);
                    setGroupToDelete(null);
                    createNotification('success','deleted group','group is deleted successfully',10000);
                })
                .catch(err => {
                    createNotification('danger','failed deleting group','error occured while deleting ',5000)
                })
        }
    },[deleteConfirmed,groupToDelete])

    if(loading) return "loading..."

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
                        end
                        className = {(navData) => navData.isActive ? "active" : "" }

                    >
                        <Icon icon = "ic:outline-dashboard" /> dashboard
                    </NavLink>
                    {/* <NavLink 
                        to = "/dashboard/activity"
                        end
                        className = {(navData) => {
                            return navData.isActive ? "active" : "" 
                        }}
                    >
                       <Icon icon = "fluent:shifts-activity-20-filled" /> activity
                    </NavLink> */}
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
                                    key = {group._id}
                                >
                                    <span className="hashtag">
                                        #
                                    </span>
                                    {group.name}
                                    {
                                        group.user == user.id 
                                        && <span 
                                            className="deleteBtn"
                                            onClick = {deleteGroup}
                                            groupid = {group._id}
                                        >
                                                <Icon icon = "fluent-emoji-flat:cross-mark" />
                                            </span>
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <hr />
                <div className="others">
                    <NavLink 
                        to = "/logout"
                        className = "logout"
                    >
                        <Icon icon = "majesticons:logout-line" /> Logout
                    </NavLink>
                </div>
            </SidebarLeft>
            <Routes>
                <Route path = "/" element = {<Dashboard goalReports = {goalReports} taskReports = {taskReports} monthlyReport = {monthlyReport} userSummary={userSummary} className = "dashboard-center"/>}/>
                {/* <Route path = "/activity" element = {<PersonalActivity className = "dashboard-center"/>}/> */}
            </Routes>
            <SidebarRight>
                {
                    userProfile &&
                       <Profile userProfile = {userProfile} getProfile = {getProfile}/>                     
                }
            </SidebarRight>
            {
                showAddGroup &&
                <SideModal
                    height = "auto"
                    toggle = {() => setShowAddGroup(prev => !prev)}
                >
                    <CreateGroup 
                        setGroups = {setGroups}
                        toggle = {() => setShowAddGroup(prev => !prev)}
                        getUserHistory = {getUserHistory}
                        getMonthlyReport = {getMonthlyReport}
                    />
                </SideModal>
            }
            {
                deleteConfirmation &&
                <SideModal
                    toggle = {() => setDeleteConfirmation(prev => !prev)}
                    height = "auto"
                >
                    <form action="" className = "confirmDeleteForm" onSubmit = {(e) => e.preventDefault()}>
                        <h2>Confirm delete!</h2>
                        <p>
                            Are you sure you want to delete this group?
                        </p>
                        <div className="grid-btns">
                            <button
                                className='canceldelete'
                                onClick = {() => setDeleteConfirmation(prev => !prev)}
                            >
                                cancel
                            </button>
                            <button
                                className='confirmdelete'
                                onClick = {() => setDeleteConfirmed(true)}
                            >
                                confirm
                            </button>
                        </div>
                    </form>
                </SideModal>
            }
        </div>
    )
}

export default DashboardPage;