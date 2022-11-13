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
// import './Analytics.css';

import { Bar } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';
import './Analytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const Analytics = () =>{
    
    // const pdata=[
    //     {
    //       pr_ratio:0.5,
    //       month:'janurary'
      
    //     },
    //     {
    //       pr_ratio:0.7,
    //       month:'feb'
      
    //     },
    //     {
        
    //       pr_ratio:0.6,
    //       month:'march'
      
    //     },
    //     {
        
    //       pr_ratio:0.9,
    //       month:'april'
      
    //     },
    //     {
        
    //       pr_ratio:0.4,
    //       month:'May'
      
    //     },
    //     {
        
    //       pr_ratio:1,
    //       month:'June'
      
    //     },
        
        
        
    //   ]
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        // text: 'Chart.js Bar Chart',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Goals set',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Goals achieved',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
    
 return(
     <div className = 'analytics' >
        <h1>Analytics</h1>
        <div className="analytics-content">
            {/* <Box 
              paddingTop={5} 
              paddingBottom={5} 
              
              >
              <h2 align='center' >Analytics</h2> 
              </Box>
              <div
              style = {{
                backgroundColor:"white",
                padding : "1em",
                borderRadius : "10px"
              }}
              >
              <ResponsiveContainer  aspect={3} >
              <LineChart data={pdata} width={500} height={350} margin={{top:50,left:20,bottom:5}} >
              <XAxis dataKey='month' interval={'preserveStartEnd'}/>
              <YAxis/>
              <Line dataKey='pr_ratio'/>
              </LineChart>
              </ResponsiveContainer>
            </div> */}
              {/* <div></div>
              <div></div>
              <div></div> */}
        </div>
      </div>

 );
}

export default Analytics;

