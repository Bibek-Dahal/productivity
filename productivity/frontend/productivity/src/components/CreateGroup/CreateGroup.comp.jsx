import { useState } from "react";
import { InputField,TextArea,Loader } from "../shared";

import SubmitBtnContainer from "../styled/SubmitButton.styled";

import useAxios from '../../hooks/useAxios';
import {Store} from 'react-notifications-component';

import './CreateGroup.comp.css';
import baseURL from "../../utils/endpoints/baseURL";
import endpoints from "../../utils/endpoints/otherEndpoints";

function CreateGroup({groups,toggle,setGroups}){

    const [submitting,setSubmitting] = useState(false);

    const [valid,setValid] = useState({
        name : true,
        description : true
    })

    const [data,setData] = useState({
        name : "",
        description : ""
    })

    const [errors,setErrors] = useState({
        name : null,
        description : null
    });

    const [nameMsg,setNameMsg] = useState(null);

    const axiosInstance = useAxios();

    const groupNameChangeHandler = (e) => {
        console.log('group change handler')
        console.log('checking for name in database')
        axiosInstance.post(`${baseURL}${endpoints.groupExists}`,{
            name : e.target.value
        })
        .then(res => {
            console.log('res = ',res);
            setErrors(prev => ({
                ...prev,
                name : null
            }))
            setValid(prev => (
                {
                    ...prev,
                    name : true
                }
            ))
        })
        .catch(err => {
            console.log('error = ',err);
            const errors = err?.response?.data?.errors;
            if(errors){
                for(const key in errors){
                    setErrors(prev => ({
                        ...prev,
                        [key] : errors[key]
                    }))
                    setValid(prev => (
                        {
                            ...prev,
                            [key] : false
                        }
                    ))
                }
            }
        })

    }

    const descriptionChangeHandler = (e) => {
        // if valid name
        
    }

    const onChangeHandler = (e) => {
        console.log('change handler')
        setData(prev => (
            {
                ...prev,
                [e.target.name] : e.target.value
            }
        ))
        if(e.target.name == 'name') groupNameChangeHandler(e);
        if(e.target.name == 'description') descriptionChangeHandler(e);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log('submitting',data);
        axiosInstance.post(`${baseURL}${endpoints.createGroup}`,data)
            .then(res =>{
                console.log('res = ',res)
                Store.addNotification({
                    title: "Successfull!",
                    message: "Group created successfully",
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
                setGroups(prev => (
                    [
                        ...prev,
                        res.data.group
                    ]
                ))
                toggle();
            })
            .catch(err => {
                const errors = err?.response?.data?.errors;
                for(const key in errors){
                    setErrors(prev => ({
                        ...prev,
                        [key] : errors[key]
                    }))
                }
                console.log('error creating group',err)
            })
    }

    return(
        <div
            className = "create-group"
        >   
                <h2>
                    Create group
                </h2>
                <form
                    onSubmit = {onSubmitHandler}
                >
                    <InputField 
                        name = "name"
                        label = "name"
                        type = "text"
                        value = {data.name}
                        onChange = {onChangeHandler}
                        error = {errors.name}
                        focusColor = "var(--discord-blue)"
                        msg = {nameMsg}
                    />
                    <TextArea 
                        name = "description"
                        label = "description"
                        value = {data.description}
                        onChange = {onChangeHandler}
                        focusColor = "var(--discord-blue)"
                        className = "textarea"
                    />
                     <SubmitBtnContainer
                            className={
                                `
                                submitBtn
                                ${submitting ? "submitting" : ""}
                                ${!(valid.name && valid.description) ? "invalid" : ""}
                                `
                            }
                            type = "submit"
                    >
                        {
                            !submitting ? 
                            "create group":
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

export default CreateGroup;