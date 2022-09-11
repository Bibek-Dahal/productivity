import React,{
    useState,
    useContext,
    useEffect
} from 'react';
import './GroupDashboard.css';

import { Icon } from '@iconify/react';

import {
    useParams,
    useOutletContext
} from 'react-router-dom';
import { 
    GroupDashboardNavigation,
    InvitePeople,
    Modal
} from '..';

const GroupDashboard = () =>{
    const {groupId,group} = useOutletContext();
    const [showInvitePeople,setShowInvitePeople] = useState(false);
    
    console.log('inside groupdashboard ', group)

    return(
        <>
            <div className = 'groupdashboard'>
                <div className="top">
                    <h2 className="groupTitle">
                        <span className="hashtag">
                            #
                        </span>
                        <span>
                            {group.name}
                        </span>
                    </h2>
                    <div className="action-btns">
                        <Icon 
                            icon = "carbon:face-add" 
                            onClick = {() => setShowInvitePeople(true)}
                        />
                    </div>
                </div>
            </div>
            {
                showInvitePeople &&
                <Modal 
                    className = "visible padding-dribble"
                >
                    <InvitePeople 
                        setShowInvitePeople = {setShowInvitePeople}
                        groupId = {groupId}
                        group = {group}
                    />
                </Modal>
            }
        </>
    );
}




export default GroupDashboard;

