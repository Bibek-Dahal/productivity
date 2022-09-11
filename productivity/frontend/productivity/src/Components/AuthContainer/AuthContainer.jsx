import React from 'react';
import {Appintro} from '../index';
import './AuthContainer.css';
import Bg from '../../svgs/bg.svg';

const AuthContainer = ({children}) =>{
  
 return(
     <div className = 'authcontainer'>
        <div className="bg">
            <img src={Bg} alt="" />
        </div>
        {children}
        {/* <Appintro /> */}
     </div>

 );
}

export default AuthContainer;

