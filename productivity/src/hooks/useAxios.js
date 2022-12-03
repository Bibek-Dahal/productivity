import axios from 'axios';
import useAuthContext from './useAuthContext';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import {Store} from 'react-notifications-component';
import {useNavigate} from 'react-router-dom';

import baseURL from '../utils/endpoints/baseURL';

function useAxios(){

    const {token,logout} = useAuthContext();

    const axiosInstance = axios.create({
        baseURL,
        headers : {
            Authorization : `Bearer ${token}`
        }
    })

    const navigate = useNavigate();

    axiosInstance.interceptors.request.use(req => {
        if(token){
            const user =  jwt_decode(token);
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
            console.log('intercepted')
            if(isExpired) console.log('it is expired')
            if(!isExpired) return req; 
            else 
                logout()
                    .then(res => {
                        Store.addNotification({
                            title: "Successfull!",
                            message: res,
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
                        navigate('/login');
                    })
                    .catch(err => console.log('error while logging out',err));
            req.headers.Authorization = `Bearer ${token}`
            return req;
        }

        return req;
    })

    return axiosInstance;
}


export default useAxios;