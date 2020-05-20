import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import "../Content/css/TopBar.css";
import "./SubmitButton/SubmitButton.css";
import "./views/SignupPage/signUpPage.css";
import SignupPage from './views/SignupPage/signUpPage.jsx';
import MembersPage from './views/MembersPage/MembersPage.jsx';
import LandingPage from './views/LandingPage/LandingPage.jsx';

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

import Container from '@material-ui/core/Container';

export default function TopBar() {
      return(
        <Container>
          <Navbar expand="lg" variant="dark" bg="dark" fixed = "top">
            <Navbar.Brand href="/members">MTMF</Navbar.Brand>
          </Navbar>
        </Container>
      )
    }
