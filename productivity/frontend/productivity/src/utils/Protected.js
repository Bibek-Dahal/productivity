import React from 'react';
import { Navigate } from 'react-router-dom';
import {
    useAuthContext
} from '../hooks/index';

export default function Protected({children}){
    
    const {user} = useAuthContext();

    if(user) return <Navigate to = "/" replace/> 

    return(
        <>
            {children}
        </>
    )
}