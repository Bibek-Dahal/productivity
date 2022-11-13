import React from 'react';

import './SidebarRight.comp.css';

function SidebarRight({width,children}){

    return(
        <div 
            className="sidebarRight sidebar"
            style = {{
                width : `${width ? width : "auto"}`
            }}    
        >
            {children}
        </div>
    )
}

export default SidebarRight;