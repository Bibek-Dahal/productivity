import { RingProgress,Text } from '@mantine/core';

import {
    Analytics
} from '../'

function Dashboard({className,userSummary}){

    const colors = ["#68b5e8","#6888e8","rgba(0,0,0,.4)","#d38902"]
    console.log('inside dashboard',userSummary)

    function getCards(userSummary){
        
    }
    
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
            {/* <div className='block goals-completed'
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
                        color :  'white',fontWeight : "bold"
                    }}
                >goals completed</span>
            </div> */}
            {/* <div className='block goals-completed'
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
                        color :  'white',fontWeight : "bold"
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
                        color :  'white',fontWeight : "bold"
                    }}
                >groups joined</span>
            </div> */}
            </div>
            <Analytics />
        </div>
    )
}

export default Dashboard;