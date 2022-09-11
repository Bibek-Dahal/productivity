import React from 'react';
import './RegisterPage.css';

import { 
    Appintro,
    AuthContainer, 
    Register 
} from '../../Components';

import Logo from '../../svgs/logoSml.svg';

const RegisterPage = () =>{
    return(
        <>
            <AuthContainer>
               <div className={
                `
                authcontainer__main
                ${window.innerWidth > 600 ? "scaleDown" : ""}
                `
               }>
                    <Register />
                </div>
                <Appintro />
            </AuthContainer>
        </>
    );
}

export default RegisterPage;

