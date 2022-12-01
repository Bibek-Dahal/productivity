import { Icon } from '@iconify/react';
import React,{
    useState
} from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import endpoints from '../../utils/endpoints/otherEndpoints';
import {ConfirmModal,SideModal} from '../shared/';

import useAxios from '../../hooks/useAxios';

import './GroupProject.comp.css';
import useAuthContext from '../../hooks/useAuthContext';
import useNotification from '../../hooks/useNotification';

function GroupProjects({className,group,getGroupDetail}){

    const [projects,setProjects] = useState([]);
    const [filteredResult,setFilteredResult] = useState([]);

    const [confirmDeleteProject,setConfirmDeleteProject] = useState(false);
    const [deleteProjectConfirmed,setDeleteProjectConfirmed] = useState(false);
    const [projectToDelete,setProjectToDelete] = useState(null);

    const axiosInstance = useAxios();
    const createNotification = useNotification();
    
    function deleteProject(e){
        e.stopPropagation();
        setProjectToDelete(e.target.getAttribute('id'));
        setConfirmDeleteProject(true);
    }
    
    const {user} = useAuthContext();

    useEffect(() => {
        if(deleteProjectConfirmed && projectToDelete){
            console.log('deleting project',projectToDelete)
            axiosInstance.delete(`${endpoints.deleteTask}/${group._id}/${projectToDelete}`)
                .then(res => {
                    console.log('res',res);
                    createNotification('success','deleted','Project deleted successfully!',5000);
                    setProjectToDelete(null);
                    setConfirmDeleteProject(false);
                    setDeleteProjectConfirmed(false);
                    getGroupDetail();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },[deleteProjectConfirmed,projectToDelete])

    function filterProjects(e){
        console.log('filtering',e.target.value)
    }

    const navigate = useNavigate();

    useEffect(() => {
       if(group){
            setProjects(group.task)
       }
    },[group])

    return(
        <div className = {`${className ? className : ""} groupProjects`}>
            <h1>
                Projects
            </h1>
            <div className="filter-input-container">
                {/* <form action="" onSubmit = {filterProjects}> */}
                    {/* <input 
                        type="text" 
                        onChange={filterProjects}
                        placeholder = "enter project name"
                    /> */}
                {/* </form> */}
            </div>
            <div className="filter-result-container">
                {
                    projects?.length < 1 &&
                    <h3
                        style = {{
                            textAlign : "center"
                        }}
                    >
                        No tasks created yet
                    </h3>
                }
                    {
                        projects?.map(project => (
                            <div 
                                onClick = {() => navigate(`${window.location.pathname}/${project._id}`)}
                                key = {project._id}
                                className="project">
                                <div className="project__left">
                                    <span className="project__left__top">
                                        <span className='title'>
                                            {project.task_title}
                                        </span>
                                        <span className="date">
                                            2022-11-11
                                        </span>
                                    </span>
                                    <span className="project__left__bottom">
                                        <span className="description">
                                            {project.task_description}
                                        </span>
                                    </span>
                                </div>
                               {
                                project?.task_user._id == user.id &&
                                 <div className="project__right">
                                    <button
                                        className='delete'
                                        onClick = {deleteProject}
                                        id = {project._id}
                                    >
                                        <Icon icon = "ri:delete-bin-5-line"/>
                                    </button>
                                    <button
                                        className='edit'
                                        id = {project._id}
                                    >
                                        <Icon icon = "clarity:edit-line"/>
                                    </button>
                                </div>
                               }
                            </div>
                        ))
                    }

                    
                </div>
                {
                    confirmDeleteProject &&
                   <SideModal
                    toggle = {() => setConfirmDeleteProject(prev => !prev)}
                   >
                        <ConfirmModal 
                            setConfirmation={setConfirmDeleteProject}
                            setConfirm = {setDeleteProjectConfirmed}
                        />
                   </SideModal>
                }
        </div>
    )
}

export default GroupProjects;