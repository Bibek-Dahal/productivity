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

function ProjectDetail({groupId,className}){

    const [editTask,setEditTask] = useState(false);
    const [editGoal,setEditGoal] = useState({});

    const [goalToDelete,setGoalToDelete] = useState(null);
    const [showDeleteGoalConfirm,setShowDeleteGoalConfirm] = useState(false);
    const [deleteGoalConfirmed,setDeleteGoalConfirmed] = useState(false);

    const [showAddGoal,setShowAddGoal] = useState(false);

    const [taskData,setTaskData] = useState({
        task_title : "",
        task_description : "",
        task_created_at : "",
        task_deadline : "",
        task_is_completed : null
    })

    const [goals,setGoals] = useState([])

    const {user} = useAuthContext();

    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const {projectId} = useParams();

    function getTask(){
        axiosInstance.get(`${endpoints.getTaskDetail}/${groupId}/${projectId}`)
            .then(res => {
                console.log('project = ',res);
                setTaskData(res.data.task);
                setGoals(res.data.task.task_goals)
            })
            .catch(err => {
                console.log('err',err)
            })
    }

    function onChangeHandler(e){
        console.log('changin',e.target)
        if(e.target.type == "checkbox"){
            setTaskData(prev => (
                {
                    ...prev,
                    [e.target.name] : !prev[e.target.name]
                }
            ))
        }else{
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
        console.log('deleting project')
    }

    const submitTask = (e) => {
        e.preventDefault();
        console.log('submitting',taskData)
        // axiosInstance.put(`${endpoints.updateTask}/${groupId}/${projectId}`)
        //     .then(res => {
        //         console.log('res = '.res);
        //     })
        //     .catch(err => {
        //         console.log('err = ',err);
        //     })
    }

    const submitGoal = (e) => {
        e.preventDefault();
        console.log('submitting',)
    }

    const deleteGoal = (e) => {
        e.stopPropagation();
        setGoalToDelete(e.target.getAttribute('id'));
        setShowDeleteGoalConfirm(true);
    }

    useEffect(() => {
        
    },[])

    useEffect(() => {
        if(groupId){
            getTask();
        }
    },[projectId,groupId])

    useEffect(() => {
        if(deleteGoalConfirmed){
            console.log('deleting goal ',goalToDelete);
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
                    >
                        <Icon 
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
                    {
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
                }
                    
                </div>
                <form 
                    action="" 
                    className="project-form "
                    onSubmit={submitTask}
                >
                    <TextInput 
                        label = "title"
                        value = {taskData.task_title}
                        onChange = {onChangeHandler}
                        size = "md"
                    />
                    <TextInput 
                        label = "description"
                        value = {taskData.task_description}
                        onChange = {onChangeHandler}
                        size = "md"
                    />
                    <div>
                        <label htmlFor="">Deadline</label>
                        <input
                            onChange = {onChangeHandler} 
                            type = "date" 
                            value = {taskData.task_deadline.substring(0,10)}
                        />
                    </div>
                    <Box >
                        <label htmlFor="">completed Task</label>
                        <Checkbox 
                            value = {taskData.task_is_completed}
                            onChange = {onChangeHandler}
                            name = "task_is_completed"
                        />
                    </Box>
                    <Box>
                        <Button
                            type = "submit" 
                            size = "md"
                        >
                            Update
                        </Button>
                    </Box>
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
                                        2022-02-22
                                    </span>
                                </div>
                                <div className="right">
                                    <span className="status">
                                        not completed
                                    </span>
                                    <span className="deadline">
                                        2022-02-22
                                    </span>
                                </div>
                                {
                                    taskData.task_user == user.id &&
                                    <div className="action-btns">
                                        <button
                                            className='delete'
                                            onClick = {deleteGoal}
                                            id = "123123"
                                        >
                                            <Icon icon = "ri:delete-bin-5-line"/>
                                        </button>
                                        <button
                                            className='edit'
                                        >
                                            <Icon icon = "clarity:edit-line"/>
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
                        setGoals = {setGoals}
                    />
                    {/* get task will be called when goal is added */}
                </SideModal>
            }
        </div>
    )
}

export default ProjectDetail;