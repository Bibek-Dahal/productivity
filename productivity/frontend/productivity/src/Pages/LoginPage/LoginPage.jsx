import React from 'react';
import './LoginPage.css';
import {
    AuthContainer,
    Login,
    Appintro
} from '../../Components/index';

const LoginPage = () =>{
    
    return(
        <>
            <AuthContainer>
               <div className="authcontainer__main">
                    <Login />
               </div>
               <Appintro />
            </AuthContainer>
        </>
    );
}

export default LoginPage;

