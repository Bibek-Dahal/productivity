import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import {
    useContext
} from 'react';

import {
    useAuthContext
} from '../hooks/index';

import {
    useEffect
} from 'react';

import {
    useNavigate
} from 'react-router-dom'

const baseURL = 'http://127.0.0.1:8000';

const useAxios = () => {
    const {token,setUser,setToken,logoutUser} = useAuthContext()

    const navigate = useNavigate();

    const axiosInstance = axios.create({
        baseURL,
        headers : {
            Authorization : `Bearer ${token}`
        }
    })

    axiosInstance.interceptors.request.use(async req => {
        if(token){
            const user = jwt_decode(token);
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
            
            if(!isExpired) return req;
            else{
                logoutUser();
            navigate('/login');
            }
            req.headers.Authorization = `Bearer ${token}`;
            return req;
        }
        
        return req;
    })

    return axiosInstance;
}

export default useAxios;