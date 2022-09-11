import React from 'react';
import './Button1.css';

const Button1 = ({className,background,children}) =>{
  
 return(
     <div 
        className = {`
            button1
            ${className}
        `}
        style = {{
            background : background
        }}
    >
        {children}
     </div>

 );
}

export default Button1;

