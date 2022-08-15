import React,{
    useState
} from 'react';

export const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {

    const [user,setUser] = useState(localStorage.getItem('user') ? localStorage.getItem('user') : undefined);

    const value = {
        user,
        setUser
    }

    return(
        <AuthContext.Provider 
            value = {value} 
        >
            {children}
        </AuthContext.Provider>
    )
}