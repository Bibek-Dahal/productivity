import React,{
    useRef
} from 'react';

import './SidebarRight.comp.css';
import {Button} from '@mantine/core';
import {Icon} from '@iconify/react';

function SidebarRight({width,children}){

    const sidebarRef = useRef(null);

    const toggleSideBar = () => {
        sidebarRef.current.classList.toggle('active');
    }

    return(
        <div 
            className="sidebarRight sidebar"
            ref = {sidebarRef}
            style = {{
                width : `${width ? width : "auto"}`,
                overflow : 'visible'
            }}    
        >
            {/* <Button 
                onClick = {toggleSideBar}
                style = {{
                    position : "absolute",
                    zIndex : "999",
                    fontSize : "1.5rem",
                    padding : "0",
                    left : "-20px",
                    height : "30px",
                    width : "30px",
                    borderRadius : "5px"
                }}
            >
                <Icon icon = "icon-park-outline:hamburger-button" />
            </Button> */}
            {children}
        </div>
    )
}

export default SidebarRight;