import React from 'react';
import './Tooltip.css';

const Tooltip = ({tooltipContent,children}) =>{
  
 return(
     <div className = 'tooltip'>
        {children}
        <div className="tooltip__content">
            {tooltipContent}
        </div>
     </div>

 );
}

export default Tooltip;

