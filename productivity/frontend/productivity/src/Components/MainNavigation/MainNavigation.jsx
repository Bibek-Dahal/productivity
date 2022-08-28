import React,{
    useState
} from 'react';
import './MainNavigation.css';

import { 
    Link,
    NavLink
} from 'react-router-dom';

import { Icon } from '@iconify/react';
import {
    Dropdown,
    Modal,
    Button1,
    Logo,
    Tooltip
} from '../index';
import { useEffect } from 'react';

import endpoints from '../../utils/endpoints';
import {
    useAxios 
} from '../../hooks/index';
import DropdownSkeleton from '../../Skeletons/DropdownSkeleton/DropdownSkeleton';


const MainNavigation = ({toggle,groups,groupLoading}) =>{

    const axiosInstance = useAxios();

    const [addGroup,setAddGroup] = useState(false);

    const openGroupAddHandler = () => {
        toggle();
    }

    // const showCustomContext = (e) => {
    //     e.preventDefault();
    //     console.log(e.target);
    //     console.log(e.target.getAttribute('group_id'))
    // }

    const deleteGroup = (e) => {

    }

    return(
        <div className = 'mainnavigation'>
            <Logo />
            <div className="links">
                <NavLink 
                    to = "/dashboard"
                    activeClassName = 'active'
                >
                    <Icon icon = "akar-icons:home" />
                    dashboard
                </NavLink>
                <NavLink 
                    to = "/activity"
                    activeClassName = 'is-active'
                >
                    <Icon icon = "akar-icons:schedule" />
                    activity
                </NavLink>
                <div className="hr"></div>
                    <Dropdown
                        title = "Groups"
                    >
                        {   
                            groupLoading ?
                            <DropdownSkeleton />:
                            <>
                            {
                                groups.length === 0 ?
                                <span className="error">
                                    No groups joined or created yet!
                                </span>:
                                <ul className="dropdown-items">
                                    {
                                        groups.map(group => (
                                            <li 
                                                // onContextMenu={showCustomContext}
                                            >
                                                <Link 
                                                    to = {`/group/${group._id}/`}
                                                >
                                                    <span className='hashtag'>
                                                    # </span>
                                                    <p className='text'>
                                                        {group.name}
                                                    </p>
                                                   <Tooltip
                                                        text = "delete group"                                                   
                                                        className='cross'
                                                   >
                                                    <span 
                                                            onClick = {deleteGroup}
                                                            group_id = {group._id}
                                                        >
                                                            <Icon  icon = "maki:cross" />
                                                        </span>
                                                   </Tooltip>
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            }
                            </>
                        }
                        <Tooltip 
                            text = "create group"
                            className="add-group"
                        >
                            <div 
                                onClick = {openGroupAddHandler}
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
                background = "var(--red)"
                className = "bgred"
            >
                <Link to = "/logout">Logout</Link>
            </Button1>
        </div>

    );
}

export default MainNavigation;

