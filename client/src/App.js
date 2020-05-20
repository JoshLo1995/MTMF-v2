import React from 'react';
// import { Router, Route } from "react-router-dom";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './App.css';
import TopBar from './components/TopBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LandingPage from './components/views/LandingPage/LandingPage';
import SignupPage from './components/views/SignupPage/signUpPage';
import MembersPage from './components/views/MembersPage/MembersPage';

function App() {
  return (
    <Router>
      <Grid>
        <Box>
          <TopBar/>
        </Box>
      </Grid>
      <Grid>
        <Box> 
          <Switch>
            <Route exact path = "/">
              <LandingPage/>
            </Route>
            <Route path = "/signup">
              <SignupPage/>
            </Route>
            <Route path = "/members">
              <MembersPage/>
            </Route>
          </Switch>
        </Box>
      </Grid>
    </Router>
  );
}

export default App;
// <Router history = {browserHistory}>
//   <Route path = "/" component = {TopBar}>
//     <IndexRoute component = {LoginPage} />
//     <Route path = "/members" component = {MembersPage}/>
//   </Route>
// </Router>