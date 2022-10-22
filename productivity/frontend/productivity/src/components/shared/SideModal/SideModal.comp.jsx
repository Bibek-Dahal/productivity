import './SideModal.comp.css';
import {Icon} from '@iconify/react';

function SideModal({toggle,children}){
    return(
       <>
        <div className="sidemodal modal-appear">
            {children}
            <Icon 
                className='close-icon'
                icon = "ep:close-bold"
                onClick={toggle}
            />
        </div>
        <div className="overlay"></div>
       </>
    )
}

export default SideModal;