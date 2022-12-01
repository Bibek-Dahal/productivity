import { Box } from '@mui/material';
import React from 'react';
import { ResponsiveContainer,LineChart,Line, XAxis, YAxis} from 'recharts'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Analytics = ({goals,tasks}) =>{
    
 
  
  const options_goal = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'goals set and completed chart',
      },
    },
  };
  const options_task = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'tasks set and completed chart',
      },
    },
  };
  
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sept',"Oct","Nov","Dec"];
  const goaldata = {
    labels,
    datasets: [
      {
        label: 'goals set',
        data: labels.map((label) => {
          return goals[label] ? goals[label].created : 0
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'goals completed',
        data: labels.map((label) => {
          return goals[label] ? goals[label].completed : 0
        }),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  const taskdata = {
    labels,
    datasets: [
      {
        label: 'task set',
        data: labels.map((label) => {
          return tasks[label] ? tasks[label].created : 0
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'tasks completed',
        data: labels.map((label) => {
          return tasks[label] ? tasks[label].completed : 0
        }),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
    
 return(
     <div className = 'analytics'
      style = {{
        // border : "1px solid red",
        marginTop : "4em"
      }}
     >
        <div className="analytics-content" style = {{
          display : "grid",
          gridTemplateColumns : "repeat(2,1fr)",
          gap : "1em"
        }}>
          <div>
          <h2>Goals</h2>
          <Box
            style = {{
              background : "white",
              padding : "2em",
              borderRadius : "5px",
              // boxShadow : "2px 2px 1px #ddd",
              border : "1px solid #ddd"
            }}
          >
            <Bar 
            options={options_goal} data={goaldata}/>
          </Box>
          </div>
          <div>
          <h2>Tasks</h2>
          <Box
            style = {{
              background : "white",
              padding : "2em",
              borderRadius : "5px",
              // boxShadow : "2px 2px 1px #ddd",
              border : "1px solid #ddd"
            }}
          >
            <Bar options={options_task} data={taskdata}/>
          </Box>

          </div>
        </div>
      </div>

 );
}

export default Analytics;

