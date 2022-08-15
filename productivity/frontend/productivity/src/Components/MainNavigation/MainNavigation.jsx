import React from 'react';
import './MainNavigation.css';
import Logo from '../../svgs/logoSml.svg';

import { 
    Link,
    NavLink
} from 'react-router-dom';

import { Icon } from '@iconify/react';


const MainNavigation = () =>{
  
 return(
     <div className = 'mainnavigation'>
        <div className="logo">
            <img src={Logo} alt="" />
        </div>
        <div className="links border-bottom">
            <NavLink 
                exact
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
        </div>
        <div className="groups">
        </div>
     </div>

 );
}

export default MainNavigation;

