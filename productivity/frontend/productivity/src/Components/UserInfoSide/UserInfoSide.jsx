import React from 'react';
import { Card,CardMedia,CardContent,Typography,CardActions,IconButton,Button,CardHeader, Avatar,ButtonGroup,Badge } from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddAPhotoSharpIcon from '@mui/icons-material/AddAPhotoSharp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box } from "@mui/system";
import { useEffect,useState } from 'react';
import { useAxios } from '../../hooks';
import endpoints from '../../utils/endpoints';
import './UserInfoSide.css';
import axios from 'axios';

const UserInfoSide = () =>{

    const axiosInstance = useAxios();

    const [user,setUser] = useState(null);


  

    
        

    const getUserInfo = async () => {
        try{
            const res = await axiosInstance.get(endpoints.getProfile);
            console.log(res);
            setUser(res.data.data);
        }catch(err){
            console.log(err);
        }
    }


    useEffect(() => {
        getUserInfo();
    },[])

    return(
        <div className = 'userinfoside'>
     <Card sx={{ maxWidth: 345 }} >
      <CardHeader
           title={`Hi ${user?.username} `}
           subheader={"GoodMorning"}
           action = {
       <ButtonGroup>
        <IconButton color="primary">
           <MessageIcon />
        </IconButton>
        <IconButton>
           <NotificationsIcon />
        </IconButton>
     </ButtonGroup>
     }
       />
     <CardContent align='center'>
      <Badge overlap="circular"
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  badgeContent={
  <IconButton color="primary" aria-label="upload picture" component="label">
<input hidden accept="image/*" type="file" name='file' />
 <AddCircleIcon /> 
    </IconButton>
  }>
<Avatar sx={{ width: 100, height: 100 }}></Avatar>

      </Badge>

      

       <Box>
     
             </Box>
             <Typography>
               <h3 align="center">{user?.username}</h3>
              <h4 align="center">UI Ux Engineer</h4> 
             </Typography>
           </CardContent>
     
           
         <CardActions align='center'>
            <Button size="small" variant="contained" >Edit Profile</Button>
           </CardActions>
         </Card>
      
     
     


            
        </div>

    );
}

export default UserInfoSide;

