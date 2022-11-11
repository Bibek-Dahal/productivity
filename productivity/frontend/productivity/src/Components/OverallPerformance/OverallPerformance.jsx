import React from 'react';
import { Box, CardContent, Grid,Paper, withTheme } from "@mui/material";
import './OverallPerformance.css';
import { padding } from '@mui/system';
import { lightBlue } from '@mui/material/colors';

const OverallPerformance = () =>{
  
 return(
  <div>
     <Box>
          <Box paddingTop={5} paddingBottom={5} borderRadius={10}>
          <h2 align='center' >OverallPerformance</h2>
          </Box>

        <Grid container spacing={2} rowSpacing={5} columnSpacing={2}>
  <Grid item md={6}xs={12}  >
  
    <Box sx={{
        width: 400,
        height: 150,
        backgroundColor: 'primary.dark'
        
        }} paddingTop={5} >
          <h1 align='center'>Groups Created</h1>
          <h2 align='center'>5</h2>
        
        
        </Box>
      
 </Grid>
  <Grid item md={6} xs={12}>
  <Box sx={{
        width: 400,
        height: 150,
        backgroundColor: 'secondary.light'
        }} paddingTop={5}>
          <h1 align='center'>Goals Created</h1>
          <h2 align='center'>5</h2>
    </Box>
      
  </Grid>
  <Grid item md={6} xs={12}>
  <Box sx={{
        width: 400,
        height: 150,
        backgroundColor: 'primary.light'}} paddingTop={5}>
          <h1 align='center'>Goals Completed</h1>
          <h2 align='center'>5</h2>
        
        
        </Box>
      
  </Grid>
  
</Grid>
     </Box>
     </div>

 );
}

export default OverallPerformance;

