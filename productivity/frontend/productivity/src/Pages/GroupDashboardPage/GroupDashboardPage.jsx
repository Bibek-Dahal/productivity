import React,{
    useState
} from 'react';
import './GroupDashboardPage.css';
import {
    useParams,
    Outlet
} from 'react-router-dom';
import { 
    Sidebarleft,
    Sidebarright,
    GroupDashboardNavigation, 
    GroupDashboardSidebar,
    Modal,
    AddProject
} from '../../Components';

const GroupDashboardPage = () =>{

    const [showAddProject,setShowAddProject] = useState(false);

    function toggle(){
        setShowAddProject(prev => !prev);
    }

    const {name} = useParams();
    
    return(
        <div className = 'groupdashboardpage'>
            <div className="dashboardpage__container">
                <Sidebarleft>
                    <GroupDashboardNavigation 
                        toggle = {toggle}
                    />
                </Sidebarleft>
                <Outlet />
                <Sidebarright>
                    <GroupDashboardSidebar />
                </Sidebarright>
            </div>
            {
                showAddProject &&
                <Modal
                    className = "visible padding-dribble"
                >
                    <AddProject />
                </Modal>
            }
        </div>
    );
}

export default GroupDashboardPage;

