import React,{
    useState,
    useEffect
} from 'react';
import { Card,CardMedia,CardContent,Typography,CardActions,IconButton,Button,CardHeader, Avatar,ButtonGroup,Badge } from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddAPhotoSharpIcon from '@mui/icons-material/AddAPhotoSharp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box } from "@mui/system";
import {SideModal} from '../shared/';

import {ProfileUpdate} from '../'

function Profile({userProfile,getProfile}){
    // const axiosInstance = useAxios();
    const [user,setUser] = useState(null);
    const [showUpdateProfile,setShowUpdateProfile] = useState(false);

    // const getUserInfo = async () => {
    //     try{
    //         const res = await axiosInstance.get(endpoints.getProfile);
    //         console.log(res);
    //         setUser(res.data.data);
    //     }catch(err){
    //         console.log(err);
    //     }
    // }

    useEffect(() => {
        // getUserInfo();
        setUser(userProfile)
    },[userProfile])

    return(
        <div className = 'userinfoside'>
            <Card
                variant = "none" 
                sx={{ 
                    display : "flex",
                    flexDirection : "column",
                    gap : "1em",
                    padding : ".7em",
                    // boxShadow : "2px 2px 10px #ddd"
                }}
            >
                <CardHeader
                    title={`Hi ${user?.username}! `}
                    // subheader={"GoodMorning"}
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
                <CardContent 
                    align='center'
                   
                >
                    <Badge 
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                       >
                        {
                            !(user?.avatar) ?
                            <Avatar sx={{ width: 100, height: 100 }}></Avatar>:
                            <img 
                                style = {{
                                    height : "100px",
                                    width : "100px",
                                    borderRadius : "50%",
                                    marginLeft : "auto",
                                    marginRight : "auto",
                                    objectFit : "cover"
                                }}
                            src = {user?.avatar} />
                        }
                    </Badge>
                <Box
                    sx = {{
                        display : "flex",
                        flexDirection : "column",
                        gap : ".5em",
                        marginTop : "1em"
                    }}
                >
                    <span align="center">{user?.username}</span>
                    {
                        user?.skills &&
                        <div className="skills-container">
                                {
                                    user.skills.map(item => (
                                        <Button 
                                            variant="outlined"
                                            key = {item}
                                        >
                                            {item}
                                        </Button>
                                    ))
                                }
                        </div>
                    }
                </Box>
                {/* <Typography> */}
                {/* </Typography> */}
                </CardContent>
                <CardActions align='center'>
                    <Button 
                        sx ={{
                            padding : ".5em"
                        }}
                        variant="contained" 
                        fullWidth
                        onClick = {() => setShowUpdateProfile(true)}
                    >
                        Update Profile
                    </Button>
                </CardActions>
            </Card>
            {
                showUpdateProfile && 
                <SideModal
                    variant = "full"
                    toggle = {() => setShowUpdateProfile(prev => !prev)}
                >
                    <ProfileUpdate 
                        toggle = {() => setShowUpdateProfile(prev => !prev)}
                        userProfile = {user} setProfile = {setUser} getProfile = {getProfile}/>
                </SideModal>
            }
        </div>
    );
}


export default Profile;

