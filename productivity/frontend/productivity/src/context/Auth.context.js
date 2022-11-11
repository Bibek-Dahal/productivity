import React,{
    useEffect,
    useState
} from "react";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import baseURL from '../utils/endpoints/baseURL';
import endpoints from '../utils/endpoints/authEndpoints';


export const AuthContext = React.createContext();

function AuthProvider({children}){

    const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : null)
    const [user,setUser] = useState(localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : null)

    const validEmail = (email) => {
        return new Promise((resolve,reject) => {
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return resolve('email valid');
            return reject('email invalid')
        })
    }

    const validPassword = async (password) => {
        return new Promise((resolve,reject) => {
            if(!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)) return reject('invalid password')
            // if(!/.{8,}/.test(password)) return reject('at least 8 characters')
            // if(!/(?=.*?[A-Z])/.test(password)) return reject('at least one upper case')
            // if(!/(?=.*?[a-z])/.test(password)) return reject('at least one lower case')
            // if(!/(?=.*?[0-9])/.test(password)) return reject('at least one digit')
            // if(!/(?=.*?[#?!@$%^&*-])/.test(password)) return reject('at least one special character')
            return resolve('valid strong password')
        })
    }
    
    const register = async (data) => {
        return new Promise(async (resolve,reject) => {
            try{
                const res = await axios.post(`${baseURL}${endpoints.register}`,data)
                console.log(res);
                resolve(res);
            }catch(err){
                console.log('error while registering',err);
                reject(err);
            }
        })
    }

    const login = async (data) => {
        return new Promise(async (resolve,reject) => {
            try{
                const res = await axios.post(`${baseURL}${endpoints.login}`,data)
                localStorage.setItem('token',res.data.token);
                setUser(jwt_decode(res.data.token));
                setToken(res.data.token);
                resolve(res);
            }catch(err){
                // console.log('error while logging',err);
                reject(err);
            }
        })
    }

    const logout = async () => {
        return new Promise( (resolve,reject) => {
            localStorage.removeItem('token');
            setUser(null);
            setToken(null);
            resolve('logged out successfully');
        })
    }

    let value = {
        data : "this is a dummy data",
        validEmail : validEmail,
        validPassword : validPassword,
        register : register,
        token : token,
        login : login,
        user : user,
        logout : logout
    }
    useEffect(() => {
        value.user = user;
        value.token = token
    },[user,token])

    return(
        <AuthContext.Provider
            value = {value}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;