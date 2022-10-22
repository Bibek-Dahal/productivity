import { useEffect,useState } from "react";
import './GroupList.comp.css';
import {Icon} from '@iconify/react'
import {
    SideModal
} from '../shared/';

import {
    CreateGroup,
    DeleteGroupConfirm
} from '../';
import useAuthContext from "../../hooks/useAuthContext";

function GroupList({groups,className,setGroups,getGroups}){

    const [loading,setLoading] = useState(true);
    const [showCreateGroup,setShowCreateGroup] = useState(false);
    const [showDeleteGroupConfirm,setShowDeleteGroupConfirm] = useState(true);

    const [groupIdToDelete,setGroupIdToDelete] = useState(null);

    const {user} = useAuthContext();

    const deleteGroup = (e) => {
        console.log('deleting ',e.target.getAttribute("group_id"))
        setGroupIdToDelete(e.target.getAttribute("group_id"));
    }

    useEffect(() => {
        console.log('inside group list',groups)
        if(groups) setLoading(false);
    },[groups])  
    
    return(
        <div
            className={
                `
                    grouplist-container
                    ${className ? className : ""}
                `
            }
        >
            {
                !loading ?
                    groups &&
                        <ul className = "grouplist">
                            {
                                groups.map(group => (
                                    <div
                                        key = {group._id}
                                        className = "group group-tooltip">
                                            <div className="image">
                                                {group.name.substring(0,2)}
                                            </div>
                                            <p className = "group-tooltip-text discord-tooltip">
                                                {
                                                    group.name
                                                }
                                                <span></span>
                                            </p>
                                            {
                                                (user.id == group.user) &&
                                                <div  className = "delete-group-icon">
                                                    <Icon 
                                                        onClick = {deleteGroup}
                                                        group_id = {group?._id}
                                                        icon = "ep:close-bold"
                                                    />
                                                </div>
                                            }
                                    </div>
                                ))
                            }
                            <div
                                className = "group group-tooltip"
                                onClick = {() => setShowCreateGroup(true)}
                            >
                                    <div className="image">
                                        <Icon 
                                            icon = "carbon:add"
                                        />
                                    </div>
                                    <p className = "group-tooltip-text discord-tooltip">
                                        create Group
                                        <span></span>
                                    </p>
                            </div>
                        </ul>:
                        "loading..."
            }
            {
                showCreateGroup &&
                <SideModal
                    toggle = {() => setShowCreateGroup(prev => !prev)}
                >
                    <CreateGroup 
                        groups = {groups}
                        toggle = {() => setShowCreateGroup(prev => !prev)}
                        setGroups = {setGroups}
                    />
                </SideModal>
            }
{
                showDeleteGroupConfirm &&
                <SideModal
                    toggle = {() => setShowDeleteGroupConfirm(prev => !prev)}
                >
                    <DeleteGroupConfirm 
                        toggle = {() => setShowDeleteGroupConfirm(prev => !prev)}
                        getGroups = {getGroups}
                    />
                </SideModal>
            }
        </div>
    )
}

export default GroupList;