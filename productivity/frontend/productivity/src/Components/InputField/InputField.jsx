import React from 'react';
import './InputField.css';

const InputField = ({
    name,
    label,
    type,
    onChange,
    value,
    error,
    onfocus
}) =>{


    const focusHandler = (e) => {
        onfocus(e);

    }

  
 return(
     <div className = {
        `${error ? "error" : ""} inputfield`
     }>
            <div className="field">
                <label>{label}</label>
                <input 
                    type={type}
                    onChange = {(e) => onChange(e) }
                    name = {name}
                    value = {value}
                    autoComplete = "true"
                    onFocus = {focusHandler}
                    required
                />
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

