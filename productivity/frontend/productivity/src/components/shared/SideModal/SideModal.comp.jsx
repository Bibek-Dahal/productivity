import './SideModal.comp.css';
import {Icon} from '@iconify/react';

function SideModal({toggle,children,height}){
    return(
       <>
        <div className={`sidemodal modal-appear ${height ? height : ""}`}>
            {children}
            <Icon 
                className='close-icon'
                icon = "akar-icons:cross"
                onClick={toggle}
            />
        </div>
        <div className="overlay"></div>
       </>
    )
}

export default SideModal;