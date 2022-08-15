import React, { useEffect } from 'react';
import { useNavigate,Navigate,useLocation } from 'react-router-dom';

import { useAuthContext } from '../hooks/index';

import {
    toast
} from 'react-toastify';

export default function RequiredAuth({children}){

    const {user} = useAuthContext();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('inside useEfffect ', location.pathname);
    },[])


    if(!user){
        toast.error('You are not logged in');
        return <Navigate to = "/login" state = {{from : location}}/>
    }

    return(
            <>
                {children}
            </>
    )
}