import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registerUrl  } from "../../constans/constans";
import { MAIN_ENDPOINT}  from "../../constans/constans";

const Registration = () => {
  // TODO: refactor registration the same as it is in login
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

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

  return (
    <div className="auth-form">
      <Typography variant="h3" component="div">
        Register
      </Typography>
      <form className="auth-form__form">
        <TextField
          label="Name"
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
          helperText={nameError ? "Name is required" : ""}
        />
        <TextField
          label="Email"
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
          helperText={emailError ? "Email is required" : ""}
        />
        <TextField
          label="Password"
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
          helperText={passwordError ? "Password is required" : ""}
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
          Register
        </Button>
        <div>
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>)
};

export default Registration;