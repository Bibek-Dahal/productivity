import React,{
    useState
} from 'react';
import './MainNavigation.css';
import Logo from '../../svgs/logoSml.svg';

import { 
    Link,
    NavLink
} from 'react-router-dom';

import { Icon } from '@iconify/react';
import {
    Dropdown,
    Modal,
    Button1
} from '../index';
import { useEffect } from 'react';

// import axios from '../../utils/axios';
import endpoints from '../../utils/endpoints';
import {
    useAxios 
} from '../../hooks/index';

const MainNavigation = ({toggle}) =>{

    const axiosInstance = useAxios();

    const [groups,setGroups] = useState([]);
    const [addGroup,setAddGroup] = useState(false);

    const openGroupAddHandler = () => {
        toggle();
    }
    
    async function getGroups(){
        try{
            const res = await axiosInstance.get(endpoints.getGroups);
            console.log(res);
            setGroups(res.data.groups);
        }catch(err){
            console.log(err);
        }
    }


    useEffect(() => {
        getGroups();
    },[])

    return(
        <div className = 'mainnavigation'>
            <div className="logo">
                <img src={Logo} alt="" />
            </div>
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
                            groups.length === 0 ?
                            <span className="error">
                                No groups joined or created yet!
                            </span>:
                            <ul className="dropdown-items">
                                <li>
                                    <Link to = "/group/exam-preparation">
                                        # Exam preparation
                                    </Link>
                                </li>
                                <li>
                                    <Link to = "/group/ux-design-learn">
                                        # UX design learn
                                    </Link>
                                </li>
                                <li>
                                    <Link to = "/group/react-fun-parts">
                                        # React fun parts
                                    </Link>
                                </li>
                                <li>
                                    <Link to = "/group/exam-preparation">
                                        # Exam preparation
                                    </Link>
                                </li>
                               
                            </ul>
                        }
                        <div 
                            className="add-group"
                            onClick = {openGroupAddHandler}
                        >
                            <Icon 
                                icon = "akar-icons:circle-plus-fill"
                            />
                        </div>
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

