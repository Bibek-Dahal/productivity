import React from 'react';
import './LoginPage.css';
import {
    AuthContainer,
    Login,
    Appintro
} from '../../Components/index';

import Logo from '../../svgs/logoSml.svg';

const LoginPage = () =>{
    
    return(
        <>
            <AuthContainer>
               <div className="authcontainer__main">
                    <div className = "authcontainer__main__logo">
                        <img src = {Logo} />
                    </div>
                    <Login />
               </div>
               <Appintro />
            </AuthContainer>
        </>
    );
}

export default LoginPage;

