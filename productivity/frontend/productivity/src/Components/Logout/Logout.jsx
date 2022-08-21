import React from 'react';
import { useEffect } from 'react';
import './Logout.css';

const Logout = () =>{
  
    useEffect(() => {
        console.log('logging out')
    },[])

    return(
        <div className = 'logout'>
            
        </div>
    );
}

export default Logout;

