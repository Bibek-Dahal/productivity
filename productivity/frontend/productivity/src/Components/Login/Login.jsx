import React,{
    useState
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
    useAuthContext
} from '../../hooks/index';

import {decodeToken} from 'react-jwt';
import {
    useLocation,
    useNavigate,
    Link
} from 'react-router-dom';
import Logo from '../../svgs/logoSml.svg';
import { Icon } from '@iconify/react';

const Login = () =>{

    const {user,setUser,loginUser} = useAuthContext();
    const [loading,setLoading] = useState(0);

    const [formData,setFormData] = useState({});
    const [errors,setErrors] = useState({});
    const [error,setError] = useState(undefined);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from.pathname || "/dashboard";

    const formHandler = (e) => {
        e.preventDefault();
        console.log('login form handler')
        loginUser(formData,setLoading,setError,setErrors,from)
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


 return(
    <div className ="authform login">
        {/* <div className="logo">
            <img src={Logo} alt="" />
        </div> */}
        <div className="top-part">
            <h1>
                Login
            </h1>
            
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
    </div>
 );
}

export default Login;

