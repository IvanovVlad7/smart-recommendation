import React, {useState}  from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Dashboard from './page/dashboard/dashboard';
import Registration from './page/registration/registration';
import Login from './page/login/login';
import ApiTest from './page/api-test/api-test';
import MainPage from './page/main/main';
import { ReviewForm } from './page/review-form/ReviewForm';
import {Header } from './components/header/header';
import { RUSSIAN, ENGLISH } from './constans/languages';   
import { darkTheme, lightTheme } from './components/themes/themes';
import UserTable from './page/user-page/user-page';






const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [language, setLanguage] = useState('ru');

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

const toggleLanguage = () => {
    setLanguage(language === RUSSIAN ? ENGLISH : RUSSIAN);
  };

  const pageStyle = {
    backgroundColor: isDarkTheme ? '#333' : '#fff',
    minHeight: '100vh', 
    transition: 'background-color 0.3s ease', 
    color: isDarkTheme ? '#fff' : '#000', 
  };

  
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <div style={pageStyle}>  
        <BrowserRouter>
          <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}  toggleLanguage={toggleLanguage}/> 
          <Routes>
            <Route path="/registration" element={<Registration isDarkTheme={isDarkTheme} />} />
            <Route path="/login" element={<Login isDarkTheme={isDarkTheme} />} />
            <Route path="/" element={<Dashboard isDarkTheme={isDarkTheme}/>} />
            <Route path="/test" element={<ApiTest />} />
            <Route path="/main" element={<MainPage isDarkTheme={isDarkTheme} />} />
            <Route path="/reviewForm" element={<ReviewForm />} />
            <Route path="/table" element={<UserTable/>} />
          </Routes>
        </BrowserRouter>
      </div>
      </ThemeProvider>
  );
};

export default App;