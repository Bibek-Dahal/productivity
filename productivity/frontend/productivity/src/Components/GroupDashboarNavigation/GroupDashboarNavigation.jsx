import React,{
    useState
} from 'react';
import './GroupDashboarNavigation.css';

import {
    Logo
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
                                            <span className='hashtag'>#</span> Database Management System 
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to = "/group/ux-design-learn">
                                            <span className='hashtag'>#</span> Differential math
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to = "/group/react-fun-parts">
                                            <span className='hashtag'>#</span> Numerical methods
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to = "/group/exam-preparation">
                                            <span className='hashtag'>#</span> Computer Networking
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to = "/group/exam-preparation"
                                            title ="database management system"
                                        >
                                            <span className='hashtag'>#</span> Database Management System 
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to = "/group/ux-design-learn">
                                            <span className='hashtag'>#</span> Differential math
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to = "/group/react-fun-parts">
                                            <span className='hashtag'>#</span> Numerical methods
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to = "/group/exam-preparation">
                                            <span className='hashtag'>#</span> Computer Networking
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to = "/group/exam-preparation"
                                            title ="database management system"
                                        >
                                            <span className='hashtag'>#</span> Database Management System 
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to = "/group/ux-design-learn">
                                            <span className='hashtag'>#</span> Differential math
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to = "/group/react-fun-parts">
                                            <span className='hashtag'>#</span> Numerical methods
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to = "/group/exam-preparation">
                                            <span className='hashtag'>#</span> Computer Networking
                                        </Link>
                                    </li>
                                </ul>
                            }
                            <div 
                                className="add-group"
                                onClick = {openProjectAddHandler}
                            >
                                <Icon 
                                    icon = "akar-icons:circle-plus-fill"
                                />
                            </div>
                        </Dropdown>
                    <div className="hr"></div>
            </div>
        </div>

 );
}

export default GroupDashboarNavigation;

