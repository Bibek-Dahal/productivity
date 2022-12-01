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


const Analytics = () =>{
    
 
  
  const options = {
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
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'goals set',
        data: labels.map(() => faker.datatype.number({ min: 7, max: 10 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'goals completed',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 7 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
    
 return(
     <div className = 'analytics' >
        <div className="analytics-content">
          <Box
            style = {{
              background : "white",
              padding : "2em",
              borderRadius : "5px",
              marginTop : "3em",
              // boxShadow : "2px 2px 1px #ddd",
              border : "1px solid #ddd"
            }}
          >
            <Bar options={options} data={data}/>
          </Box>
        </div>
      </div>

 );
}

export default Analytics;

