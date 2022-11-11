import {
    Link,
    useLocation,
    useSearchParams,
    useNavigate
} from 'react-router-dom';
import 'animate.css';

import {Store} from 'react-notifications-component';

import {
    InputField
} from '../shared/';

import {Icon} from '@iconify/react';
import { useEffect, useState } from 'react';

import {
    Loader
} from '../shared/';

import useAuthContext from '../../hooks/useAuthContext';
import SubmitBtnContainer from '../styled/SubmitButton.styled';

function Register(){
    const location = useLocation();
    const email = useSearchParams()[0].get('email');

    const {register} = useAuthContext();

    const navigate = useNavigate();

    const [submitting,setSubmitting] = useState(false);
    const [valid,setValid] = useState({
        email : false,
        password : false,
        username : true,
        repeat_password : false
    });

    const [data,setData] = useState({
        email : "",
        password : "",
        username : "",
        repeat_password : ""
    })

    const [errors,setErrors] = useState({
        email : null,
        password : null,
        username : null,
        repeat_password : null
    })

    const [msg,setMsg] = useState({
        email : null,
        password : null,
        username : null,
        repeat_password : null
    })

    useEffect(() => {
        if(email) {
            setData(prev => (
                {
                    ...prev,
                    email : email
                }
            ))
            validateEmail(email)
        }
    },[])

    const {validEmail,validPassword} = useAuthContext();

    const registerHandler = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        register(data)
            .then(res => {
                setSubmitting(false);
                navigate({
                    pathname : '/login',
                    search : `?email=${data.email}`
                });
                Store.addNotification({
                    title: "Wonderful!",
                    message: "Account created successfully!",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true,
                      pauseOnHover : true
                    }
                });
            })
            .catch(err => {
                setSubmitting(false)
                const errors = err?.response?.data?.errors;
                for(const key in errors){
                    setErrors(prev => (
                        {
                            ...prev,
                            [key] : errors[key] 
                        }
                    ))
                    setMsg(prev => (
                        {
                            ...prev,
                            [key] : null 
                        }
                    ))
                }
                console.log(errors)
            })
    }

    const validateEmail = async (email) => {
        validEmail(email)
            .then(res => {
                setMsg(prev => (
                    {
                        ...prev,
                        email : "valid email"
                    }
                ))
                setValid(prev => (
                    {
                        ...prev,
                        email : true
                    }
                ))
            })
            .catch(err => {
                setErrors(prev => (
                    {
                        ...prev,
                        email : "invalid email"
                    }
                ))
            })
    }

    const emailChangeHandler = async (e) => {
        validEmail(e.target.value)
            .then(res => {
                console.log('res = ',res);
                setMsg(prev => (
                    {
                        ...prev,
                        email : "valid email"
                    }
                ))
                setErrors(prev => (
                    {
                        ...prev,
                        email : null
                    }
                ))
                setValid(prev => (
                    {
                        ...prev,
                        email : true
                    }
                ))
            })
            .catch(err => {
                setErrors(prev => (
                    {
                        ...prev,
                        email : "invalid email"
                    }
                ))
                setMsg(prev => (
                    {
                        ...prev,
                        email : null
                    }
                ))
                setValid(prev => (
                    {
                        ...prev,
                        email : false
                    }
                ))
            })
    }


    const passwordChangeHandler = async (e) => {
        validPassword(e.target.value)
            .then(res => {
                console.log(res);
                setMsg(prev => (
                    {
                        ...prev,
                        password : res
                    }
                ))
                setErrors(prev => (
                    {
                        ...prev,
                        password : null
                    }
                ))
                setValid(prev => (
                    {
                        ...prev,
                        password : true
                    }
                ))
            })
            .catch(err => {
                console.log(err)
                setErrors(prev => (
                    {
                        ...prev,
                        password: err
                    }
                ))
                setMsg(prev => (
                    {
                        ...prev,
                        password : null
                    }
                ))
                setValid(prev => (
                    {
                        ...prev,
                        password : false
                    }
                ))
            })
    }

    const passwordMatchHandler = (e) => {
        // console.log('passwordMatchHandler',data.password == e.target.value)
        // console.log(data.password,e.target.value)
        if(e.target.value != data.password){
            setErrors(prev => (
                {
                    ...prev,
                    repeat_password : "password doesn't match"
                }
            ))
            setMsg(prev => (
                {
                    ...prev,
                    repeat_password : null
                }
            ))
            setValid(prev => (
                {
                    ...prev,
                    repeat_password : false
                }
            ))
        }else{
            setMsg(prev => (
                {
                    ...prev,
                    repeat_password : 'password matched'
                }
            ))
            setErrors(prev => (
                {
                    ...prev,
                    repeat_password : null
                }
            ))
            setValid(prev => (
                {
                    ...prev,
                    repeat_password : true
                }
            ))
        }
    }

    const changeHandler = (e) => {
        // console.log(e.target.value);
        setData(prev => (
            {
                ...prev,
                [e.target.name] : e.target.value
            }
        ))
        if(e.target.name == 'email') emailChangeHandler(e);
        if(e.target.name == 'password') passwordChangeHandler(e);
        if(e.target.name === 'repeat_password') passwordMatchHandler(e);
        // console.log('valid = ',valid)
    }

    return(
        <div className = "authcontainer__main login discord-bounce">
            <div className = "authcontainer__main__header">
                <h2>
                    Create an account
                </h2>
            </div>
            <form 
                className = "authcontainer__main__body"
                onSubmit = {registerHandler}    
            > 
                <InputField 
                    name = "username"
                    label = "Username"
                    type = "text"
                    icon = "akar-icons:person"
                    value = {data.username}
                    onChange = {changeHandler}
                    error = {errors.username}
                    focusColor = "var(--discord-blue)"
                    msg = {msg.username}
                />
                <InputField 
                    name = "email"
                    label = "Email"
                    type = "text"
                    icon = "codicon:mail"
                    value = {data.email}
                    onChange = {changeHandler}
                    error = {errors.email}
                    focusColor = "var(--discord-blue)"
                    msg = {msg.email}
                />
                <InputField 
                    name = "password"
                    label = "Password"
                    type = "password"
                    icon = "bx:lock"
                    value = {data.password}
                    onChange = {changeHandler}
                    focusColor = "var(--discord-blue)"
                    error = {errors.password}
                    msg = {msg.password}
                />
                 <InputField 
                    name = "repeat_password"
                    label = "re-enter password"
                    type = "password"
                    icon = "bx:lock"
                    value = {data.repeat_password}
                    onChange = {changeHandler}
                    focusColor = "var(--discord-blue)"
                    error = {errors.repeat_password}
                    msg = {msg.repeat_password}
                />
                <Link 
                    className = "small"
                    to = "/password-reset" >
                    forgot password?
                </Link>
                <SubmitBtnContainer 
                    className={
                        `
                        submitBtn
                        ${submitting ? "registering" : ""}
                        ${!(valid.email && valid.password && valid.repeat_password && valid.username) ? "invalid" : ""}
                        `
                    }
                    type = "submit"

                >
                    {
                        !submitting ? 
                        "Register":
                        <Loader 
                            icon = "fluent:spinner-ios-20-filled"
                            className = "loading"
                        />
                    }
                </SubmitBtnContainer>
                <p className = "small authcontainer__main__footer">
                    Already have account?
                    <Link 
                        to = {{
                            pathname : "/login",
                            search : `?email=${data.email}`
                        }}
                    >
                        login
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Register;