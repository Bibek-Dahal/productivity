import axios from 'axios';
import useAuthContext from './useAuthContext';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import {Store} from 'react-notifications-component';
import {useNavigate} from 'react-router-dom';

function useAxios(){

    const {token,logout} = useAuthContext();

    const baseURL = 'http://127.0.0.1:8000'

    const axiosInstance = axios.create({
        baseURL,
        headers : {
            Authorization : `Bearer ${token}`
        }
    })

    const navigate = useNavigate();

    axiosInstance.interceptors.request.use(req => {
        console.log('intercepted axios',token);

        if(token){
            const user =  jwt_decode(token);
            console.log('user = ',user)
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

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
            console.log('req = ',req)
            req.headers.Authorization = `Bearer ${token}`
            return req;
        }
        console.log('req = ',req)

        return req;
    })

    return axiosInstance;
}


export default useAxios;