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
// import useSocketContext from '../../hooks/useSocketContext';

// const socket = io();

function GroupChat({className,group}){

    const msgAreaRef = useRef(null);
    const msgRef = useRef(null);

    const {user} = useAuthContext();

    // const {socket} = useSocketContext();

    const sendMsg = (e) => {
        // e.preventDefault();
        // const msg = msgRef.current.value;
        // const data = {
        //     message:msg,
        //     userId:user.id,
        //     room:group
        // }
        // socket.emit('new-chat-message',data);
    }



    useEffect(() => {
        // console.log('socket = ',socket)
        msgAreaRef.current.scrollTop = msgAreaRef.current.scrollHeight;
        return () => {
        };
    },[])
    

    return(
        <div
            className = {`${className ? className : ""} chatbox-container`}
        >
            <div className="title">
                Learn UI/UX
            </div>
            <div 
                className="msg-area" 
                ref = {msgAreaRef}
            >
                <span className="date">
                    Oct 10,2023 10:00pm
                </span>
                <Msg 
                    username = "hari"
                    flag = "recieved"
                    msg = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias blanditiis esse quo ab sapiente dolorum rerum quos quaerat. Eum, maiores?"
                />
                <Msg 
                    flag = "sent"
                    msg = "ok"
                />
                <Msg 
                username = "hari"
                    flag = "recieved"
                    msg = "itiis esse quo ab sapient?"
                />
                <Msg 
                username = "hari"
                    flag = "recieved"
                    msg = "ok lets lorem ti"
                />
                <Msg 
                    flag = "sent"
                    msg = "itiis esse quo ab sapient?"
                />
                <Msg 
                    username = "shyam"
                    flag = "recieved"
                    msg = "ok lets lorem ti"
                />
                <Msg 
                    username = "shyam"
                    flag = "recieved"
                    msg = "ok lets lorem ti"
                />
                <Msg 
                    flag = "sent"
                    msg = "itiis esse quo ab sapient?"
                />
                <Msg 
                username = "unnsdfsa"
                    flag = "recieved"
                    msg = "ok lets lorem ti"
                />
                <Msg 
                username = "unnsdfsa"
                    flag = "recieved"
                    msg = "ok lets lorem ti"
                />
                <Msg 
                    flag = "sent"
                    msg = "itiis esse quo ab sapient?"
                />
                <Msg 
                username = "Sita"
                    flag = "recieved"
                    msg = "ok lets lorem ti"
                />
                <Msg 
                    flag = "sent"
                    msg = "ok lets lorem ti"
                />
                <Msg 
                    flag = "sent"
                    msg = "itiis esse quo ab sapient?"
                />
                <Msg 
                username = "Sita"
                    flag = "recieved"
                    msg = "ok lets lorem ti"
                />
            </div>
            <div className="input-area">
                <form action="" onSubmit = {sendMsg}>
                    <input 
                        name="msg" 
                        type="text" 
                        placeholder = "Enter message here" 
                        autoFocus = {true}
                        ref = {msgRef}
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