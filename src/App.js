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
import AdminPage from './components/adminPage/AdminPage';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

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
          {auth.loggedIn && (auth.user.role === 'projectOwner') && (
            <Redirect to="/projects" />
          )}
          {auth.loggedIn && (auth.user.role === 'admin') && (
            <Redirect to="/admin" />
          )}
        </Route>
        <Route exact path="/signup">
          {
            !auth.loggedIn &&
            <RegForm />
          }
        </Route>
        <Route exact path="/projects">
          {auth.loggedIn && (auth.user.role === 'projectOwner') && (
            <Projects />)}
        </Route>
        <Route exact path="/admin">
          {auth.loggedIn && (auth.user.role === 'admin') && (
            <AdminPage />)}
        </Route>
      </Switch>
      <NotificationContainer />
    </Router>
  )
}

