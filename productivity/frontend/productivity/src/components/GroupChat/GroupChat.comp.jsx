import React,{useRef} from "react";
import {Icon} from '@iconify/react';
import {
    Msg
} from '../shared/'

import './GroupChat.comp.css';
import { useEffect } from "react";

import io from 'socket.io-client'
import { useState } from "react";

const socket = io();

function GroupChat({className}){

    // const [isConnected,setIsConnected] = useState(socket.connected)
    const [socket,setSocket] = useState(null);

    const msgAreaRef = useRef(null);

    useEffect(() => {
        msgAreaRef.current.scrollTop = msgAreaRef.current.scrollHeight
        console.log('creating connection')
      
        const newSocket = io(`http://${window.location.hostname}:8000`);
        setSocket(newSocket);
        
        return () => {
            newSocket.close()
        };
    },[setSocket])
    

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
                <form action="">
                    <input name="" type="text" placeholder = "Enter message here" autoFocus = {true}/>
                    <button type = "submit">
                        <Icon icon = "fluent:send-20-filled" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default GroupChat;