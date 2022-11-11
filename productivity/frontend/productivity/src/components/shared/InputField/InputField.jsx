import {Icon} from '@iconify/react';
import { useRef,useState } from 'react';

import './InputField.css';

function InputField({
    label,
    name,
    onChange,
    type,
    className,
    icon,
    error,
    value,
    focusColor,
    msg
}){

    const [passwordVisible,setPasswordVisible] = useState(false);

    const inputFieldRef = useRef(null);
    const inputRef = useRef(null);

    const onFocusHandler = (e) => {
        inputFieldRef.current.classList.add('focus');
        inputFieldRef.current.style.color =focusColor;
    }

    const onBlurHandler = (e) => {
        inputFieldRef.current.classList.remove('focus')
        inputFieldRef.current.style.color ="unset";
    }

    const togglePasswordVisibility = (e) => setPasswordVisible(prev => !prev)

    return(
        <div
            className = {`
                ${className ? className : ""} inputfield ${icon ? "icon" : ""} 
                ${error !== null ? "error" : ""}
                ${msg ? "success" : ""}
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
                <input 
                    type = {
                        `${passwordVisible ? "text" : type }`
                    }
                    name = {name}
                    onChange = {onChange}
                    value = {value}
                    onFocus = {onFocusHandler}
                    onBlur = {onBlurHandler}
                    style = {{
                        padding : `${icon ? ".6em 2.5em" : ".6em"}`
                    }}
                />
                {
                    type == "password" &&
                    <>
                        {
                            passwordVisible ? 
                            <Icon 
                                className='eye-icon'
                                icon = "akar-icons:eye" 
                                onClick = {togglePasswordVisibility}
                            />:
                            <Icon 
                                className='eye-icon'
                                icon = "akar-icons:eye-slashed" 
                                onClick = {togglePasswordVisibility}
                            />
                        }
                    </>
                }
            </div>
           {
            error &&
                <small>{error}</small>
           }
           {
            msg &&
            <small>{msg}</small>
           }
        </div>
    )
}

export default InputField;