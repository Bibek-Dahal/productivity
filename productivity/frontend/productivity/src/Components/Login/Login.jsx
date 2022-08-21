import React,{
    useState
} from 'react';
import './Login.css';
import {
    Link
} from 'react-router-dom';

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
    useNavigate 
} from 'react-router-dom';

const Login = () =>{

    const {user,setUser} = useAuthContext();

    const [formData,setFormData] = useState({});
    const [errors,setErrors] = useState({});
    const [error,setError] = useState(undefined);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from.pathname || "/";

    const formHandler = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(endpoints.login,formData);
            console.log(res);
            setUser(prev => {
                return{
                    user : decodeToken(res.data.token),
                    token : res.data.token
                }
            });
            localStorage.setItem('user',JSON.stringify(decodeToken(res.data.token)));
            localStorage.setItem('token',res.data.token);
            // console.log(decodeToken(res.data.token))
            console.log(localStorage.getItem('user'));
            toast.success(res?.data?.message);
            navigate(from);
        }catch(err){
            const errStatus = err.response.status;
            console.log(err.response)
            if(errStatus == 400){
                const errs = err.response.data.errors;
                setErrors(prev => errs);
                Object.values(errs).forEach(err => toast.error(err));
            }else{
                setError(prev => err.response.data.message);
                toast.error(err.response.data.message);
                setErrors(prev => {
                    return{
                        email : "wrong",
                        password : "wrong"
                    }
                })
            }
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
        setError(prev => undefined);
    }


 return(
    <div className ="authform login">
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
                Sign in to your account
            </h1>
            <small>
                Not a member?
                <Link to = "/register">
                    Register
                </Link>
            </small>
        </div>
        {/* {
                error &&
                <span className="error">
                    {error}
                </span>
        } */}
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
            <input type = "submit" value = "Login" />
            
        </form>
    </div>
 );
}

export default Login;

