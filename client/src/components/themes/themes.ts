import { createTheme } from '@mui/material/styles';


export const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#000',
      light: '#fff'
    },
    secondary: {
      main: '#ff0000',
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#fff',
    },
  },
});