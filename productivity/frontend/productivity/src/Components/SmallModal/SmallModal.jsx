import React from 'react';
import './SmallModal.css';

const SmallModal = ({children}) =>{
  
 return(
     <div className = 'smallmodal'>
        {children}
     </div>
 );
}

export default SmallModal;

