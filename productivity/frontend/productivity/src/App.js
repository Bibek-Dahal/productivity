import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import discordAudio from './sounds/discord.mp3';
import hangoutAudio from './sounds/hangouts.mp3';

import { Button } from '@mantine/core';

import './styles/Auth.css';

import {SideModal} from './components/shared/';

import {
    GroupCall,
} from './components/'

import {
    HomePage,
    NotFoundPage,
    LoginPage,
    RegisterPage,
    DashboardPage,
    GroupDashBoardPage,
    LogoutPage
} from './pages/';

import PrivateRoute from './utils/Routes/Private.route';
import ProtectedRoute from './utils/Routes/Protected.route';
import { useEffect,useState } from 'react';

import useSocketContext from './hooks/useSocketContext'

// import io from 'socket.io-client';

function App(){
    const discordCall = new Audio(discordAudio);
    const hangoutsCall = new Audio(hangoutAudio);

    // const {socket,setSocket} = useSocketContext();
    const [selfGroups,setSelfGroups] = useState([]);
    const [loading,setLoading] = useState(true);
    const {socket} = useSocketContext();
    const [showCallModal,setShowCallModal] = useState(false);
    const [caller,setCaller] = useState(null);
    // creating a socket connection for all time

    useEffect(() => {
        console.log('inside app.js',socket)
        // getting self detail 
        setLoading(false);
    },[])

    useEffect(() => {
        if(socket){
            socket.on('call',info => {
                console.log('someone called',info);
                // if(window.confirm(`${info.userName} is calling`)){
                //     console.log('entering group call')
                // }
                setCaller(info.userName)
                setShowCallModal(true);
                // discordCall.play();
            })
        }
    },[socket])

    useEffect(() => {
        if(selfGroups.length){
            console.log('self groups = ',selfGroups)
            selfGroups.forEach(group => {
                socket.emit('new-user',{
                    roomId : group._id
                })
            })
        }
    },[selfGroups])

    if(loading) return "loading"

    return(
        <div id = "app">
           <Routes>
                <Route path = "/" element = {<HomePage />}/>
                <Route path = "/login" element = {
                    <ProtectedRoute>
                        <LoginPage />
                    </ProtectedRoute>
                } />
                 <Route path = "/register" element = {
                    <ProtectedRoute>
                        <RegisterPage />
                    </ProtectedRoute>
                } />
                <Route 
                    path = "/dashboard/*"
                    element = {
                        <PrivateRoute>
                            <DashboardPage setSelfGroups={setSelfGroups}/>
                        </PrivateRoute>
                    }
                />
                
                <Route path = "/group/:group_id/*" element = {
                    <PrivateRoute>
                        <GroupDashBoardPage/>
                    </PrivateRoute>
                }/>
                <Route path = "/logout" element = {
                        <LogoutPage />
                } />
                <Route path = "*" element = {<NotFoundPage />}/>
           </Routes>
           {/* {
            (showCallModal) &&
            <SideModal toggle = {() => setShowCallModal(prev => !prev)} >
                {caller} is calling
                <Button>
                    join the call
                </Button>
            </SideModal>
           } */}
        </div>
    )
}

export default App;