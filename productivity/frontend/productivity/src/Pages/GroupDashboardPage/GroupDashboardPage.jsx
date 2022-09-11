import React,{
    useEffect,
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
import endpoints from '../../utils/endpoints';

import{
    useAxios
} from '../../hooks/index';

const GroupDashboardPage = () =>{
    const axiosInstance = useAxios();
    
    const [showAddProject,setShowAddProject] = useState(false);
    const [tasks,setTasks] = useState([]);

    const [group,setGroup] = useState({});
    const [gettingGroup,setGettingGroup] = useState(true);

    function toggle(){
        setShowAddProject(prev => !prev);
    }

    const {id} = useParams();

    async function getGroupDetail(){
        try{
            setGettingGroup(false);
            const res = await axiosInstance.get(`${endpoints.getGroupDetail}/${id}/retrive`);
            console.log(res);
            setGroup(res.data.group);
        }catch(err){
            setGettingGroup(false);
            console.log('err',err);
        }
    }

    useEffect(() => {
        getGroupDetail();
    },[])

    return(
        <div className = 'groupdashboardpage'>
            <div className="dashboardpage__container">
                <Sidebarleft>
                    <GroupDashboardNavigation 
                        toggle = {toggle}
                        tasks = {tasks}
                        groupId = {id}
                    />
                </Sidebarleft>
                <Outlet 
                    context = {{
                        groupId : id,
                        group : group
                    }}
                />
                <Sidebarright>
                    <GroupDashboardSidebar 
                        group = {group}
                    />
                </Sidebarright>
            </div>
            {
                showAddProject &&
                <Modal
                    className = "visible padding-dribble"
                    toggle = {toggle}
                >
                    <AddProject 
                        toggle = {toggle}
                    />
                </Modal>
            }
        </div>
    );
}

export default GroupDashboardPage;

