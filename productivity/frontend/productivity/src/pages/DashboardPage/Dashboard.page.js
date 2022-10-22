import { useEffect,useState } from 'react';
import {
    Route,
    Routes,
    Navigate,
    NavLink
} from 'react-router-dom';

import {
    Dashboard,
    GroupList,
    PersonalActivity
} from '../../components/';
import useAxios from '../../hooks/useAxios';
import baseURL from '../../utils/endpoints/baseURL';
import endpoints from '../../utils/endpoints/otherEndpoints';

import groupsData from '../../utils/groups.json';

import './Dashboard.page.css';

function DashboardPage(){

    const [groups,setGroups] = useState([]);

    const axiosInstance = useAxios();

    const getGroups = async () => {
        try{
            const res = await axiosInstance.get(`${baseURL}${endpoints.getGroups}`);
            console.log('res = ', res);
            const groups = res?.data?.groups;
            if(groups) setGroups(prev => groups);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        // if(groupsData){
        //     setGroups(prev => groupsData);
        // }
        getGroups();
    },[])

    return(
       <div
        className = "dashboard-container with-mini-left"
       >
            <GroupList 
                className = "dashboard-left-mini no-scrollbar"
                groups = {groups}
                setGroups = {setGroups}
                getGroups = {getGroups}
            />
            <div className = "dashboard-left personal">
               <ul className = "navigations">
                    <NavLink 
                        to = "/dashboard"
                        style = {(link) => {
                            console.log('isActive = ',link)
                        }}
                        end
                    >
                        dashboard
                    </NavLink> 
                    <NavLink 
                        
                        to = "/dashboard/activity"
                    >
                        activity
                    </NavLink>    
                </ul>            
            </div>
            <Routes>
                <Route path = "/activity" element = {<PersonalActivity className = "dashboard-center"/>}/>
                <Route path = "/" element = {<Dashboard className = "dashboard-center"/>} />
                <Route path = "/*"  
                    element = {
                        <Navigate to = "/" />
                    }
                />
            </Routes>
            <h1
                className = "dashboard-right"
            >
            </h1>
       </div>
    )
}

export default DashboardPage;