import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import * as React from "react";
import './login.css';
import  { useState } from "react";
import axios from "axios";



const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail] = useState("")

    const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login", {
        name,
        email,
        password,
      });

      console.log(response.data); 
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return(
    <div className="auth-form">
  <Typography variant="h3" component="div">
    Log In
  </Typography>
  <form className="auth-form__form">
    <TextField
      label="Name"
      size="small"
      margin="normal"
      className="auth-form__input"
      fullWidth={true}
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <TextField
      label="Email"
      size="small"
      margin="normal"
      className="auth-form__input"
      fullWidth={true}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <TextField
      label="Password"
      type="password"
      size="small"
      margin="normal"
      className="auth-form__input"
      fullWidth={true}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
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
      Don't have an account? <Link to="/register">Register</Link>
    </div>
  </form>
</div>
  )
}

export default Login