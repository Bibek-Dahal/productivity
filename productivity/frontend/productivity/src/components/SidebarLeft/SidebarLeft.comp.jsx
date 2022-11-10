import React from 'react';


import './SidebarLeft.comp.css';

function SidebarLeft({children}){
    return(
        <div className="sidebarLeft sidebar">
            {children}
        </div>
    )
}

export default SidebarLeft;