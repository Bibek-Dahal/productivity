import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate
} from 'react-router-dom';

import {
  HomePage,
  LoginPage,
  PersonalDashboardPage,
  RegisterPage,
  GroupDashboardPage,
  LogoutPage
} from './Pages/index';

import {
  PersonalDashboard,
  PersonalActivity,
  Logout,
  GroupDashboard
} from './Components/index';

import {
  ToastContainer
} from 'react-toastify';


import './App.css';
import { RequiredAuth,Protected } from './utils/index';

function App() {
  
  const navigate = useNavigate();

  return (
    <div>
      {
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
            <Route path = "/logout" element = {
              <RequiredAuth>
                <LogoutPage />
              </RequiredAuth>
            } />
            <Route path = "/group/:id" element = {
              <RequiredAuth>
                <GroupDashboardPage />
              </RequiredAuth>
            }>
              <Route path = ""  element = {<GroupDashboard />} />
            </Route>
          </Routes>
      }
      <ToastContainer 
        autoClose = {5000}
      />
    </div>
  );
}

export default App;
