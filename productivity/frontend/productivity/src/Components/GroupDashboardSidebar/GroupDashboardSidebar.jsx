import React,{
    useEffect,
    useState
} from 'react';
import './GroupDashboardSidebar.css';

import {
    Link
} from 'react-router-dom';
import Tooltip from '../Tooltip/Tooltip';
import { useAxios } from '../../hooks';
import endpoints from '../../utils/endpoints';
import UserInfoSide from '../UserInfoSide/UserInfoSide';

const GroupDashboardSidebar = ({group}) =>{
    
    const [arr,setarr] = useState([]);
    const [members,setMembers] = useState([]);
    const [admin,setAdmin] = useState({});

    const axiosInstance = useAxios();
    
    const getMembers = () => {
        group?.members?.forEach(member => {
            setMembers(prev => {
                return[
                    ...prev,
                    member
                ]
            })
        })
    }

    const getAdmin = async () => {
        try{   
            const res = await axiosInstance.get(endpoints.getProfile);
            console.log(res);
            setAdmin(res.data.data);
        }catch(err){
            console.log(err);
        }
    }

   
    useEffect( () => {
        getMembers();
        getAdmin();
    },[group])

    return(
        <div className = 'groupdashboardsidebar'>
            <ul>
                {/* {
                group &&
                    group.members?.map(member => (
                        <li>
                            {member}
                        </li>
                    ))
                } */}
            </ul>
            <UserInfoSide />
            <div className="lists">
                {
                    admin &&
                        <div className="admin">
                        <p className="title">
                            admin
                        </p>
                        <li>
                            <Link  to = "#">
                                <div className="profile-image circle-medium">
                                    <img src="https://picsum.photos/300" alt="" />
                                </div>
                                <p className="name">
                                    {admin.username}
                                </p>
                            </Link>
                        </li>
                        </div>
                }
                <ul className="members">
                    <p className="title">
                        members
                    </p>
                    {
                        members.length > 0 &&
                        members?.map((member,id) => (
                            <li 
                                className="user-active" 
                                key = {id}
                            >
                                <Link  to = "#">
                                    <div className="profile-image circle-medium">
                                        <img src="https://picsum.photos/300" alt="" />
                                    </div>
                                    <p className="name">
                                        {member}
                                    </p>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>

    );
}

export default GroupDashboardSidebar;

