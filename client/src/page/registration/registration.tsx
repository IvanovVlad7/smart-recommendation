import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registerUrl  } from "../../constans/api";
import { MAIN_ENDPOINT}  from "../../constans/api";
import { storage } from "../../constans/storage";
import { useTranslation } from 'react-i18next';




interface RegistrationProps {
  isDarkTheme: boolean; 
}


const Registration: React.FC<RegistrationProps> = ({ isDarkTheme }) => {
  // TODO: refactor registration the same as it is in login
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();


    if (!name || !email || !password) {
      if (!name) setNameError(true);
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    try {
      const response = await axios.post(registerUrl ,{
        name,
        email,
        password,
        role: 'user'
      });
      // TODO: BE should return ID, name of a user
      if (response.data.error) {
        alert(response.data.error);
      } else {
        // TODO: store user's ID, name in session storage
        sessionStorage.setItem(storage.userData, JSON.stringify(response.data));
        console.log(response.data);
        navigate(MAIN_ENDPOINT);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div className="auth-form" style={{ backgroundColor: isDarkTheme ? 'grey' : '#fff' }}>
      <Typography variant="h3" component="div">
        {t('registerButton')}
      </Typography>
      <form className="auth-form__form">
        <TextField
          label={t('nameField')}
          size="small"
          margin="normal"
          className="auth-form__input"
          fullWidth={true}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(false);
          }}
          required
          error={nameError}
          helperText={nameError ? t('nameRequiredError') : ""}
          InputProps={{
          style: {
            color: isDarkTheme ? 'white' : 'black',
            borderColor: isDarkTheme ? 'white' : 'rgba(0, 0, 0, 0.42)', 
            backgroundColor: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'white',
    },
  }}
  InputLabelProps={{
    style: {
      color: isDarkTheme ? 'white' : 'black', 
    },
  }}
        />
        <TextField
          label={t('emailField')}
          size="small"
          margin="normal"
          className="auth-form__input"
          fullWidth={true}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
          required
          error={emailError}
          helperText={emailError ? t('emailRequiredError') : ""}
          InputProps={{
          style: {
            color: isDarkTheme ? 'white' : 'black',
            borderColor: isDarkTheme ? 'white' : 'rgba(0, 0, 0, 0.42)', 
            backgroundColor: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'white',
    },
  }}
  InputLabelProps={{
    style: {
      color: isDarkTheme ? 'white' : 'black', 
    },
  }}
        />
        <TextField
          label={t('passwordField')}
          type="password"
          size="small"
          margin="normal"
          className="auth-form__input"
          fullWidth={true}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
          }}
          required
          error={passwordError}
          helperText={passwordError ? t('passwordRequiredError') : ""}
          InputProps={{
          style: {
            color: isDarkTheme ? 'white' : 'black',
            borderColor: isDarkTheme ? 'white' : 'rgba(0, 0, 0, 0.42)', 
            backgroundColor: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'white',
    },
  }}
  InputLabelProps={{
    style: {
      color: isDarkTheme ? 'white' : 'black', 
    },
  }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth={true}
          disableElevation={true}
          sx={{
            marginTop: 2,
          }}
          onClick={handleRegister}
        >
          {t('registerButton')}
        </Button>
        <div >
          {t('alreadyHaveAccount')} <a href="/login" style={{ color: isDarkTheme ? '#fff' : 'black', textDecoration: 'none'}} >{t('loginLink')}</a>
        </div>
      </form>
    </div>)
};

export default Registration;