import {
    Link,
    useLocation,
    useSearchParams,
    useNavigate
} from 'react-router-dom';

import {
    InputField,
    SideModal
} from '../shared/';

import {Store} from 'react-notifications-component';

import {Icon} from '@iconify/react';
import { useEffect, useState } from 'react';

import {
    EmailVerification
} from '../';

import {
    Loader
} from '../shared/';

import useAuthContext from '../../hooks/useAuthContext';

import SubmitBtnContainer from '../styled/SubmitButton.styled';

function Login(){
    const [submitting,setSubmitting] = useState(false);
    const [valid,setValid] = useState({
        email : true,
        password : true
    });
    const [data,setData] = useState({
        email : "",
        password : ""
    })
    const [errors,setErrors] = useState({
        email : null,
        password : null
    })
    const [msg,setMsg] = useState({
        email : null,
        password : null
    })

    const [showVerification,setShowVerification] = useState(false);

    const navigate = useNavigate();

    const email = useSearchParams()[0].get('email');
    const paramMsg = useSearchParams()[0].get('msg');

    // console.log(useSearchParams()[0])
    const {login}  = useAuthContext()

    // console.log(useSearchParams()[0].get('email'))

    const {validEmail,validPassword} = useAuthContext();

    const location = useLocation();

    const from  = location.state?.from ? location.state?.from : '/dashboard';

    useEffect(() => {
        console.log('location = ',location)
    },[])

    const loginHandler = (e) => {
        e.preventDefault();
        // console.log('logging = ',data)
        setSubmitting(true);
        login(data)
            .then(res => {
                setSubmitting(false);
                console.log('res = ',res);
                Store.addNotification({
                    title: "Successfull!",
                    message: "logged in successfully",
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
                console.log('navigating to dashboard');
                navigate(from.pathname);
            })
            .catch(err => {
                console.log('inside catch',err)
                setSubmitting(false)
                if(err?.response.status == "403"){
                    console.log('verify');
                    Store.addNotification({
                        title: "Verification incomplete!",
                        message: "check your email for verification token or resend verification!",
                        type: "danger",
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
                    setShowVerification(prev => !prev);
                }else{
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
                }
            })
    }
    
    const changeHandler = (e) => {
        setData(prev => (
            {
                ...prev,
                [e.target.name] : e.target.value
            }
        ))
        // if(e.target.name == 'email') emailChangeHandler(e);
        // if(e.target.name == 'password') passwordChangeHandler(e);
    }

    useEffect(() => {
        if(email) setData(prev => (
            {
                ...prev,
                email : email
            }
        ))
        if(paramMsg) {
            Store.addNotification({
                title: "Wonderful!",
                message: paramMsg,
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
        }
    },[])

    return(
        <>
            <div className = "authcontainer__main login discord-bounce">
                <div className = "authcontainer__main__header">
                    {/* logo here */}
                    <h2>
                        welcome back!
                    </h2>
                    <p
                        className='secondary-text'
                    >
                        We're so excited to see you again!
                    </p>
                </div>
                <form 
                    className = "authcontainer__main__body"
                    onSubmit = {loginHandler}    
                > 
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
                    <Link
                        className = "small"
                        to = "/password-reset" >
                        forgot password?
                    </Link>
                    <SubmitBtnContainer
                        className={
                            `
                            submitBtn
                            ${submitting ? "submitting" : ""}
                            ${!(valid.email && valid.password) ? "invalid" : ""}
                            `
                        }
                        type = "submit"

                    >
                        {
                            !submitting ? 
                            "Login":
                            <Loader 
                                icon = "fluent:spinner-ios-20-filled"
                                className = "loading"
                            />
                        }
                    </SubmitBtnContainer>
                <p className = "small authcontainer__main__footer">
                        Need an account?
                        <Link 
                            to = {{
                                pathname : "/register",
                                search : `?email=${data.email}`
                            }}>
                            register
                        </Link>
                </p>
                </form>
            </div>
            
            {
                showVerification &&
                <SideModal
                    toggle = {() => setShowVerification(prev => !prev)}
                >
                    <EmailVerification 
                        email = {data.email}
                        toggleModal = {() => setShowVerification(prev => !prev)}
                    />
                </SideModal>
            }
        </>
    )
}

export default Login;