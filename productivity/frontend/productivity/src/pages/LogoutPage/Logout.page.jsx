import React from 'react';
import { useEffect } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import {
    useNavigate
} from 'react-router-dom';
import {Store} from 'react-notifications-component';

function LogoutPage(){

    const {logout} = useAuthContext();

    const navigate = useNavigate();

    useEffect(async () => {
       (
            logout()
            .then(() => {
                console.log('logged out successfully')
                navigate('/login');
                Store.addNotification({
                    title: "Verification incomplete!",
                    message: "check your email for verification token or resend verification!",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                    duration: 5000,
                    onScreen: true,
                    pauseOnHover : true
                    }
                });
            })
            .catch(err => console.log('error while logging out'))
       )()
    },[])

    return(
        <>
           
        </>
    )
}

export default LogoutPage