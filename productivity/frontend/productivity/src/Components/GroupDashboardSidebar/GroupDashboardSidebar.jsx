import React,{
    useEffect
} from 'react';
import './GroupDashboardSidebar.css';

const GroupDashboardSidebar = ({group}) =>{
  

console.log('rendered groupsidebar',group.members);

    

 return(
     <div className = 'groupdashboardsidebar'>
        GroupDashboardSidebar
        <ul>
            users lists = 
            {
               group &&
                group.members?.map(member => (
                    <li>
                        {member}
                    </li>
                ))
            }
        </ul>
     </div>

 );
}

export default GroupDashboardSidebar;

