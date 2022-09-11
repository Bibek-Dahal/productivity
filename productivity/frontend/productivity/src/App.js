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
  LogoutPage,
  AcceptGroupInvitePage,
  VerifyTokenPage
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

import Tooltip from 'rc-tooltip';


import './App.css';
import { RequiredAuth,Protected } from './utils/index';

function App() {
  
  const navigate = useNavigate();

  return (
    <div id = "app">
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
            <Route path = "/accept-group-invite/:group_name/:accept_token" element = {<AcceptGroupInvitePage />}/>
            <Route path = "/verify-account/:user_id/:token" element = {<VerifyTokenPage />} />
          </Routes>
      }
      <ToastContainer 
        autoClose = {5000}
      />
    </div>
  );
}

export default App;
