import React,{
    useState
} from "react";
import useAxios from "../../hooks/useAxios";
import endpoints from "../../utils/endpoints/otherEndpoints";
import './CreateGoal.comp.css';

import useNotification from '../../hooks/useNotification';

function CreateGoal({toggle,setGoals,submitCreateGoal,getTask,groupId,taskId}){

    const [data,setData] = useState({
        goals_title : "",
        goals_description : "",
        goals_deadline : "",
    })

    const [errors,setErrors] = useState({
        goals_description : null
    })
    const createNotification = useNotification();
    const axiosInstance = useAxios();

    const changeHandler = (e) => {
        console.log(e.target.value);
        setData(prev => (
            {
                ...prev,
                [e.target.name] : e.target.value
            }
        ))
        setErrors(prev => (
            {
                ...prev,
                [e.target.name] : null
            }
        ))
    }

    const submitHandler = (e) => {
        if(data.goals_description.length > 100){
            setErrors(prev => (
                {
                    ...prev,
                    goals_description : "too long"
                }
            ))
            return;
        }
        
        if(submitCreateGoal){
            console.log('submitting goal',data)
            axiosInstance.post(`${endpoints.createGoal}/${groupId}/${taskId}`,data)
                .then(res => {
                    createNotification("success","goal created","goal created successfully",5000)
                    getTask();
                })
                .catch(err => console.log('err = ',err))
        }

        if(setGoals){
            setGoals(prev => (
                [
                    ...prev,
                    data
                ]
            ))
        }

        
        toggle();
    }


    return(
        <>
            <div action="" className="creategoal-container" >
                <h3> Create Goal</h3>
                <div className = "field">
                    <label>title</label>
                    <input name = "goals_title" type="text" onChange = {changeHandler}/>
                </div>
                <div className = "field">
                    <label>description</label>
                    <textarea 
                        className={`${errors.goals_description ? "error" : ""}`}
                        name = "goals_description" type="text" onChange = {changeHandler}/>
                    {
                        errors?.goals_description &&
                        <small className="error">
                            {errors?.goals_description}
                        </small>
                    }
                </div>
                <div className = "field">
                    <label>deadline</label>
                    <input name = "goals_deadline" type="date" onChange = {changeHandler}/>
                </div>
                <button onClick = {submitHandler}>
                    add goal
                </button>
            </div>
        </>
    )
}

export default CreateGoal;