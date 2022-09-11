import React,{
    useState
} from 'react';
import { toast } from 'react-toastify';
import { useAxios } from '../../hooks';
import './ConfirmDeleteGroup.css';

const ConfirmDeleteGroup = ({toggleModal,setGroups,groups,groupDeleteId}) =>{
  
    const axiosInstance = useAxios();

    const [confirm,setConfirm] = useState(false);

    console.log('groups = ',groups,groupDeleteId);

    async function deleteGroup(){
        try{
            const res = await axiosInstance.delete(`/api/group/${groupDeleteId}/delete`);
            console.log(res);
            setGroups(prev => (
                prev.filter(el => el._id !== groupDeleteId)
            ))
            toggleModal();
            toast.success(res.data.message)
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className = 'confirmdeletegroup'>
            <div className="container">
                <h2>
                    Delete group
                </h2>
                <p>
                    Are you sure you want to delete?
                </p>
                <div className="bottom">
                    <button onClick = {deleteGroup}>
                        confirm delete 
                    </button>
                </div>
            </div>
        </div>

    );
}

export default ConfirmDeleteGroup;

