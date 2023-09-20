import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import * as React from "react";
import './login.css';
import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginUrl } from "../../constans/api";
import { MAIN_ENDPOINT}  from "../../constans/api";
import { FormField } from '../../components/form-field';
import { emailForm, nameForm, passwordForm } from '../../constans/form-values';
import { storage } from "../../constans/storage";
import { useTranslation } from 'react-i18next';



interface LoginProps {
  isDarkTheme: boolean; 
}
const Login: React.FC<LoginProps> = ({ isDarkTheme }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    [emailForm.name]: "",
    [nameForm.name]: "",
    [passwordForm.name]: ""
  });
  const [formErrors, setFormErrors] = useState({
    [emailForm.name]: false,
    [nameForm.name]: false,
    [passwordForm.name]: false,
  });

  const handleFormFieldChange = ({ e, name }: any) => {
    setFormValues(prev => ({ ...prev, [name]: e.target.value }));
    setFormErrors(prev => ({ ...prev, [name]: false }))
  }

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { email, name, password } = formValues;
    
    if (!email) setFormErrors(prev => ({ ...prev, email: true }));
    if (!name) setFormErrors(prev => ({ ...prev, name: true }));
    if (!password) setFormErrors(prev => ({ ...prev, password: true }));
    if (Object.values(formValues).includes("")) return;

    try {
      const response = await axios.post(loginUrl, {
        name,
        email,
        password,
      });
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem(storage.userData, JSON.stringify(response.data));
        navigate(MAIN_ENDPOINT);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
  
  const { t } = useTranslation();
  return(
    <div className="auth-form" style={{ backgroundColor: isDarkTheme ? 'grey' : '#fff' }}>
      <Typography variant="h3" component="div">
        {t('loginTitle')}
      </Typography>
      <form className="auth-form__form" >
        <FormField 
          label={t('nameField')}
          value={formValues.name}
          name={nameForm.name}
          onChange={handleFormFieldChange}
          error={formErrors.name}
          customErrorMessage={formErrors.name ? t('nameRequiredError') : undefined}
          
            
        />
        <FormField 
          label={t('emailField')}
          value={formValues.email}
          name={emailForm.name}
          onChange={handleFormFieldChange}
          error={formErrors.email}
          customErrorMessage={formErrors.email ? t('emailRequiredError') : undefined}
          
        />
        <FormField 
          label={t('passwordField')}
          value={formValues.password}
          name={passwordForm.name}
          onChange={handleFormFieldChange}
          error={formErrors.password}
          customErrorMessage={formErrors.password ? t('passwordRequiredError') : undefined}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth={true}
          disableElevation={true}
          sx={{
            marginTop: 2,
          }}
          onClick={ handleLogin}
        >
          {t('loginTitle')}
        </Button>
        <div>
          {t('register')}<Link to="/registration" style={{ color: isDarkTheme ? '#fff' : 'black', textDecoration: 'none'}}>{t('registerLink')}</Link>
        </div>
      </form>
    </div>
  )
}

export default Login