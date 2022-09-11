import React,{
    useState
} from 'react';
import './VerifyToken.css';
import {
    useNavigate,
    useParams,
    Navigate
} from 'react-router-dom';
import { useEffect } from 'react';
import { useAxios } from '../../hooks';
import { toast } from 'react-toastify';
import {Loader} from '../index';

const VerifyToken = () =>{
  
    const {user_id,token} = useParams();
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const [verified,setVerified] = useState(false);

    const verifyUser = async () => {
        try{
            const res = await axiosInstance.post(`/api/user/${user_id}/verify/${token}`)
            console.log(res);
            if(res.status == "200"){
                toast.success(res.data.message);
                setVerified(true);
            }
        }catch(err){
            console.log('error = ',err);
        }
    }

    useEffect(() => {
        verifyUser();
    },[])

    return(
        <div className = 'verifytoken'>
            {
                !verified ?
                    <Loader 
                        icon = "lucide:loader-2"
                        text = "verifying..."
                        fontSize = "3rem"
                    />:
                    <Navigate to = "/login" />    
            }
        </div>

    );
}

export default VerifyToken;

