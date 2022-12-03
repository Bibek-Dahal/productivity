import { Icon } from "@iconify/react";
import React from "react";

import './Msg.comp.css';

function Msg({flag,msg,username}){
    return(
        <div 
            className={`msg-box-container ${flag ? flag : ""}`}
        >
            <div className="profile">
                <img src="https://picsum.photos/200" alt="" />
            </div>
            <div 
                className={`msg-box ${flag ? flag : ""}`}
            >       
            <span className="username">{username}</span>
                <div className="msg">
                    {msg}
                    <div className="tip">
                        <Icon icon = "codicon:triangle-left" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Msg;