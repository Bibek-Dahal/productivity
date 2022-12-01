import {useState,useEffect} from 'react';

import { RingProgress,Text } from '@mantine/core';

import {
    Analytics
} from '../'

function GroupDashboard({getGroupHistory,className,group,groupSummary,goalReports,taskReports}){

    const colors = ["#68b5e8","#6888e8","rgba(0,0,0,.4)","#d38902"]


    const [goals,setGoals] = useState({})
    const [tasks,setTasks] = useState({})

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

    useEffect(() => {
        getGroupHistory()
    },[])
    
    return(
        <div
            className = {`${className ? className : ""}`}
        >
            <h1
                style = {{
                    marginBottom : "2em",
                    textTransform : "capitalize"
                }}
            >
                {group.name} Dashboard
            </h1>
            <div 
                style = {{
                    display : "grid",
                    gridTemplateColumns : "1fr 1fr",
                    gap : "1em"
                }}
            >
                {
                    groupSummary &&
                    <>
                        { 
                        Object.keys(groupSummary).map((key,index) => (
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
                                            {groupSummary[key]}
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
                {/* <div className='block goals-set'
                
                    style = {{
                        background : "#68b5e8"
                    }}
                >
                    <RingProgress
                        sections={[
                            { value: 100, color: 'white'} 
                        ]}
                        label={
                            <Text size="xl" align="center" px="xls" sx={{ pointerEvents: 'none',color :  'white',fontWeight : "bold",fontSize : "2rem"}}>
                                34
                            </Text>
                            }
                    />
                    <span className='title'
                        style = {{
                            color :  'white',fontWeight : "bold",textTransform : "uppercase",marginTop : ".6em"
                        }}
                    >goals set</span>
                </div>
                <div className='block goals-completed'
                style = {{
                    background : "#6888e8"
                }}
                >
                    <RingProgress
                        sections={[
                            { value: 100, color: 'white'} 
                        ]}
                        label={
                            <Text size="xl" align="center" px="xls" sx={{ pointerEvents: 'none',color :  'white',fontWeight : "bold",fontSize : "2rem"}}>
                                28
                            </Text>
                            }
                    />
                    <span className='title'
                        style = {{
                            color :  'white',fontWeight : "bold",textTransform : "uppercase",marginTop : ".6em"
                        }}
                    >goals completed</span>
                </div>
                <div className='block goals-completed'
                    style = {{
                        background : "rgba(0,0,0,.4)"
                    }}
                >
                    <RingProgress
                        sections={[
                            { value: 100, color: 'white'} 
                        ]}
                        label={
                            <Text size="xl" align="center" px="xls" sx={{ pointerEvents: 'none',color :  'white',fontWeight : "bold",fontSize : "2rem"}}>
                                28
                            </Text>
                            }
                    />
                    <span className='title'
                        style = {{
                            color :  'white',fontWeight : "bold",textTransform : "uppercase",marginTop : ".6em"
                        }}
                    >tasks created</span>
                </div>
                <div className='block goals-completed'
                style = {{
                    background : "#d38902"
                }}
                >
                    <RingProgress
                        sections={[
                            { value: 100, color: 'white'} 
                        ]}
                        label={
                            <Text size="xl" align="center" px="xls" sx={{ pointerEvents: 'none',color :  'white',fontWeight : "bold",fontSize : "2rem"}}>
                                48
                            </Text>
                            }
                    />
                    <span className='title'
                        style = {{
                            color :  'white',fontWeight : "bold",textTransform : "uppercase",marginTop : ".6em"
                        }}
                    >users joined</span>
                </div> */}
            </div>
            <Analytics goals = {goals} tasks = {tasks}/>
        </div>
    )
}


export default GroupDashboard;