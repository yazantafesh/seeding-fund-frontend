import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { AuthContext } from '../../context/Auth';
import logo from '../../utilities/logo.png';
import './header.css';
import { Link, useLocation } from 'react-router-dom';

//This is the header or navbar component

export default function Header() {
  const auth = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar id="appBar" position="fixed" enableColorOnDark>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img id="logo" src={logo} alt="logo" height="70px" />
            </Typography>
            <Link to="/" id="link" ><Button color="inherit" className={
              location.pathname === '/admin' || '/projects' ? `active-links` : `links`
            }>Home</Button></Link>
            <Button color="inherit" className="links">Features</Button>
            <Button color="inherit" className="links">Contact</Button>
            {
              auth.loggedIn &&
              <a href='/' className="authLinks"><Button color="inherit" onClick={() => { auth.logout() }}>Log Out</Button></a>
            }
            {
              !auth.loggedIn &&
              <>
                <a href='/' className="authLinks"><Button color="inherit" >Login</Button></a>
                <a href='/signup' className="authLinks"><Button color="inherit" >Signup</Button></a>
              </>
            }
            <IconButton
              size="large"
              edge="start"
              color="default"
              aria-label="menu"
              sx={{ mr: 2 }}
              className="menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}