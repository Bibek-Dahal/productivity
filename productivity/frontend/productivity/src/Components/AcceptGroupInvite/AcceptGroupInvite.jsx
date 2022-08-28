import React,{
    useEffect
} from 'react';
import './AcceptGroupInvite.css';

import {
    useParams,
    useNavigate
} from 'react-router-dom';
import { useAxios } from '../../hooks';
import endpoints from '../../utils/endpoints';

const AcceptGroupInvite = () =>{

    const {group_name,accept_token} = useParams();
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const joinGroup = async () => {
        try{
            const res = await axiosInstance.post(`/api/group/${group_name}/join/${accept_token}`);
            console.log(res);
            if(res.status == 200) navigate(`/group/${res.data?.group._id}/`)
        }catch(err){
            console.log('error occures = ',err);
        }
    }

    useEffect(() => {
      
        joinGroup()
    
      return () => {
        
      }
    }, [])
    


    return(
        <div className = 'acceptgroupinvite'>
            AcceptGroupInvite
        </div>

    );
}

export default AcceptGroupInvite;

