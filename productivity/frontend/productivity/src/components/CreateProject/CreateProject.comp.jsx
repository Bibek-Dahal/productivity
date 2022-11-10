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

function CreateProject({groups,toggle,setGroups}){

    const [submitting,setSubmitting] = useState(false);
    const [showAddGoal,setShowAddGoal] = useState(false);
    const [goals,setGoals] = useState([]);

    const [data,setData] = useState({
        task_title : "",
        task_description : "",
        task_goals : [],
        task_deadline : ""
    })

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
        console.log('submitted',data)
        axiosInstance.post(`${endpoints.createTask}/${group_id}`,data)
            .then(res => {
                console.log(res);
                toggle();
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
                        error = {errors.name}
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
                                                    <Icon icon = "fluent:delete-20-filled"/>
                                                </div>
                                            </td>
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