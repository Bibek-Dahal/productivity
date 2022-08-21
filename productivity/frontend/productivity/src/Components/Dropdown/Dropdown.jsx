import React,{
    useState
} from 'react';
import './Dropdown.css';

import { Icon } from '@iconify/react';

const Dropdown = ({title,children}) =>{
    
    const [open,setOpen] = useState(true);

    const toggleDropdown = (e) => {
        setOpen(prev => !prev);
    }
    
    return(
        <div className="dropdown-container">
            <div className = 'dropdown'>
                <div className="top">
                    <div
                        className = {
                            open ? "active" : ""
                        }
                        onClick = {toggleDropdown}
                    >
                        <h1>
                            {title}
                        </h1>
                    </div>
                   
                </div>
                <div className={
                    `list-container
                    ${
                        open ? "active" : ""
                    }
                    `
                } >
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Dropdown;

