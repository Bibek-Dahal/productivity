import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import {ReactNotifications} from 'react-notifications-component';

import 'react-notifications-component/dist/theme.css'
import './index.css';
import './styles/animations.css';
import './styles/Dashboard.css';

import App from './App';
import AuthContextProvider from './context/Auth.context';
import SocketProvider from './context/Socket.context';

import { GroupCall } from './components';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
            <Routes>
                <Route path = "/meet/:meetName" element = {<GroupCall />} end/>
            </Routes>
            <AuthContextProvider>
                <ReactNotifications />
                <SocketProvider>
                    <App />
                </SocketProvider>
            </AuthContextProvider>
    </Router>
)
