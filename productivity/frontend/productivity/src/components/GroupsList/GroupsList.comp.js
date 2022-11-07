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
import baseURL from "../../utils/endpoints/baseURL";
import useAxios from "../../hooks/useAxios";

import {Store} from 'react-notifications-component';

function GroupList({groups,className,setGroups,getGroups}){

    const [loading,setLoading] = useState(true);
    const [showCreateGroup,setShowCreateGroup] = useState(false);
    const [showDeleteGroupConfirm,setShowDeleteGroupConfirm] = useState(false);

    const [groupIdToDelete,setGroupIdToDelete] = useState(null)

    const {user} = useAuthContext();

    const axiosInstance = useAxios();

    const deleteGroup = (id) => {
        console.log('deleting ',id)
        axiosInstance.delete(`${baseURL}/api/group/${id}/delete`)
            .then(res => {
                console.log(res)
                Store.addNotification({
                    title: "Successfull!",
                    message: "Group deleted successfully",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true,
                      pauseOnHover : true
                    }
                });
                getGroups();
            })
            .catch(err => {
                console.log(err)
            })
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
                            <div
                                className = "group group-tooltip"
                                onClick = {() => setShowCreateGroup(true)}
                            >
                                    <div 
                                        className="image"
                                        style = {{
                                            fontSize : 'var(--fs-s) !important'
                                        }}    
                                    >
                                        <Icon 
                                            icon = "carbon:home"
                                        />
                                    </div>
                                    <p className = "group-tooltip-text discord-tooltip">
                                        Home
                                        <span></span>
                                    </p>
                            </div>
                            <hr />
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
                                                        onClick = {(e) => {
                                                            setShowDeleteGroupConfirm(true)
                                                            setGroupIdToDelete(prev => e.target.getAttribute("group_id"))
                                                        }}
                                                        group_id = {group?._id}
                                                        icon = "ep:close-bold"
                                                    />
                                                </div>
                                            }
                                    </div>
                                ))
                            }
                            {
                                groups.length != 0 &&
                                <hr />
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
                        deleteIt = {() => deleteGroup(groupIdToDelete)}
                    />
                </SideModal>
            }
        </div>
    )
}       

export default GroupList;