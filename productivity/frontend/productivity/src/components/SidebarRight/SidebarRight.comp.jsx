import React from 'react';

import './SidebarRight.comp.css';

function SidebarRight({children}){

    return(
        <div className="sidebarRight sidebar">
            {children}
        </div>
    )
}

export default SidebarRight;