import React, { useEffect,useState } from 'react';

import {
    useParams,
    useNavigate
} from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import endpoints from '../../utils/endpoints/otherEndpoints';
import {Icon} from '@iconify/react';

import {
    CreateGoal
} from '../';

import {
    ConfirmModal,
    SideModal,
    ToggleEditInput
} from '../shared/'

import {
    TextInput,
    Button
} from '@mantine/core';

import {
    DatePicker
} from '@mantine/dates';

import './ProjectDetail.comp.css';
import useAuthContext from '../../hooks/useAuthContext';
import { Checkbox } from '@mui/material';
import { Box } from '@mui/system';

import useNotification from '../../hooks/useNotification';

function ProjectDetail({groupId,className,getGroupDetail}){

    const [editTask,setEditTask] = useState(false);
    const [editGoal,setEditGoal] = useState({});

    const [goalToDelete,setGoalToDelete] = useState(null);
    const [showDeleteGoalConfirm,setShowDeleteGoalConfirm] = useState(false);
    const [deleteGoalConfirmed,setDeleteGoalConfirmed] = useState(false);

    const [showDeleteProjectConfirmation,setShowDeleteProjectConfirmation] = useState(false);
    const [deleteProjectConfirmed,setDeleteProjectConfirmed] = useState(false);
    const [projectToDelete,setProjectToDelete] = useState(null);

    const [showAddGoal,setShowAddGoal] = useState(false);

    const createNotification = useNotification();

    const [taskData,setTaskData] = useState({
        task_title : "",
        task_description : "",
        task_created_at : "",
        task_deadline : "",
        task_is_completed : undefined
    })

    // console.log(taskData)

    const [goals,setGoals] = useState([])

    const {user} = useAuthContext();

    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const {projectId} = useParams();

    function getTask(){
        axiosInstance.get(`${endpoints.getTaskDetail}/${groupId}/${projectId}`)
            .then(res => {
                console.log('project = ',res);
                console.log(res.data.task.task_user,user.id)
                if(res.data.task.task_user == user.id) setEditTask(true);
                setTaskData(res.data.task);
                setGoals(res.data.task.task_goals)
            })
            .catch(err => {
                console.log('err',err)
            })
    }

    function onChangeHandler(e){
        if(e.target.type == "checkbox"){
            console.log('changin',e.target.checked)
            setTaskData(prev => (
                {
                    ...prev,
                    [e.target.name] : e.target.checked
                }
            ))
        }else{
            console.log('changing to',e.target.value)
            setTaskData(prev => (
                {
                    ...prev,
                    [e.target.name] : e.target.value
                }
            ))
        }
    }

    const editProject = (e) => {
        console.log('editing project')
        setEditTask(prev => !prev);
    }

    const deleteProject = (e) => {
        console.log('deleting project',e.target.getAttribute('projectid'));
        setProjectToDelete(e.target.getAttribute('projectid'))
        setShowDeleteProjectConfirmation(true)
    }

    const submitTask = (e) => {
        e.preventDefault();
        console.log('submitting',taskData)
        axiosInstance.put(`${endpoints.updateTask}/${groupId}/${projectId}`,{
            task_title : taskData.task_title,
            task_description : taskData.task_description,
            task_deadline : taskData.task_deadline,
            task_is_completed : taskData.task_is_completed
        })
            .then(res => {
                console.log('res = ',res);
                console.log('updated successfully')
                createNotification("success","updated","updated task successfully",5000);
            })
            .catch(err => {
                console.log('err = ',err);
            })
    }

    const submitGoal = (e) => {
        e.preventDefault();
        console.log('submitting',taskData)
    }

    const deleteGoal = (e) => {
        e.stopPropagation();
        console.log('deleting goal',e.target.getAttribute('id'))
        setGoalToDelete(e.target.getAttribute('id'));
        setShowDeleteGoalConfirm(true);
    }

    const markCompleted = (e) => {
        axiosInstance.put(`${endpoints.updateGoal}/${groupId}/${taskData._id}/${e.target.getAttribute('id')}`,{
            goals_is_completed : true
        })
            .then(res => {
                console.log(res);
                getTask();
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        if(deleteProjectConfirmed && goalToDelete){
            axiosInstance.delete(`${endpoints.deleteProject}/${groupId}/${goalToDelete}`)
                .then(res => {
                    console.log('deleted',res)
                    createNotification("success","deleted project","project deleted successfully",5000);
                    getGroupDetail();
                    navigate(-1);
                })
                .catch(err => {
                    console.log('err = ',err)
                })
            setShowDeleteProjectConfirmation(false);
            setDeleteProjectConfirmed(false);
        }
    },[deleteProjectConfirmed])

    useEffect(() => {
        if(groupId){
            getTask();
        }
    },[projectId,groupId])

    useEffect(() => {
        if(deleteGoalConfirmed){
            console.log('deleting goal ',goalToDelete);
            axiosInstance.delete(`${endpoints.deleteGoal}/${groupId}/${taskData._id}/${goalToDelete}`)
                .then(res => {
                    console.log('deleted',res)
                })
                .catch(err => {
                    console.log('err = ',err)
                })
            setShowDeleteGoalConfirm(false);
            setDeleteGoalConfirmed(false);
        }
    },[deleteGoalConfirmed])

    return(
        <div className={`${className ? className : ""} project-detail-container`}>
            <div className="header">
                <span 
                    className="goback"
                    onClick = {() => navigate(-1)}
                >
                    <Icon 
                        icon = "akar-icons:arrow-left"
                    />
                </span>
                {
                    taskData.task_user == user.id &&
                    <span 
                        className="delete"
                        onClick = {deleteProject}
                        projectId = {taskData._id}
                    >
                        <Icon 
                            style = {{
                                pointerEvents : "none"
                            }}
                            icon = "ri:delete-bin-5-line"
                    />
                    </span>
                }
            </div>
            <div className="content">
                <div className="content__header">
                    <h2>
                        Project - {taskData.task_title}
                    </h2>
                    {/* {
                    taskData.task_user == user.id &&

                    <span 
                        className="edit"
                        onClick = {editProject}
                    >
                        {
                            !editTask ?
                                <Icon 
                                    icon = "heroicons:pencil-square"
                                />:
                                <Icon 
                                    icon = "material-symbols:cancel-outline"
                                />
                        }
                    </span>
                } */}
                    
                </div>
                <form 
                    action="" 
                    className="project-form "
                    onSubmit={submitTask}
                >
                    <TextInput 
                        label = "task_title"
                        value = {taskData.task_title}
                        onChange = {onChangeHandler}
                        size = "md"
                        name = "task_title"
                        disabled = {!editTask}
                    />
                    <TextInput 
                        label = "task_description"
                        value = {taskData.task_description}
                        onChange = {onChangeHandler}
                        size = "md"
                        name = "task_description"
                        disabled = {!editTask}
                    />
                    <div>
                        <label htmlFor="">Deadline</label>
                        <input
                            onChange = {onChangeHandler} 
                            type = "date" 
                            name = "task_deadline"
                            value = {taskData.task_deadline.substring(0,10)}
                            disabled = {!editTask}
                        />
                    </div>
                    {
                        console.log(taskData.task_is_completed)
                    }
                    <Box 
                        style = {{
                        }}
                    >
                        <label htmlFor="">completed Task</label>
                        <input type="checkbox"
                            checked = {taskData.task_is_completed}
                            onChange = {onChangeHandler}
                            name = "task_is_completed"
                            style = {{
                                height : "25px",
                                width : "25px"
                            }}
                            disabled = {!editTask}
                        />
                    </Box>
                    {
                        editTask &&
                        <Box>
                            <Button
                                type = "submit" 
                                size = "md"
                            >
                                Update
                            </Button>
                        </Box>
                    }
                </form>
                {/* <hr /> */}
                <div className="content__header">
                    <h2>
                        Goals
                    </h2>
                    {
                        console.log(taskData,user)
                    }
                    {
                        taskData.task_user == user.id &&
                            <div 
                                className="add-goal"
                                onClick = {() => setShowAddGoal(true)}
                            >
                                <Icon icon = "carbon:add-alt" />
                            </div>
                    }
                </div>
                <div className="goals">
                    {
                        goals.length < 1 &&
                        <h2
                            style = {{
                                textAlign : "center",
                                marginTop : "2em"
                            }}
                        >
                            No goals created yet!
                        </h2>
                    }
                    {
                        goals.length > 0 &&
                        goals.map(goal => (
                            <div 
                                className={`${goal.goal_is_completed ? "complete" : ""} goal`}
                                key = {goal._id}    
                            >
                                <div className='left'>
                                    <span className="title">
                                        {goal.goals_title}
                                    </span>
                                    <span className="description">
                                        {goal.goals_description}
                                    </span>
                                    <span className="created_at">
                                        {goal?.goals_created_at?.substring(0,10)}
                                    </span>
                                </div>
                                <div className="right">
                                    <span className="status">
                                        not completed
                                    </span>
                                    <span className="deadline">
                                        {goal?.goals_deadline?.substring(0,10)}
                                    </span>
                                </div>
                                {
                                    taskData.task_user == user.id &&
                                    <div className="action-btns">
                                        <button
                                            className='delete'
                                            onClick = {deleteGoal}
                                            id = {goal._id}
                                        >
                                            <Icon icon = "ri:delete-bin-5-line"/>
                                        </button>
                                        {/* <button
                                            className='edit'
                                        >
                                            <Icon icon = "clarity:edit-line"/>
                                        </button> */}
                                        <button
                                            style = {{
                                                background : "green"
                                            }}
                                            onClick = {markCompleted}
                                            id = {goal._id}
                                        >
                                            <Icon style = {{
                                                color:"white",
                                                pointerEvents : "none"
                                            }}icon = "mdi:clipboard-tick" />
                                        </button>
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                showDeleteGoalConfirm &&
                <SideModal
                    toggle = {() => setShowDeleteGoalConfirm(prev => !prev)}
                >
                    <ConfirmModal 
                        setConfirmation = {setShowDeleteGoalConfirm}
                        setConfirm = {setDeleteGoalConfirmed}
                    />
                </SideModal>
            }
            {
                showAddGoal &&
                <SideModal
                    toggle = {() => setShowAddGoal(prev => !prev)}
                >
                    <CreateGoal 
                        toggle = {() => setShowAddGoal(prev => !prev)}
                        // setGoals = {setGoals}
                        getTask = {getTask}
                        groupId = {groupId}
                        taskId = {taskData?._id}
                        submitCreateGoal = {true}
                    />
                    {/* get task will be called when goal is added */}
                </SideModal>
            }
             {
                showDeleteProjectConfirmation &&
                <SideModal
                    toggle = {() => setShowDeleteProjectConfirmation(prev => !prev)}
                >
                    <ConfirmModal 
                        setConfirmation = {setShowDeleteProjectConfirmation}
                        setConfirm = {setDeleteProjectConfirmed}
                    />
                </SideModal>
            }
        </div>
    )
}

export default ProjectDetail;