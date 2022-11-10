import React,{
    useState
} from "react";
import './CreateGoal.comp.css';

function CreateGoal({toggle,setGoals}){

    const [data,setData] = useState({
        goals_title : "",
        goals_description : "",
        goals_deadline : "",
    })

    const changeHandler = (e) => {
        console.log(e.target.value);
        setData(prev => (
            {
                ...prev,
                [e.target.name] : e.target.value
            }
        ))
    }

    const submitHandler = (e) => {
        console.log('submitting',data)

        setGoals(prev => (
            [
                ...prev,
                data
            ]
        ))
        toggle();
    }


    return(
        <>
            <div action="" className="creategoal-container" >
                <h3>Goal</h3>
                <div className = "field">
                    <label>title</label>
                    <input name = "goals_title" type="text" onChange = {changeHandler}/>
                </div>
                <div className = "field">
                    <label>description</label>
                    <textarea name = "goals_description" type="text" onChange = {changeHandler}/>
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