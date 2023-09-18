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
import './dashboard.css';
import MainPage from "../main/main";
import { ReviewForm } from "../../components/review-form"; 

const darkTheme = createTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#ff0000', 
    },
  },
});

const lightTheme = createTheme({
  palette: {
    // type: 'light',
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#ff0000', 
    },
  },
});

const Dashboard = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [language, setLanguage] = useState('ru');

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };
  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return(
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <AppBar position='fixed'>
        <Container fixed>
          <Toolbar className="container">
            <Typography variant='h6' className="title">
              Web-Block
            </Typography>
            <Box mr={2}>
              <Button className="menuButton" color='inherit' variant='outlined'>
                Log In
              </Button>
            </Box>
            <Button color='secondary' variant='contained' className="SignUpButton">
              Sign Up
            </Button>
            <IconButton color="inherit" onClick={toggleTheme} style={{ marginLeft: '10px' }} >
              {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Button color='inherit' onClick={toggleLanguage} style={{ marginLeft: '10px' }}>
              {language === 'ru' ? 'EN' : 'RU'}
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <main>
        <MainPage />
        <ReviewForm />
      </main>
    </ThemeProvider>
  )
}


export default Dashboard