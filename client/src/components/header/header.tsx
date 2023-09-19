import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton"; 
import Brightness4Icon from "@mui/icons-material/Brightness4"; 
import Brightness7Icon from "@mui/icons-material/Brightness7"; 
import { Link } from "react-router-dom";
import './header.css';
import { darkTheme, lightTheme } from '../themes/themes';



interface HeaderProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  toggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkTheme, toggleTheme,toggleLanguage }) => {
  const [language, setLanguage] = useState('ru');
  
  const handleToggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
    toggleLanguage();
  };


  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <AppBar position='fixed' className={isDarkTheme ? 'darkAppBar' : 'lightAppBar'}>
        <Container fixed>
          <Toolbar className="container">
            <Typography variant='h6' className="title">
              Web-Block
            </Typography>
            <Box mr={2}>
              <Button
                component={Link} 
                to="/login"
                className="menuButton"
                color='inherit'
                variant='outlined'
              >
                Log In
              </Button>
            </Box>
            <Button
              component={Link} 
              to="/registration"
              color='secondary'
              variant='contained'
              className="SignUpButton"
            >
              Sign Up
            </Button>
            <IconButton color="inherit" onClick={toggleTheme} style={{ marginLeft: '10px' }} >
              {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Button color='inherit' onClick={handleToggleLanguage} style={{ marginLeft: '10px' }}>
              {language === 'ru' ? 'EN' : 'RU'}
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}