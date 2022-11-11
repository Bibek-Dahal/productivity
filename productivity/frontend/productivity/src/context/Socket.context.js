import React,{useState} from 'react';

export const SocketContext = React.createContext() 

function SocketProvider({children}){
    const [socket,setSocket] = useState(null);

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