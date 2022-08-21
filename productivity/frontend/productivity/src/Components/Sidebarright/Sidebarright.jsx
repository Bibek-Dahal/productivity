import React,{
    useState
} from 'react';
import './Sidebarright.css';

const Sidebarright = ({children}) =>{
    return(
        <div className = {
            `
                sidebar sidebarright nav-padding
            `
        }>
            {children}
        </div>

    );
}

export default Sidebarright;

