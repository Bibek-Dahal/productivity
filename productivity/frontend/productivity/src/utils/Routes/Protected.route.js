import { useEffect } from "react"
import {useNavigate} from 'react-router-dom';

import useAuthContext from '../../hooks/useAuthContext';
import {Store} from 'react-notifications-component';

function ProtectedRoute({children}){
    console.log('inside protected route')

    const navigate = useNavigate();
    
    const {token} = useAuthContext();
    
    useEffect(() => {
        if(token){
            Store.addNotification({
                title: "Redirect!",
                message: "already logged in",
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
            navigate('/dashboard');
        }
    },[])
    
    return(
            {
                ...children
            }
    )
}

export default ProtectedRoute;