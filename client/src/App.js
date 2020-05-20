import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from "react-redux";
import store from "./store";

import './App.css';
import TopBar from './components/TopBar';
import LandingPage from './components/views/LandingPage/LandingPage';
import SignupPage from './components/views/SignupPage/signUpPage';
import MembersPage from './components/views/MembersPage/MembersPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import PrivateRoute from './components/privateRoute/PrivateRoute';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store = {store}>
      <Router>
        <div className = "App">
          <TopBar/>
          <Switch>
            <Route exact path = "/">
              <LandingPage/>
            </Route>
            <Route exact path = "/signup">
              <SignupPage/>
            </Route>
            <PrivateRoute exact path = "/members">
              <MembersPage/>
            </PrivateRoute>
            <Route>
              <Route exact path = "/login">
                <LoginPage/>
              </Route>
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;