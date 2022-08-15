import React,{
    useState,
    useEffect
} from 'react';
import './Register.css';
import {
    Link,
    useNavigate
} from 'react-router-dom';

import InputField from '../InputField/InputField';
import {
    Icon
} from '@iconify/react';

import endpoints from '../../utils/endpoints';
import axios from '../../utils/axios';

import {
    toast
} from 'react-toastify';

const Register = () =>{
    const [loading,setLoading] = useState(0);
    const [currentPart,setCurrentPart] = useState(1);
    const [formData,setFormData] = useState({});
    const [errors,setErrors] = useState({});

    const navigate = useNavigate();

    const totalParts = 2;

    const handleNext = (e) => {
        setCurrentPart(prev => ++prev);
    }

    const handleBackClick = (e) => {
        if(currentPart > 1) setCurrentPart(prev => --prev);
    }

    const formHandler = async (e) => {
        e.preventDefault();
        console.log('form submitted',formData);
        setLoading(1);
        try{
            const res = await axios.post(endpoints.register,formData);
            setLoading(0);
            console.log(res);
            toast.success(res.data.message)
            navigate('/login');
        }catch(err){
            console.log('error occured',err.response.data.errors);
            const errs = err.response.data.errors;
            setErrors(errors => errs); 
            setLoading(0);
            Object.values(errs).forEach(err => {
                toast.error(err);
                console.log('err = ',err)
            })
        }
    }

    const handleChange = (e) => {
        setFormData(prev => {
            return{
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }

    const onfocus = (e) => {
        setErrors(prev => {});
    }

       
  
    

    if(loading) return "loading...";

    return(
        <div className ='authform register'>
            <div className="top-part">
                {/* <p>
                    <span className="back-btn">
                        <Icon
                            onClick = {handleBackClick}
                            icon = "bx:arrow-back"
                        />
                        Step {currentPart} of {totalParts}
                    </span>
                </p> */}
                <h1>
                    Create new account
                </h1>
                <small>
                    Already a member?
                    <Link to = "/login">
                        Login
                    </Link>
                </small>
            </div>
            <form 
                onSubmit={formHandler}
                className="middle"
            >
               
                        <InputField 
                            name = "username"
                            label = "Username"
                            type = "text"
                            onChange = {handleChange}
                            value = {formData.username ? formData.username : ""}
                            error = {
                                errors?.username ? 
                                    errors.username : 
                                    ""
                            }
                            onfocus = {onfocus}
                        />
                        <InputField 
                            name = "email"
                            label = "Email"
                            type = "text"
                            onChange = {handleChange}
                            value = {formData.email ? formData.email : ""}
                            error = {
                                errors?.email ? 
                                errors.email : 
                                ""
                            }
                            onfocus = {onfocus}
                        />
                
                        <InputField 
                            name = "password"
                            label = "Password"
                            type = "password"
                            onChange = {handleChange}
                            value = {formData.password ? formData.password : ""}
                            error = {
                                errors?.password ? 
                                errors.password : 
                                ""
                            }
                            onfocus = {onfocus}
                        />
                        <InputField 
                            name = "repeat_password"
                            label = "Repeat Password"
                            type = "password"
                            onChange = {handleChange}
                            value = {formData.repeat_password ? formData.repeat_password : ""}
                            error = {
                                errors?.repeat_password ? 
                                errors.repeat_password : 
                                ""
                            }
                            onfocus = {onfocus}
                        />
             
                    <input type = "submit" value = "Register" />
            </form>
        </div>
    );
}

export default Register;

