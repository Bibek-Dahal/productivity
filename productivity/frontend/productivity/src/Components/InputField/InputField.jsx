import React,{
    useRef,
    useState
} from 'react';
import './InputField.css';

import { Icon } from '@iconify/react';
import { useEffect } from 'react';

const InputField = ({
        name,
        label,
        type,
        onChange,
        value,
        error,
        onfocus,
        icon
    }) =>{

    const inputRef = useRef(null);
    const [full,setFull] = useState(false);

    const [visiblePassword,setVisiblePassword] = useState(false);

    const focusHandler = (e) => {
        onfocus(e);

    }

    const changeHandler = (e) => {
        if(inputRef.current.value != ""){
            setFull(true);
        }else setFull(false);

        onChange(e);
    }

    const togglePasswordVisible = (e) => {
        setVisiblePassword(prev => !prev);
    }

    useEffect(() => {
        console.log('full = ',full)
        if(inputRef.current.value !== ""){
            setFull(true);
        }
    },[full,inputRef,setFull])
    
    return(
        <div className = {
            `${error ? "error" : ""} inputfield`
        }>
                <div className="field">
                    <input 
                        type={type != "password" ?
                                `${type}` :
                                `${
                                    visiblePassword ?
                                    "text":
                                    type
                                }`
                        }
                        onChange = {changeHandler}
                        name = {name}
                        value = {value}
                        autoComplete = "true"
                        onFocus = {focusHandler}
                        ref = {inputRef}
                        required
                        className = {`${full ? "focus" : ""}`}
                    />
                    <label>
                        <Icon icon = {icon} />
                        <p>
                            {label}
                        </p>
                    </label>
                    {
                        type == "password" &&
                        <div 
                            className="password-view-status"
                            onClick = {togglePasswordVisible}
                        >
                            {
                                visiblePassword ? 
                                <Icon  icon = "ant-design:eye-filled" /> :
                                <Icon  icon = "ant-design:eye-invisible-filled" />
                            }
                        </div>
                    }
                </div>
                {/* {
                    error &&
                    <small className = "error">
                        {error}
                    </small>
                } */}
            </div>
    );
}

export default InputField;

