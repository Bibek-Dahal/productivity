import React,{
    useEffect,
    useState
} from 'react';
import './AcceptGroupInvite.css';

import {
    useParams,
    Navigate,
    useNavigate
} from 'react-router-dom';

import {
    Loader
} from '../index';

import { useAxios } from '../../hooks';
import endpoints from '../../utils/endpoints';
import { toast } from 'react-toastify';

const AcceptGroupInvite = () =>{

    const {group_name,accept_token} = useParams();
;
    const [groupId,setGroupId] = useState("");
    const axiosInstance = useAxios();
    const [joined,setJoined] = useState(false);
    const navigate = useNavigate();
    const [group,setGroup] = useState({});

    const joinGroup = async () => {
        try{
            const res = await axiosInstance.post(`/api/group/${group_name}/join/${accept_token}`);
            console.log(res);
            if(res.status == 200){
                toast.success(res.data.message);
                setJoined(true);
                setGroupId(res.data.groupId);
            }
        }catch(err){
            console.log('error occures = ',err);
        }
    }

    useEffect(() => {
        joinGroup()
    }, [])

    return(
        <div className = 'acceptgroupinvite'>
             {
                !joined ?
                    <Loader 
                        icon = "lucide:loader-2"
                        text = "verifying token..."
                        fontSize = "4rem"
                    />:
                    <Navigate to = {`/group/${groupId}`} />    
            }
        </div>
    );
}

export default AcceptGroupInvite;

