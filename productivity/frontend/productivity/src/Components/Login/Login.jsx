import React,{
    useState,
    useRef,
    useEffect
} from 'react';
import './Login.css';

import {
    InputField
} from '../index';

import endpoints from '../../utils/endpoints';
import axios from '../../utils/axios';

import {
    toast
} from 'react-toastify';

import {
    useAuthContext,
    useAxios
} from '../../hooks/index';

import {decodeToken} from 'react-jwt';
import {
    useLocation,
    useNavigate,
    Link
} from 'react-router-dom';

import {
    Tooltip
} from '../index';

import Logo from '../../svgs/logoSml.svg';
import { Icon } from '@iconify/react';

const Login = () =>{

    const [verifyEmail,setVerifyEmail] = useState(null);
    const [sendingEmail,setSendingEmail] = useState(false);

    const axiosInstance = useAxios();

    const {user,setUser,loginUser} = useAuthContext();
    const [loading,setLoading] = useState(0);
    
    const [showResendBtn,setShowResendBtn] = useState(false);

    const [formData,setFormData] = useState({});
    const [errors,setErrors] = useState({});
    const [error,setError] = useState(undefined);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from.pathname || "/dashboard";

    const formHandler = (e) => {
        e.preventDefault();
        console.log('login form handler')
        loginUser(formData,setLoading,setError,setErrors,from,setShowResendBtn)
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
        setError(prev => undefined);
    }

    const resendEmailVerification = async () => {
        console.log('sending email verification',verifyEmail);
        setSendingEmail(true);
        try{
            const res = await axiosInstance.post(endpoints.resendEmailVerification,{
                email : verifyEmail
            });
            toast.success(res.data.message);
            setShowResendBtn(false);
            setSendingEmail(false);
        }catch(err){
            setSendingEmail(false)
            console.log(err);
            toast.error('error occured');
        }
    }

    return(
        <div className ="authform login">
            <div className="logo">
                <img src={Logo} alt="" />
            </div>
            {
                !showResendBtn &&
                <>
                    <div className="top-part">
                        <h1>
                            Welcome back!
                        </h1>
                        <p>
                            We're so excited to see you again
                        </p>
                    </div>
                    <form 
                        onSubmit={formHandler}
                        className="middle"
                    >
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
                            icon = "fluent:mail-20-filled"
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
                            icon = "fa-solid:lock"
                        />
                        <Link 
                            className='forgot link'
                            to = "/forgot-password">
                            <small>
                                forgot password?
                            </small>
                        </Link>
                        <button type = "submit">
                            {
                                loading ? 
                                    <Icon 
                                        className = "spinner"
                                        icon = "icomoon-free:spinner2"
                                    />:
                                    "Login"
                            }
                        
                        </button>
                        <small>
                            Not a member?
                            <Link 
                                to = "/register"
                                className='link'
                            >
                                Register
                            </Link>
                        </small>
                    </form>
                </>
            }
            {
                showResendBtn &&
                <div className='resend-btn-container-wrapper'>
                    <Tooltip
                        className = "cross"
                        text = "close"
                    >
                        <Icon 
                            icon = "ep:close-bold"
                            onClick = {() => setShowResendBtn(false)}
                        />
                    </Tooltip>
                    <div className="top-part">
                        <h1>
                            Resend Verification email
                        </h1>
                    </div>
                    <div className="resend-btn-container">
                        <InputField 
                            name = "verify-email"
                            label = "Email to verify"
                            type = "text"
                            onfocus = {onfocus}
                            icon = "fluent:mail-20-filled"
                            setVerifyEmail = {setVerifyEmail}
                        />
                        <button
                            onClick = {resendEmailVerification}
                            className='resend-btn'
                        >
                            {
                                sendingEmail ?
                                <Icon 
                                    className = "spinner"
                                    icon = "icomoon-free:spinner2"
                                />:
                                "Resend email verification"
                            }
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Login;

