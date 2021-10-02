import React, { useContext } from 'react';
import RegForm from './components/registration/RegForm';
import LoginForm from './components/login/LoginForm';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { AuthContext } from './context/Auth';
import Projects from './components/projectOwnerPage/ProjectsPage';
import Header from './components/header/Header';

export default function App() {
  const auth = useContext(AuthContext);

  return (

    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          {
            !auth.loggedIn &&
            <LoginForm />
          }
          {auth.loggedIn && (
            <Redirect to="/projects" />
          )}
        </Route>
        <Route exact path="/signup">
          {
            !auth.loggedIn &&
            <RegForm />
          }
        </Route>
        <Route exact path="/projects">
          <Projects />
        </Route>
      </Switch>
    </Router>

  )
}

