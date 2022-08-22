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

    const from = location.state?.from.pathname || "/";

    const formHandler = (e) => {
        e.preventDefault();
        console.log('login form handler')
        // try{
            // setLoading(1);
            loginUser(formData,setLoading,setError,setErrors,from)
            // const res = await axios.post(endpoints.login,formData);
            // console.log(res);
            // setUser(prev => {
            //     return{
            //         user : decodeToken(res.data.token),
            //         token : res.data.token
            //     }
            // });
            // setLoading(0);
            // localStorage.setItem('user',JSON.stringify(decodeToken(res.data.token)));
            // localStorage.setItem('token',res.data.token);
            // console.log(localStorage.getItem('user'));
            // toast.success(res?.data?.message);
            
            // navigate(from);
        // }catch(err){
        //     setLoading(0);
        //     const errStatus = err.response?.status;
        //     console.log('error = ',err)
        //     if(errStatus == 400){
        //         const errs = err.response.data.errors;
        //         setErrors(prev => errs);
        //         Object.values(errs).forEach(err => toast.error(err));
        //     }else{
        //         setError(prev => err.response?.data.message);
        //         toast.error(err.response?.data.message);
        //         setErrors(prev => {
        //             return{
        //                 email : "wrong",
        //                 password : "wrong"
        //             }
        //         })
        //     }
        // }
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
        <div className="logo">
            <img src={Logo} alt="" />
        </div>
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

