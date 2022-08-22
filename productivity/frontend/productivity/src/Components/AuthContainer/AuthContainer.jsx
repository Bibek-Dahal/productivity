import React from 'react';
import {Appintro} from '../index';
import './AuthContainer.css';

const AuthContainer = ({children}) =>{
  
 return(
     <div className = 'authcontainer'>
        {children}
        {/* <Appintro /> */}
     </div>

 );
}

export default AuthContainer;

