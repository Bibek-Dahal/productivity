import { RingProgress,Text } from '@mantine/core';
import { useEffect,useState } from 'react';

import {
    Analytics
} from '../'

function Dashboard({className,userSummary,goalReports,taskReports}){
            // taskReport = {
            //     "Dec" : [{..details,task_is_completed = true or false},"",""]
            // }
            
            // tasks = {
                // dec : {
                //     completed : "2",
                //     creted : "4"
                // }
            //  }
    const colors = ["#68b5e8","#6888e8","rgba(0,0,0,.4)","#d38902"]

    const [goals,setGoals] = useState({})
    const [tasks,setTasks] = useState({})


    function getCards(userSummary){
        
    }
    console.log('tasks goals ',tasks,goals)
    useEffect(() => {
        if(goalReports && taskReports){
            console.log('inside dashboard',goalReports,taskReports)
            
            Object.keys(taskReports).forEach((key,index) => {
                let count = 0;
                taskReports[key].forEach(task => {
                    if(task.task_is_completed) count++;
                })
                setTasks(prev => ({
                    ...prev,
                    [key] : {
                        created :  taskReports[key].length,
                        completed : count
                    }
                }))
            })

            Object.keys(goalReports).forEach((key,index) => {
                let count = 0;
                goalReports[key].forEach(goal => {
                    if(goal.goal_is_completed) count++;
                })
                setGoals(prev => ({
                    ...prev,
                    [key] : {
                        created : goalReports[key].length,
                        completed : count
                    }
                }))
            })
           
            // setGoalsSet(prev => {
            //     let count = 0;
                // Object.keys(goalReports).forEach(goal => {
                //     if(goal.goal_is_completed) count++;
                // })
                // return {

                // }
            // })
            // Object.keys(goalReports).forEach((key,index) => {
            //     setGoals(prev => {
            //         let count = 0;
            //         goalReports[key].forEach(goal => {
            //             if(goal.goal_is_completed) count++;
            //         })
            //         return{
            //             ...prev,
            //             [key] : count
            //         }
            //     })
            // })
        }
    },[goalReports,taskReports])
    
    return(
        <div
            className = {`${className ? className : ""}`}
        >
            <h1
                style = {{
                    marginBottom : "2em"
                }}
            >
                Personal Dashboard
            </h1>
            <div 
                style = {{
                    display : "grid",
                    gridTemplateColumns : "repeat(3,1fr)",
                    gap : "1em",
                }}
            >
                {
                    userSummary && <>
                    {/* 
                        userSummary = {
                            goals_created : "3",
                            ...
                        }
                    */}
                       { 
                        Object.keys(userSummary).map((key,index) => (
                            <div className='block'
                                style = {{
                                    background : `${colors[Math.floor(Math.random() * colors.length)]}`
                                }}
                            >
                                <RingProgress
                                    sections={[
                                        { value: 100, color: 'white'} 
                                    ]}
                                    label={
                                        <Text size="xl" align="center" px="xls" sx={{ pointerEvents: 'none',color :  'white',fontWeight : "bold",fontSize : "2rem"}}>
                                            {userSummary[key]}
                                        </Text>
                                        }
                                />
                                <span className='title'
                                    style = {{
                                        color :  'white',fontWeight : "bold",
                                        textTransform : "capitalize"
                                    }}
                                >
                                    {key}
                                </span>
                            </div>
                        ))
                       }
                    </>
                }
            </div>
            <Analytics goals = {goals} tasks = {tasks}/>
        </div>
    )
}

export default Dashboard;