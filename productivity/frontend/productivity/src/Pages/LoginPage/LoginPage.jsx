import React from 'react';
import './LoginPage.css';
import {
    AuthContainer,
    Login
} from '../../Components/index';

const LoginPage = () =>{
  
    return(
        <>
            <AuthContainer>
               <div className="authcontainer__main">
                    <Login />
               </div>
            </AuthContainer>
        </>
    );
}

export default LoginPage;

