import React from 'react';
import './Sidebarleft.css';

const Sidebarleft = ({children}) =>{
  
 return(
     <div className = 'sidebar sidebarleft nav-padding'>
        {children}
     </div>

 );
}

export default Sidebarleft;

