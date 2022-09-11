import { Icon } from '@iconify/react';
import React,{
    useState,
    useRef
} from 'react';
import { Link } from 'react-router-dom';
import './CreateGroup.css';

import {
    Button1,
    Loader
} from '../index';

import endpoints from '../../utils/endpoints';

import {useNavigate} from 'react-router-dom';

import {
    useAxios,
    useAuthContext
} from '../../hooks/index';

import {toast} from 'react-toastify';

const CreateGroup = ({toggle,setGroups}) =>{

    const {user} = useAuthContext();
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const totalParts = 2;

    const inputRef = useRef(null);
    const descriptionRef = useRef(null);

    const [current,setCurrent] = useState(1);
    const [groupEntered , setGroupEntered] = useState(false);
    const [descriptionEntered , setDescriptionEntered] = useState(false);
    const [groupError,setGroupError] = useState({});

    const [checkingGroup,setCheckingGroup] = useState(false);
    const [validGroup,setValidGroup] = useState(undefined);

    const [formData,setFormData] = useState({});
    const [submitting,setSubmitting] = useState(0);

    const goBack = () => {
        setCurrent(prev => --prev);
    }

    const GroupFocusHandler = () => {
        console.log('focus handling')
        if(inputRef.current.value != ""){
            setGroupEntered(true);
        }else{
            setGroupEntered(false)
        }
    }

    const continueForm = () => {
        setCurrent(prev => ++prev);
    }

    const checkUniqueGroupAndSave = async (e) => {
        GroupFocusHandler();
        setGroupError({})
        setFormData(prev => {
            return{
                ...prev,
                [e.target.name ]: inputRef.current.value
            }
        });
        setValidGroup(false);
        setCheckingGroup(true);
        try{
            const res = await axiosInstance.post(endpoints.groupExists,{
                "name" : inputRef.current.value
            });
            // console.log(res);
            setCheckingGroup(false);
            setValidGroup(true)
        }catch(err){
            setCheckingGroup(false);
            // console.log(err);
            if(err.response.data.errors){
                setGroupError(prev => {
                    return{
                        name : err.response.data.errors.name
                    }
                });
            }
            if(err.response.data.message){
                setGroupError(prev => {
                    return{
                        message : err.response?.data.message
                    }
                });
            }
        }
    }

    const formHandler = (e) => {
        e.preventDefault();
        if(e.target.classList.contains('btn')) return;
    }
    
    const descriptionFocusHandler = (e) => {
        console.log('focus handling description',descriptionRef.current.value)
        if(descriptionRef.current.value != ""){
            setDescriptionEntered(true);
            console.log('setting descriptionRef to true')
        }else{
            setDescriptionEntered(false)
        }
    }

    const descriptionChangeHandler = (e) => {
        descriptionFocusHandler();
        setFormData(prev => {
            return{
                ...prev,
                [e.target.name ]: descriptionRef.current.value
            }
        });

    }

    const submitForm = async (e) => {
        e.preventDefault();
        setSubmitting(1);
        console.log('submitting ',formData)
        // setTimeout(() => {
        //     setSubmitting(0);
        //     toggle();
        // },[5000])
        try{
            const res = await axiosInstance.post(endpoints.createGroup,formData);
            console.log(res);
            setSubmitting(0);
            toast.success(res.data.message);
            setGroups(prev => {
                return[
                    ...prev,
                    res.data?.group
                ]
            })
            toggle();
        }catch(err){
            setSubmitting(0);
            console.log('error occured',err);
            toast.error(err.response?.data.message)
            toast.error(err.response?.data.errors?.name)
        }
    }

    console.log(groupError);
    console.log(Object.values(groupError));
        
    return(
        
        <div className = 'creategroup'>
            <div className="form-steps">
                <div className="form-view-controller">
                {
                    current == 1 &&
                        <div 
                            className='empty-void'
                        >
                        </div>
                } 
                {
                    current > 1 &&
                        <div 
                            className="back-btn"
                            onClick = {goBack}
                        >
                            <Icon
                                icon = "eva:arrow-back-outline"
                            />
                        </div>
                }
                </div>
                <p>
                    Create a group (Step {current} of {totalParts})
                </p>
            </div>

            {
                submitting ?
                <Loader 
                    icon = "icomoon-free:spinner2"
                    text = "submitting..."
                    fontSize = "3rem"
                />:
                <form onSubmit = {formHandler} action="">
                {
                        current == 1 &&
                        <div className = "">
                            <div className="form-field">
                            <h1>
                                Let's start with a name for your Group
                            </h1>

                            <div className="input">
                                <input 
                                    type="text"
                                    name = "name"
                                    ref = {inputRef}
                                    onFocus = {GroupFocusHandler}
                                    onChange = {checkUniqueGroupAndSave}
                                    className = {`${groupEntered ? "focus" : ""} ${Object.values(groupError).length > 0 ? "error" : ""}`}
                                    value = {formData.name}
                                />
                                <label htmlFor="">
                                    {
                                        !groupEntered ?
                                        "Enter your project name..." :
                                        "Group name"
                                    }
                                </label>
                                {
                                    Object.values(groupError).length > 0 &&
                                    <>
                                        {
                                            Object.values(groupError).map(err => (
                                                <small className="error">
                                                    {err}
                                                </small>
                                            ))
                                        }
                                        {
                                            <span className="invalid-icon">
                                                <Icon icon = "ant-design:exclamation-circle-filled" />
                                            </span>
                                        }
                                    </>
                                }
                                {
                                    validGroup &&
                                    <span className="valid-icon">
                                        <Icon icon = "teenyicons:tick-circle-solid" />
                                    </span>
                                }
                            </div>
                        </div>
                       
                        {
                            validGroup && groupEntered ?
                                <button 
                                    className = "btn" 
                                    onClick = {continueForm}
                                >
                                    Continue
                                </button>:
                                <button 
                                    className = "btn" 
                                    disabled
                                >
                                    Continue
                                </button>
                        }
                    </div>
                }
                {
                    current == 2 &&
                    <div className = "">
                            <div className="form-field">
                                <h1>
                                    Describe something about your group
                                </h1>
                                <div className="input">
                                    <textarea 
                                        type="text"
                                        name = "description"
                                        ref = {descriptionRef}
                                        onFocus = {descriptionFocusHandler}
                                        onChange = {descriptionChangeHandler}
                                        className = {`${descriptionEntered ? "focus" : ""}`}
                                        value = {formData.description}
                                    ></textarea>
                                    <label htmlFor="">
                                        {
                                            !descriptionEntered ?
                                            "Write group description..." :
                                            "Group description"
                                        }
                                    </label>
                            </div>
                        </div>
                        {
                            descriptionEntered ?
                                <button 
                                    className = "btn" 
                                    onClick = {submitForm}
                                >
                                    Create
                                </button>:
                                <button 
                                    className = "btn" 
                                    disabled
                                >
                                    Create
                                </button>
                        }
                    </div>
                }
                </form>
            }
        </div>
    );
}

export default CreateGroup;

