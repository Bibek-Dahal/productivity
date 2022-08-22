import {
  BrowserRouter as Router,
  Routes,
  Route
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
            <Route path = "/group/:name" element = {
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
