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
    Tooltip,
    ConfirmDeleteGroup
} from '../index';
import { useEffect } from 'react';

import endpoints from '../../utils/endpoints';
import {
    useAxios 
} from '../../hooks/index';
import DropdownSkeleton from '../../Skeletons/DropdownSkeleton/DropdownSkeleton';


const MainNavigation = ({toggle,groups,groupLoading,setGroups}) =>{
    const axiosInstance = useAxios();

    const [addGroup,setAddGroup] = useState(false);
    const [showConfirmDelete,setShowConfirmDelete] = useState(false);
    const [groupDeleteId,setGroupDeleteId] = useState(null);

    const openGroupAddHandler = () => {
        toggle();
    }

    const linkClickHandler = (e) => {
        console.log(e.target);
    }

    const deleteGroup = (e) => {
        console.log('deleting group',e.target)
        const groupId = e.target.getAttribute('group_id');
        console.log(groupId)
        console.log('setting showconfirmdelete');
        setGroupDeleteId(groupId)
        setShowConfirmDelete(true);
        try{
            // const res = await axiosInstance.delete()
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className = 'mainnavigation'>
            <Logo />
            <div className="links">
                <NavLink 
                    to = "/dashboard"
                    className={(navData) => (navData.isActive ? "active" : '')}
                >
                    <Icon icon = "akar-icons:home" />
                    dashboard
                </NavLink>
                <NavLink 
                    to = "/activity"
                    className={(navData) => (navData.isActive ? "active" : '')}
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
                                <ul className="dropdown-items   customScrollbar">
                                    {
                                        groups.map(group => (
                                            <li 
                                                // onContextMenu={showCustomContext}
                                                key = {group._id}
                                            >
                                                <Link 
                                                    to = {`/group/${group._id}/`}
                                                    onClick = {linkClickHandler}
                                                >
                                                    <span className='hashtag'>
                                                    # </span>
                                                    <p className='text'>
                                                        {group.name}
                                                    </p>
                                                </Link>
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
                <div className="hr2"></div>
            </div>
            <Button1
                background = "var(--red)"
                className = "bgred"
            >
                <Link to = "/logout">Logout</Link>
            </Button1>
           {
            showConfirmDelete &&
                <Modal
                    className="visible padding-dribble"
                >
                        <ConfirmDeleteGroup 
                            toggleModal = {setShowConfirmDelete}
                            setGroups = {setGroups}
                            groupDeleteId = {groupDeleteId}
                            groups = {groups}
                        />
                </Modal>
           }
        </div>

    );
}

export default MainNavigation;

