import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import './styles/Auth.css';

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

    // const {socket,setSocket} = useSocketContext();
    
    // creating a socket connection for all time
    useEffect(() => {
        // const sockett = io(`http://${window.location.hostname}:8000`);
        // setSocket(sockett);
    },[])

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
                            <DashboardPage/>
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
        </div>
    )
}

export default App;