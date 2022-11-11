import { Box } from '@mui/material';
import React from 'react';
import { ResponsiveContainer,LineChart,Line, XAxis, YAxis} from 'recharts'

import './Analytics.css';


const Analytics = () =>{

    const pdata=[
        {
          pr_ratio:0.5,
          month:'janurary'
      
        },
        {
          pr_ratio:0.7,
          month:'feb'
      
        },
        {
        
          pr_ratio:0.6,
          month:'march'
      
        },
        {
        
          pr_ratio:0.9,
          month:'april'
      
        },
        {
        
          pr_ratio:0.4,
          month:'May'
      
        },
        {
        
          pr_ratio:1,
          month:'June'
      
        },
        
        
        
      ]
  
 return(
     <div className = 'analytics' >
      <Box paddingTop={5} paddingBottom={5} >
      <h2 align='center' >Analytics</h2> 
      </Box>
      <Box>
       <ResponsiveContainer width={700} aspect={2} >

  <LineChart data={pdata} width={900} height={150} margin={{top:50,left:20,bottom:5}} >
    <XAxis dataKey='month' interval={'preserveStartEnd'}/>
    <YAxis/>
     <Line dataKey='pr_ratio'/>
  </LineChart>
</ResponsiveContainer>

</Box>

     </div>

 );
}

export default Analytics;

