import {Icon} from '@iconify/react';
import { useRef,useState } from 'react';
import './TextArea.comp.css';

function TextArea({
    label,
    name,
    onChange,
    type,
    className,
    icon,
    value,
    focusColor,
    error
}){

    const inputFieldRef = useRef(null);
    const inputRef = useRef(null);

    const onFocusHandler = (e) => {
        console.log('onfocushander')
        inputFieldRef.current.classList.add('focus');
        inputFieldRef.current.style.color =focusColor;
    }

    const onBlurHandler = (e) => {
        console.log('onblur')
        inputFieldRef.current.classList.remove('focus')
        inputFieldRef.current.style.color ="unset";
    }

    return(
        <div
            className = {`
                ${className ? className : ""} inputfield ${icon ? "icon" : ""} 
                ${error ? "error" : ""}
            `}
            ref = {inputFieldRef}
        >
            <label>
                {label}
            </label>
            <div 
                className="input"
            >
                <Icon 
                    className='main-icon'
                    icon = {icon}
                />
                <textarea
                    onFocus = {onFocusHandler}
                    onBlur = {onBlurHandler} 
                    name = {name}
                    value = {value}
                    onChange = {onChange}
                />
            </div>
            {
                error && 
                    <small className = "error">
                        {error}
                    </small>
            }
        </div>
    )
}

export default TextArea;