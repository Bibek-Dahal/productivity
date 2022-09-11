import { Icon } from '@iconify/react';
import React from 'react';
import './Modal.css';
import {
    useGlobalControlContext
} from '../../hooks/index';

const Modal = ({toggle,className,children}) =>{

    function toggleHandler(){
        toggle();
    }
    
    return(
        <>
            <div className = {
                `modal ${className}`
            }>
                <div 
                    className = "close-btn"
                    onClick={toggleHandler}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="none" role="img" class="icon fill-current">
                        <path d="M8.28596 6.51819C7.7978 6.03003 7.00634 6.03003 6.51819 6.51819C6.03003 7.00634 6.03003 7.7978 6.51819 8.28596L11.2322 13L6.51819 17.714C6.03003 18.2022 6.03003 18.9937 6.51819 19.4818C7.00634 19.97 7.7978 19.97 8.28596 19.4818L13 14.7678L17.714 19.4818C18.2022 19.97 18.9937 19.97 19.4818 19.4818C19.97 18.9937 19.97 18.2022 19.4818 17.714L14.7678 13L19.4818 8.28596C19.97 7.7978 19.97 7.00634 19.4818 6.51819C18.9937 6.03003 18.2022 6.03003 17.714 6.51819L13 11.2322L8.28596 6.51819Z" fill="currentColor"></path>
                    </svg>
                </div>
                {children}
            </div>
            <div className={
                `modal-overlay`
            }
            ></div>
        </>
    );
}

export default Modal;

