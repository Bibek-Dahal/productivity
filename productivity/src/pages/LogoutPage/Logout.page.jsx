import React,{useState} from 'react';
import { useEffect } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import {
    Navigate,
    useNavigate
} from 'react-router-dom';
import {Store} from 'react-notifications-component';

function LogoutPage(){

    const [loggedIn,setLoggedIn] = useState(true);

    const {logout} = useAuthContext();

    const navigate = useNavigate();
    
    useEffect(() => {
        (
            async function logmeout(){
                logout()
                .then(() => {
                    console.log('logged out successfully')
                    setLoggedIn(false);
                    Store.addNotification({
                        title: "Logged out!",
                        message: "Logged out of account successfully",
                        type: "success",
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
                    navigate('/login');
                })
                .catch(err => console.log('error while logging out'))
            }
        )()
    },[])

    return(
        <>
           
        </>
    )
}

export default LogoutPage