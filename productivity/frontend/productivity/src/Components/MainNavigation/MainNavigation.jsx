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
    Logo
} from '../index';
import { useEffect } from 'react';

// import axios from '../../utils/axios';
import endpoints from '../../utils/endpoints';
import {
    useAxios 
} from '../../hooks/index';

const MainNavigation = ({toggle,groups}) =>{

    const axiosInstance = useAxios();

    const [addGroup,setAddGroup] = useState(false);

    const openGroupAddHandler = () => {
        toggle();
    }
    
    return(
        <div className = 'mainnavigation'>
            <Logo />
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

                                {
                                    groups.map(group => (
                                        <li>
                                            <Link to = {`/group/${group._id}/`}>
                                                <span className='hashtag'>
                                                # </span>{group.name}
                                            </Link>
                                        </li>
                                    ))
                                }

                                {/* <li>
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
                                </li> */}
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

