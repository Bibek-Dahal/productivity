import React,{
    useState
} from 'react';
import './GroupDashboarNavigation.css';
import {
    Logo,
    Tooltip,
    Button1
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
                        // className = {`${(navData) => (navData.isActive ? "active" : "")}`}
                    >
                        <Icon icon = "akar-icons:home" />
                        dashboard
                    </NavLink>
                    <div className="hr"></div>
                    <Dropdown 
                        title = "Tasks"
                    >
                        { 
                            tasks.length === 0 ?
                            <span className="error">
                                No task created yet!
                            </span>:
                            <ul className="dropdown-items customScrollbar">
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
            <Button1
                background = "var(--black)"
                // className = "bgred"
            >
                <Link to = "#">Go back</Link>
            </Button1>
        </div>

 );
}

export default GroupDashboarNavigation;

