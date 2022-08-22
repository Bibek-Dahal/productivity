import React from 'react';
import './RegisterPage.css';

import { 
    Appintro,
    AuthContainer, 
    Register 
} from '../../Components';

const RegisterPage = () =>{
    return(
        <>
            <AuthContainer>
                <div className = "authcontainer__main">
                    <Register />
                </div>
                <Appintro />
            </AuthContainer>
        </>
    );
}

export default RegisterPage;

