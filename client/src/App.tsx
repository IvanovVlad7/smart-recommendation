import { useState }  from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Registration from './page/registration/registration';
import Login from './page/login/login';
import MainPage from './page/main/main';
import { RUSSIAN, ENGLISH } from './constans/languages';   
import { darkTheme, lightTheme } from './components/themes/themes';
import { AdminPanel } from './page/admin-panel';
import { Dashboard } from './page/dashboard';
import { Header } from './components/header';

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
          <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}  toggleLanguage={toggleLanguage} />
          <Routes>
            <Route path="/registration" element={<Registration isDarkTheme={isDarkTheme} />} />
            <Route path="/login" element={<Login isDarkTheme={isDarkTheme} />} />
            <Route path="/" element={<MainPage isDarkTheme={isDarkTheme}/>} />
            <Route path="/admin-panel" element={<AdminPanel/>} />
            <Route path="/dashboard/:id" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
      </ThemeProvider>
  );
};

export default App;