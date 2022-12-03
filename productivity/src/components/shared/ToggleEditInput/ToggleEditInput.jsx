import React from "react";


import './ToggleEditInput.css';

function ToggleEditInput({
    label,
    value,
    name,
    original_value,
    editable,
    onChange,
    type,
    variant
}){
    return(
        <div className={`toggleEditInput field ${type == "checkbox" ? "checkbox" : ""}`}>
            <label>{label}</label>
            {
                editable ?
                   <>
                    {
                        variant == "textarea" &&
                            <textarea
                                type="text"
                                name = {name} 
                                value = {value}
                                onChange = {onChange}
                            />
                    }
                    {
                        variant == "checkbox"  &&
                            <input
                                type={type}
                                name = {name} 
                                onChange = {onChange}
                                checked = {value}
                            />
                    }
                    {
                        variant !== "textarea" && variant !== "checkbox" &&
                            <input
                                type={type}
                                name = {name} 
                                value = {value}
                                onChange = {onChange}
                            />
                    }
                   </>
                    :<div className={`${label} value`}>
                        {
                            variant == "checkbox" 
                                ? (original_value ? "completed" : "not completed")
                                : original_value
                        }
                    </div>
            }
                       
        </div>
    )
}

export default ToggleEditInput;