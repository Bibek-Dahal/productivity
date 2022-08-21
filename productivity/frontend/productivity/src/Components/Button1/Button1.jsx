import React from 'react';
import './Button1.css';

const Button1 = ({className,background,children}) =>{
  
 return(
     <div 
        className = {`
            button1
            ${className}
        `}
    >
        {children}
     </div>

 );
}

export default Button1;

