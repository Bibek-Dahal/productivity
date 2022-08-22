import React from 'react';
import { useEffect } from 'react';
import './Logout.css';

import {
    useAuthContext  
} from '../../hooks/index';

const Logout = () =>{

    const {logoutUser} = useAuthContext();

    useEffect(() => {
        console.log('logging out user');
        logoutUser();
    },[])

    return(
        <div className = 'logout'>
            
        </div>
    );
}

export default Logout;

