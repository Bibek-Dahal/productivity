import React,{
    useState
} from 'react';
import './GroupDashboarNavigation.css';
import Logo from '../../svgs/logoSml.svg';

import {
    Link,
    NavLink
} from 'react-router-dom';

import { Icon } from '@iconify/react';
import Dropdown from '../Dropdown/Dropdown';


const GroupDashboarNavigation = ({toggle}) =>{
  
    const [projects,setProjects] = useState(1);

    const openProjectAddHandler = () => {
        toggle();
    }

    return(
        <div className = 'groupdashboarnavigation mainnavigation'>
            <div className="logo">
                <img src={Logo} alt="" />
            </div>
            <div className="links">
                    <Dropdown 
                        title = "Projects"
                    >
    {
                                projects === 0 ?
                                <span className="error">
                                    No groups joined or created yet!
                                </span>:
                                <ul className="dropdown-items">
                                    <li>
                                        <Link 
                                            to = "/group/exam-preparation"
                                            title ="database management system"
                                        >
                                            # Database Management System 
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to = "/group/ux-design-learn">
                                            # Differential math
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to = "/group/react-fun-parts">
                                            # Numerical methods
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to = "/group/exam-preparation">
                                            # Computer Networking
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to = "/group/exam-preparation">
                                            # Microprocessor
                                        </Link>
                                    </li>
                                </ul>
                            }
                            <div 
                                className="add-group"
                                onClick = {openProjectAddHandler}
                            >
                                <Icon 
                                    icon = "akar-icons:circle-plus-fill"
                                />
                            </div>
                        </Dropdown>
                    <div className="hr"></div>
            </div>
        </div>

 );
}

export default GroupDashboarNavigation;

