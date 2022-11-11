import { Icon } from '@iconify/react';
import React,{
    useState
} from 'react';
import { useEffect } from 'react';

import './GroupProject.comp.css';

function GroupProjects({className,group}){

    const [projects,setProjects] = useState([]);

    function filterProjects(){
        
    }


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
                    <input 
                        type="text" 
                        onChange={filterProjects}
                        placeholder = "enter project name"
                    />
                {/* </form> */}
            </div>
            <div className="filter-result-container">
                    {
                        projects?.map(project => (
                            <div 
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
                                <div className="project__right">
                                    <button
                                        className='delete'
                                    >
                                        <Icon icon = "ri:delete-bin-5-line"/>
                                    </button>
                                    <button
                                        className='edit'
                                    >
                                        <Icon icon = "clarity:edit-line"/>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
        </div>
    )
}

export default GroupProjects;