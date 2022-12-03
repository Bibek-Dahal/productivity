import {
    useEffect,
    useState
} from 'react';

import {Store} from 'react-notifications-component';

import axios from 'axios';

import { InputField,Loader } from "../shared";
import SubmitBtnContainer from '../styled/SubmitButton.styled';

import './EmailVerification.comp.css';
import baseURL from '../../utils/endpoints/baseURL';
import endpoints from '../../utils/endpoints/authEndpoints';
import useAuthContext from '../../hooks/useAuthContext';

function EmailVerification({email:mail,toggleModal}){

    const [submitting,setSubmitting] = useState(false);
    const [email,setEmail] = useState("");
    const [emailError,setEmailError] = useState("");
    const [emailMsg,setEmailMsg] = useState("");
    const [valid,setValid] = useState(false);

    const {validEmail} = useAuthContext();

    const changeHandler = (e) => {
        setEmail(prev => (
            e.target.value
        ))
        validEmail(email)
            .then(res => {
                setEmailMsg(res)
                setEmailError("")
            })
            .catch(err =>{
                setEmailError(err)
                setEmailMsg("")
            })
    }

    const sendVerificationEmail = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try{
            const res = await axios.post(`${baseURL}${endpoints.resendVerification}`,{
                email : email
            });
            setSubmitting(false);
            console.log('res = ',res);
            Store.addNotification({
                title: "Wonderful!",
                message: res?.data?.message,
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
            toggleModal();
        }catch(err){
            setSubmitting(false);
            console.log(err);
        }
    }

    useEffect(() => {
        console.log('mail = ',mail)
        if(mail){
            setEmail(mail);
            setValid(true);
        };
    },[])

    return(
        <div className="emailverification-container">
            <h2>
                Resend email verification
            </h2>
            <form
                onSubmit = {sendVerificationEmail}
            >
                <InputField 
                    name = "email"
                    label = "Email"
                    type = "text"
                    icon = "codicon:mail"
                    value = {email}
                    onChange = {changeHandler}
                    error = {emailError}
                    focusColor = "var(--discord-blue)"
                    msg = {emailMsg}
                />
                <SubmitBtnContainer
                    className = {!valid ? "invalid" : ""}
                >
                    {
                        !submitting ? 
                        "verify":
                        <Loader 
                            icon = "fluent:spinner-ios-20-filled"
                            className = "loading"
                        />
                    }
                </SubmitBtnContainer>
            </form>
        </div>
    )
}

export default EmailVerification;