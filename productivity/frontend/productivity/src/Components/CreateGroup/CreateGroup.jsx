import { Icon } from '@iconify/react';
import React,{
    useState,
    useRef
} from 'react';
import { Link } from 'react-router-dom';
import Button1 from '../Button1/Button1';
import './CreateGroup.css';

const CreateGroup = ({toggle}) =>{

    const totalParts = 3;

    const inputRef = useRef(null);

    const [current,setCurrent] = useState(1);
    const [full , setFull] = useState(false);

    const [checkingGroup,setCheckingGroup] = useState(false);
    const [validGroup,setValidGroup] = useState(undefined);

    const [formData,setFormData] = useState({
        name : ""
    });

    const goBack = () => {
        setCurrent(prev => --prev);
    }

    const focusHandle = () => {
        console.log('focus handling')
        if(inputRef.current.value != ""){
            setFull(true);
        }else{
            setFull(false)
        }
    }

    const continueForm = () => {
        setCurrent(prev => ++prev);
    }


    const checkUniqueGroup = (e) => {
        focusHandle();
        setCheckingGroup(true);
        setValidGroup(false);
        console.log(e.target);
        setFormData(prev => {
            return{
                ...prev,
                [e.target.name ]: inputRef.current.value
            }
        });
        // this steps will be delayed while checking for unique group name in backend
        // setTimeout(() => {
        setCheckingGroup(false);
        setValidGroup(true)
        // },9000)
    }

    const formHandler = (e) => {
        e.preventDefault();
        if(e.target.classList.contains('btn')) return;
    }

    const changeHandler = (e) => {
        setFormData(prev => {
            return{
                ...prev,
                [e.target.name ]: inputRef.current.value
            }
        });

    }

    console.log(formData)

    return(
        
        <div className = 'creategroup'>
            <div className="form-steps">
                <div className="form-view-controller">
                {
                    current === 1 &&
                        <div 
                            className="close-btn"
                            // onClick={() => setModalVisible(true)}
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

            <form onSubmit = {formHandler} action="">
                {
                    current == 1 &&
                    <div className="form-field">
                        <h1>
                            Let's start with a name for your Group
                        </h1>

                        <div className="input">
                            <input 
                                type="text"
                                name = "name"
                                ref = {inputRef}
                                onFocus = {focusHandle}
                                onChange = {checkUniqueGroup}
                                className = {`${full ? "focus" : ""}`}
                                value = {formData.name}
                            />
                             <label htmlFor="">
                                {
                                    !full ?
                                    "Enter your project name" :
                                    "Group name"
                                }
                            </label>
                            {
                                checkingGroup &&
                                <Icon 
                                    className = "spinner"
                                    icon = "icomoon-free:spinner2"
                                />
                            }
                        </div>

                    </div>
                }

                {
                    
                }


                {
                    validGroup ?
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
            </form>
        </div>
    );
}

export default CreateGroup;

