import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import * as React from "react";
import './login.css';
import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginUrl } from "../../constans/constans";
import { MAIN_ENDPOINT}  from "../../constans/constans";
import { FormField } from '../../components/form-field';
import { emailForm, nameForm, passwordForm } from '../../constans/form-values';

const Login = () => {
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
    
    if (!email) setFormErrors(prev => ({ ...prev, email: true }))
    if (!name) setFormErrors(prev => ({ ...prev, name: true }))
    if (!password) setFormErrors(prev => ({ ...prev, password: true }))
    if (Object.values(formValues).includes("")) return;

    try {
      const response = await axios.post(loginUrl, { 
        name,
        email,
        password,
      });
      // TODO: BE should return ID, name of a user
      if (response.data.error) {
        alert(response.data.error);
      } else {
        // TODO: store user's ID, name in session storage
        sessionStorage.setItem("userData", JSON.stringify(response.data));
        console.log(response.data);
        navigate(MAIN_ENDPOINT);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  // TODO: likes should be stored in DB (after page was reloaded, added likes should be applied)
  // TODO: comments should be stored in DB (after page was reloaded, added comments should be applied)
  
  return(
    <div className="auth-form">
      <Typography variant="h3" component="div">
        Log In
      </Typography>
      <form className="auth-form__form">
        <FormField 
          label={nameForm.label}
          value={formValues.name}
          name={nameForm.name}
          onChange={handleFormFieldChange}
          error={formErrors.name}
          customErrorMessage={nameForm.required}
        />
        <FormField 
          label={emailForm.label}
          value={formValues.email}
          name={emailForm.name}
          onChange={handleFormFieldChange}
          error={formErrors.email}
          customErrorMessage={emailForm.required}
        />
        <FormField 
          label={passwordForm.label}
          value={formValues.password}
          name={passwordForm.name}
          onChange={handleFormFieldChange}
          error={formErrors.error}
          customErrorMessage={passwordForm.required}
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
          Log In
        </Button>
        <div>
          Don't have an account? <Link to="/registration">Register</Link>
        </div>
      </form>
    </div>
  )
}

export default Login