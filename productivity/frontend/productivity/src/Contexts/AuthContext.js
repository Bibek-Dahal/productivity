import React,{
    useState
} from 'react';

import jwt_decode from 'jwt-decode';
import endpoints,{baseURL} from '../utils/endpoints';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {

    const [token,setToken] = useState(() => localStorage.getItem('token') ? localStorage.getItem('token') : null);
    const [user,setUser] = useState(() => localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : null);

    const navigate = useNavigate();
        
    const loginUser = async (formData,setLoading,setError,setErrors,from,setShowResendBtn) => {
        console.log(formData)
        try{
            setShowResendBtn(false);
            setLoading(1);
            let res = await axios.post(`${baseURL}${endpoints.login}`,formData);
            setLoading(0);
            console.log('res = ',res.data,jwt_decode(res.data.token));
            const user = jwt_decode(res.data.token);
            setUser(user);
            setToken(res.data.token);
            localStorage.setItem('token',res.data.token);
            console.log(res)
            navigate(from);
            toast.success(res.data.message);
        }catch(err){
            setLoading(0);
            const errStatus = err.response?.status;
            console.log('error = ',err)
            if(errStatus == 400){
                const errs = err.response.data.errors;
                setErrors(prev => errs);
                Object.values(errs).forEach(err => toast.error(err));
            }else{
                setError(prev => err.response?.data.message);
                toast.error(err.response?.data.message);
                setErrors(prev => {
                    return{
                        email : "wrong",
                        password : "wrong"
                    }
                })
                if(err.response.status === 403){
                    setShowResendBtn(true);
                }
            }
        }
    }


    const logoutUser = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        navigate('/login')
        toast.success('logged out successfully');
    }


    const value = {
        user,
        setUser,
        loginUser,
        token,
        setToken,
        logoutUser
    }

    return(
        <AuthContext.Provider 
            value = {value} 
        >
            {children}
        </AuthContext.Provider>
    )
}