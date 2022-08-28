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

    const checkUniqueGroupAndSave = (e) => {
        GroupFocusHandler();
        setCheckingGroup(true);
        setValidGroup(false);
        setFormData(prev => {
            return{
                ...prev,
                [e.target.name ]: inputRef.current.value
            }
        });
        setCheckingGroup(false);
        setValidGroup(true)
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
        // formData.title = formData.name;
        // formData.description = formData.name;
        // formData.members = [user.id]
        // try{
        //     const res = await axiosInstance.post(endpoints.createGroup,formData);
        //     console.log(res);
        //     toast.success(res.data.message);
        //     // navigate('/dashboard');
        //     setGroups(prev => {
        //         return[
        //             ...prev,
        //             res.data?.group
        //         ]
        //     })
        //     toggle();
        // }catch(err){
        //     console.log('error occured',err);
        //     toast.error(err.response?.data.message)
        //     toast.error(err.response?.data.errors?.name)
        // }
    }

    return(
        
        <div className = 'creategroup'>
            <div className="form-steps">
                <div className="form-view-controller">
                {
                    current === 1 &&
                        <div 
                            className="close-btn"
                            onClick={() => toggle()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="none" role="img" class="icon fill-current">
                                <path d="M8.28596 6.51819C7.7978 6.03003 7.00634 6.03003 6.51819 6.51819C6.03003 7.00634 6.03003 7.7978 6.51819 8.28596L11.2322 13L6.51819 17.714C6.03003 18.2022 6.03003 18.9937 6.51819 19.4818C7.00634 19.97 7.7978 19.97 8.28596 19.4818L13 14.7678L17.714 19.4818C18.2022 19.97 18.9937 19.97 19.4818 19.4818C19.97 18.9937 19.97 18.2022 19.4818 17.714L14.7678 13L19.4818 8.28596C19.97 7.7978 19.97 7.00634 19.4818 6.51819C18.9937 6.03003 18.2022 6.03003 17.714 6.51819L13 11.2322L8.28596 6.51819Z" fill="currentColor"></path>
                            </svg>
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
                        <div className = "slidertl">
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
                                    className = {`${groupEntered ? "focus" : ""}`}
                                    value = {formData.name}
                                />
                                <label htmlFor="">
                                    {
                                        !groupEntered ?
                                        "Enter your project name..." :
                                        "Group name"
                                    }
                                </label>
                                
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
                    <div className = "slidertl">
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

