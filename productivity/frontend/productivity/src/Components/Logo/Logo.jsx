import React from 'react';
import './Logo.css';
import {
    Link
} from 'react-router-dom';

import logo from '../../svgs/logoSml.svg';

const Logo = () =>{
  
 return(
     <div className = 'logo'>
        <Link to = "/dashboard">
            <img src={logo} alt="" />
        </Link>
     </div>

 );
}

export default Logo;

