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
    DashboardPage
} from './pages/';

import PrivateRoute from './utils/Routes/Private.route';
import ProtectedRoute from './utils/Routes/Protected.route';

function App(){
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
                <Route path = "*" element = {<NotFoundPage />}/>
           </Routes>
        </div>
    )
}

export default App;