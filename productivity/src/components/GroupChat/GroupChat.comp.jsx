import React,{useRef} from "react";
import {Icon} from '@iconify/react';
import {
    Msg
} from '../shared/'

import './GroupChat.comp.css';
import { useEffect } from "react";

import io from 'socket.io-client'
import { useState } from "react";

import useAuthContext from '../../hooks/useAuthContext';
import useSocketContext from '../../hooks/useSocketContext';
import endpoints from "../../utils/endpoints/otherEndpoints";
import useAxios from "../../hooks/useAxios";
import { Button } from "@mantine/core";

import {useNavigate} from 'react-router-dom';
import baseURL,{baseURLFront} from "../../utils/endpoints/baseURL";


function GroupChat({className,group}){

    const msgAreaRef = useRef(null);
    const msgRef = useRef(null);

    const [localUser,setLocalUser] = useState(null);
    const [msgs,setMsgs] = useState([]);
    const [typing,setTyping] = useState([]);

    const {user} = useAuthContext();
    const axiosInstance = useAxios();
    const {socket} = useSocketContext();
    console.log('typing',typing)
    const sendMsg = (e) => {
        e.preventDefault();
        const msg = msgRef.current.value;
        msgRef.current.value = "";
        const data = {
            message:msg,
            userId:user.id,
            room:group
        }
        socket.emit('new-chat-message',data);
    }

    const navigate = useNavigate();

    const stoppedTyping = () => {
        console.log('stopped typing')
        socket.emit('typing-stopped',{
            user : localUser,
            room : group
        })
    }

    const sendTypingSignal = (e) => {
        console.log('started typing')
        let timer;
        clearTimeout(timer);

        timer = setTimeout(stoppedTyping,6000)

        socket.emit('typing-signal',{
            user : localUser,
            room : group
        })
    }
    console.log('user = ',user)
    const callInGroup = () => {
        let popup = window.open(`${window.location.origin}/meet/testmeet?meet=${crypto.randomUUID()}`,"popup","fullscreen");
        if(popup){
            popup.moveTo(0,0);
            popup.resizeTo(window.screen.availWidth, window.screen.availHeight);
        }
        // socket.emit('call',{
        //     userName : localUser.username,
        //     roomId : group._id,
        //     callLink : `http://127.0.0.1:3000/${group._id}/groupCall`
        // })
    }

  

    useEffect(() => {
       if(Object.keys(group).length){
            // console.log('group = ',group)
            // socket.emit('new-user',{
            //     roomId : group._id
            // })
            socket.on('new-chat-message',(data) => {
                console.log('new chat msg = ',data);
                setMsgs(prev => (
                    [
                        ...prev,
                        data
                    ]
                ))
            })
            socket.on('typing-signal',(data) => {
                setTyping(prev => {
                    console.log('typing.includes',typing.includes(data.username))
                    if(!typing.includes(data.username)){
                        return [
                            ...prev,
                            data.username
                        ]
                    }
                })
                console.log(`${data.username} is typing`);
            })
            socket.on('typing-stopped',(data) => {
                setTyping(prev => (
                    prev.filter(p => p !== data.username)
                ))
                console.log(`${data.username} has stopped typing`);
            })
       }
       if(Object.keys(group).length){
            axiosInstance.get(`${endpoints.getAllChats}${group._id}`)
                .then(res => {
                    console.log('messages = ',res);
                    setMsgs(res.data.chats);
                })
                .catch(err => {
                    console.log('error occured',err);
                    if(err.response.status == "404"){
                        navigate('/dashboard')
                    }
                })
       }
    },[socket,group])

    useEffect(() => {
        if(user){
            axiosInstance.get(`${endpoints.getProfile}`)
                .then(res => {
                    setLocalUser(res.data.data)
                })
                .catch(err => console.log('err= ',err))
        }
    },[user])
    
    useEffect(() => {
        console.log('called',msgAreaRef.current,msgAreaRef.current.scrollTop,msgAreaRef.current.scrollHeight)
        msgAreaRef.current.scrollTop = msgAreaRef.current.scrollHeight;
    },[])

    return(
        <div
            className = {`${className ? className : ""} chatbox-container`}
        >
            <div className="title" style = {{
                display : "flex",
                alignItems : "center",
                justifyContent : "space-between"
            }}>
                {group.name}
                <button
                    onClick = {callInGroup}
                    style = {{
                        marginLeft : "2em",
                        display : "flex",
                        gap : ".5em",
                        alignItems : "center",
                        padding : ".8em 1em",
                        background : "var(--discord-blue)",
                        color : "white",
                        border : "none",
                        borderRadius : "5px",
                        fontSize : "var(--fs-n)",
                        fontWeight : "bold",
                        textTransform : "capitalize",
                        cursor : "pointer"
                    }}
                >
                    <Icon 
                        style = {{
                            fontSize : "1.5rem",
                        }}
                        
                        icon = "material-symbols:video-call-rounded" /> 
                    create meet
                </button>
            </div>
            <div 
                className="msg-area" 
                ref = {msgAreaRef}
            >
                {/* <span className="date">
                    Oct 10,2023 10:00pm
                </span> */}
                {/* <Msg 
                    username = "hari"
                    flag = "recieved"
                    msg = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias blanditiis esse quo ab sapiente dolorum rerum quos quaerat. Eum, maiores?"
                />
                <Msg 
                    flag = "sent"
                    msg = "ok"
                /> */}
                {
                    msgs.length <1 &&
                    <div
                    style = {{
                        height:"100px",
                        display : "flex",
                        alignItems : "center",
                        justifyContent : "center",
                        marginTop : "10em",
                        maxWidth : "550px",
                        marginInline : "auto",
                        flexDirection : "column",
                        gap : "1em",
                        textAlign : "center",
                        lineHeight : "1.5"
                    }}>
                        <h2
                        style = {{
                        textTransform : "uppercase"
                        }}
                        >
                            no convertations done in this group yet!
                        </h2>
                        <p
                            style = {{
                                maxWidth : "450px",
                            }}
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptatibus dignissimos excepturi alias perspiciatis non unde iusto placeat cum repellendus!
                            lets have a conversation : )
                        </p>
                    </div>
                }
                {
                    msgs.length > 0 &&
                    <>
                        {
                            msgs.map(msg => (
                                msg.user._id == user.id ?
                                    <Msg 
                                        key = {msg._id}
                                        flag = "sent"
                                        msg = {msg.text}
                                    />:
                                    <Msg 
                                        key = {msg._id}
                                        username = {msg.user.username}
                                        flag = "recieved"
                                        msg = {msg.text}
                                    />
                            ))
                        }
                    </>
                }
                {/* {
                    typing.length > 0 &&
                    <>
                        {
                            typing.map(t => (
                                <h1>
                                    {t} is typing
                                </h1>
                            ))
                        }
                    </>
                } */}
               
            </div>
            <div className="input-area">
                <form action="" onSubmit = {sendMsg}>
                    <input 
                        name="msg" 
                        type="text" 
                        placeholder = "Enter message here" 
                        autoFocus = {true}
                        ref = {msgRef}
                        // onKeyDown = {sendTypingSignal}
                    />
                    <button type = "submit">
                        <Icon icon = "fluent:send-20-filled" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default GroupChat;