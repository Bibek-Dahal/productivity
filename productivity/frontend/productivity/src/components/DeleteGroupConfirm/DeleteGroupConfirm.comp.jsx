import SubmitBtnContainer from "../styled/SubmitButton.styled";
import {Store} from 'react-notifications-component';
import useAxios from "../../hooks/useAxios";
import baseURL from "../../utils/endpoints/baseURL";

function DeleteGroupConfirm({toggle,deleteIt}){
    
    const axiosInstance = useAxios();

    const deleteGroup = async (e) => {
        e.preventDefault();
        // const res = await axiosInstance.delete(`${baseURL}/api/group/${groupId}/delete`);
    }
    
    return(
        <h2>
            Delete Group
            <form onSubmit={deleteGroup}>
                <p>
                    Do you want to delete group?
                </p>
                <SubmitBtnContainer
                    onClick = {() => {
                        toggle()
                        deleteIt();
                    }}
                >
                    confirm
                </SubmitBtnContainer>
            </form>
        </h2>
    )
}


export default DeleteGroupConfirm;