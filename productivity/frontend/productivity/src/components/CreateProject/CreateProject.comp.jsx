import { useState } from "react";
import { InputField,TextArea,Loader, SideModal } from "../shared";

import SubmitBtnContainer from "../styled/SubmitButton.styled";

import useAxios from '../../hooks/useAxios';
import {Store} from 'react-notifications-component';

import {
    CreateGoal
} from '../../components/';

import {
    SideModal2
} from '../shared/'

import {
    useParams
} from 'react-router-dom';

import './CreateProject.comp.css';
import baseURL from "../../utils/endpoints/baseURL";
import endpoints from "../../utils/endpoints/otherEndpoints";
import { useEffect } from "react";

import {Icon} from '@iconify/react'
import useNotification from "../../hooks/useNotification";

function CreateProject({groups,toggle,setGroups,getGroupDetail}){

    const [submitting,setSubmitting] = useState(false);
    const [showAddGoal,setShowAddGoal] = useState(false);
    const [goals,setGoals] = useState([]);

    const [data,setData] = useState({
        task_title : "",
        task_description : "",
        task_goals : [],
        task_deadline : ""
    })

    const createNotification = useNotification();

    const [errors,setErrors] = useState({
        task_title  : null,
        task_description : null
    });

    const {group_id} = useParams();

    // const [nameMsg,setNameMsg] = useState(null);

    const axiosInstance = useAxios();

    const onChangeHandler = (e) => {
        console.log('change handler')
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

    useEffect(() => {
        console.log('goals altered',goals);
        setData(prev => (
            {
                ...prev,
                task_goals : goals
            }
        ))
    },[goals])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // console.log('submitted',data)
        console.log('length = ',data.task_description.length)
        if(data.task_description.length > 100){
            createNotification('danger','cannot create','task description is too long',5000);
            setErrors(prev => (
                {   
                    ...prev,
                    task_description : "too long"
                }
            ))
            return;
        }
        console.log('submitted')
        axiosInstance.post(`${endpoints.createTask}/${group_id}`,data)
            .then(res => {
                console.log(res);
                getGroupDetail();
                toggle();
                createNotification('success','Created','created task successfully',5000);
            })
            .catch(err => {
                console.log('error = ',err)
            })
    }

    const deleteGoal = (e) => {
        setGoals(prev => (
            prev.filter(p => p.goals_title != e.target.getAttribute('title'))
        ))
    }

    return(
        <div
            className = "create-group create-task"
        >   
                <h2>
                    Create task
                </h2>
                <form
                    onSubmit = {onSubmitHandler}
                >
                    <InputField 
                        name = "task_title"
                        label = "name"
                        type = "text"
                        value = {data.task_title}
                        onChange = {onChangeHandler}
                        error = {errors.task_title}
                        focusColor = "var(--discord-blue)"
                        // msg = {titleMsg}
                    />
                    <TextArea 
                        name = "task_description"
                        label = "description"
                        value = {data.task_description}
                        onChange = {onChangeHandler}
                        focusColor = "var(--discord-blue)"
                        className = "textarea"
                        error = {errors.task_description}
                    />
                    <div className="field">
                        <label>deadline</label>
                        <input type="date" name = "task_deadline" onChange={onChangeHandler}/>
                    </div>
                    {
                        goals.length !== 0 &&
                        <div className="goals">
                            <table className = "goal">
                                <tr>
                                    <th>goal title</th>
                                    <th>deadline</th>
                                    <th></th>
                                </tr>
                                {
                                    goals.map(goal => (
                                        <tr>
                                            <td>{goal.goals_title}</td>
                                            <td>{goal.goals_deadline}</td>
                                            <td>
                                                <div 
                                                    className="deleteGoal" 
                                                    onClick={deleteGoal}
                                                    title = {goal.goals_title}
                                                >
                                                    <Icon icon = "ri:delete-bin-5-line"/>
                                                </div>
                                                <div 
                                                    className="editGoal" 
                                                    // onClick={editGoal}
                                                    title = {goal.goals_title}
                                                >
                                                    <Icon icon = "clarity:edit-line"/>
                                                </div>
                                            </td>
                                            {/* <td> */}
                                            {/* </td> */}
                                        </tr>
                                    ))
                                }
                            </table>
                        </div>
                    }
                    {
                        showAddGoal &&
                        <CreateGoal 
                            toggle = {() => setShowAddGoal(prev => !prev)}
                            setGoals = {setGoals}
                        />
                    }
                    <span className="add-goal"
                        onClick = {() => {
                            console.log('clicked');
                            setShowAddGoal(true)
                        }}
                    >
                        Show Goal Form
                    </span>
                    <SubmitBtnContainer
                            className={
                                `
                                submitBtn
                                ${submitting ? "submitting" : ""}
                                `
                            }
                            type = "submit"
                        // ${!(valid.name && valid.description) ? "invalid" : ""}
                            >
                        {
                            !submitting ? 
                            "create group":
                            <Loader 
                                icon = "fluent:spinner-ios-20-filled"
                                className = "loading"
                            />
                        }
                    </SubmitBtnContainer>
                </form>
        </div>
    )
}

export default CreateProject;