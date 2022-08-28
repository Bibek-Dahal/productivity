import React,{
    useState
} from 'react';
import './GroupDashboarNavigation.css';

import {
    Logo,
    Tooltip
} from '../index';

import {
    Link,
    NavLink
} from 'react-router-dom';

import { Icon } from '@iconify/react';
import Dropdown from '../Dropdown/Dropdown';


const GroupDashboarNavigation = ({tasks,toggle,groupId}) =>{

    const openProjectAddHandler = () => {
        toggle();
    }

    return(
        <div className = 'groupdashboarnavigation mainnavigation'>
            <Logo />
            <div className="links">

                    <NavLink 
                        to = {`/group/${groupId}/`}
                        activeClassName = 'active'
                    >
                        <Icon icon = "akar-icons:home" />
                        dashboard
                    </NavLink>
                    <div className="hr"></div>
                    <Dropdown 
                        title = "Tasks"
                    >
                        { 
                            // tasks.length === 0 ?
                            // <span className="error">
                            //     No task created yet!
                            // </span>:
                            <ul className="dropdown-items">
                                <li>
                                    <Link 
                                        to = "/group/exam-preparation"
                                        title ="database management system"
                                    >
                                        <span className='hashtag'>
                                                # </span>
                                        <p className='text'>
                                            Database management system
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                        }
                        <Tooltip
                            className = "add-group"
                            text = "add task"
                        >
                            <div 
                                onClick = {openProjectAddHandler}
                            >
                                <Icon 
                                    icon = "akar-icons:circle-plus-fill"
                                />
                            </div>
                        </Tooltip>
                    </Dropdown>
                    <div className="hr"></div>
            </div>
        </div>

 );
}

export default GroupDashboarNavigation;

