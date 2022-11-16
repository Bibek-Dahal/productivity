import React,{useState} from 'react';
import socketio from 'socket.io-client';

export const SocketContext = React.createContext() 

const socketconn = socketio.connect('http://127.0.0.1:8000');

function SocketProvider({children}){
    const [socket,setSocket] = useState(socketconn);

    const value = {
        socket,
        setSocket
    }

    return(
        <SocketContext.Provider
            value = {value}
        >
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;