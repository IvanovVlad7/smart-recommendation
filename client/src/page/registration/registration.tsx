import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import { useState } from "react";
import axios from "axios";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/register", {
        name,
        email,
        password,
      });

      if (response.data.message) {
        console.log(response.data.message);
      } else {
        alert("User already exists"); 
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
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          size="small"
          margin="normal"
          className="auth-form__input"
          fullWidth={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          size="small"
          margin="normal"
          className="auth-form__input"
          fullWidth={true}
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
          onClick={handleRegister}
        >
          Register
        </Button>
        <div>
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Registration;