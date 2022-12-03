import { useEffect } from "react"
import {useNavigate} from 'react-router-dom';

import useAuthContext from '../../hooks/useAuthContext';
import useNotification from "../../hooks/useNotification";


function ProtectedRoute({children}){
    
    const navigate = useNavigate();
    
    const {token} = useAuthContext();
    const createNotification = useNotification();
    useEffect(() => {
        console.log('token = ',token)
        if(token){
            createNotification("success","Redirect!","already logged in",5000);
            navigate('/dashboard');
        }else{
            console.log('no token found');
        }
    },[token])
    
    return(
        {
            ...children
        }
    )
}

export default ProtectedRoute;