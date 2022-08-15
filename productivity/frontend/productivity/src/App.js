import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import {
  HomePage,
  LoginPage,
  PersonalDashboardPage,
  RegisterPage
} from './Pages/index';

import {
  PersonalDashboard,
  PersonalActivity
} from './Components/index';

import {
  ToastContainer
} from 'react-toastify';

import './App.css';
import { RequiredAuth,Protected } from './utils/index';

function App() {
  return (
    <div>
      {
        <Router>
          <Routes>
            <Route path = "/" element = {<HomePage />} />
            <Route path = "/" element = {
              <RequiredAuth>
                <PersonalDashboardPage />
              </RequiredAuth>
            }>
              <Route path = "dashboard" element = {
               <PersonalDashboard />
              }/>
              <Route path = "activity" element = {
                <PersonalActivity />
              } />
            </Route>
            <Route path = "/login" element = {
              <Protected>
                <LoginPage />
              </Protected>
            } />
            <Route path = "/register" element = {
              <Protected>
                <RegisterPage />
              </Protected>
            } />
            
          </Routes>
        </Router>
      }
      <ToastContainer 
        autoClose = {false}
      />
    </div>
  );
}

export default App;
