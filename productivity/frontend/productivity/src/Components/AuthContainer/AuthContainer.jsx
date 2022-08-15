import React from 'react';
import {Appintro} from '../index';
import './AuthContainer.css';

const AuthContainer = ({children}) =>{
  
 return(
     <div className = 'authcontainer'>
        {/* <Appintro /> */}
        {children}
     </div>

 );
}

export default AuthContainer;

