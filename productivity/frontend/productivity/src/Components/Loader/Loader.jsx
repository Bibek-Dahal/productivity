import React from 'react';
import './Loader.css';

import { Icon } from '@iconify/react';


const Loader = ({icon,fontSize,text}) =>{
  
 return(
     <div 
        className = 'loader'
        
     >
        <Icon 
            style = {{
                fontSize : `${fontSize}`
            }}
            icon = {icon}
        />
        <p>
            {text}
        </p>
     </div>

 );
}

export default Loader;

