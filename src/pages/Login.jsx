import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";

import LoaderAnimation from "../components/LoaderAnimation";
import CustomSnackBar from "../components/CustomSnackBar";

const LoginContainer = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const LoginForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: 300,
}));

const LoginSubContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ userName: "", password: "" });
  const [loginError, setLoginError] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackBarData, setSnackBarData] = useState({ status: "", message: "" });
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleInputChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const loginValidater = () => {
    if (!loginData.userName) {
      setLoginError({ userNameError: "User name is required" });
      setSnackBarData({
        status: "error",
        message: "Please enter your user name",
      });
      setSnackBarOpen(true);
      return false;
    } else if (!loginData.password) {
      setLoginError({ passwordError: "Password is required" });
      setSnackBarData({
        status: "error",
        message: "Please enter your password",
      });
      setSnackBarOpen(true);
      return false;
    } else {
      setLoginError({});
      return true;
    }
  };

  const handleSubmit = async () => {
    const isLoginValidated = loginValidater();
    if (isLoginValidated) {
      try {
        setLoading(true);
        console.log(process.env.REACT_APP_API_URL);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        const result = await response.json();

        if (response.status === 200) {
          navigate("/");
        } else if (response.status === 403) {
          if (result.type === "email_verification") {
            navigate(`/email-verify/${result.userId}/${result.userEmail}`);
          } else {
            navigate(`/admin-aprove/${result.userId}`);
          }
        } else {
          setSnackBarData({ status: "error", message: result.message });
          setSnackBarOpen(true);
        }
      } catch (error) {
        setSnackBarData({
          status: "error",
          message: "Server communication failed",
        });
        setSnackBarOpen(true);
        setTimeout(() => {
          setSnackBarData({
            status: "error",
            message: "Check your internet connection",
          });
          setSnackBarOpen(true);
        }, 3000);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <LoginContainer>
        <LoginForm component="form" marginTop={10}>
          <Typography
            variant="h1"
            textAlign="center"
            fontSize={25}
            fontWeight={400}
            color="primary"
          >
            Log in to Anmaya
          </Typography>
          <TextField
            label={
              loginError.userNameError ? loginError.userNameError : "UserName"
            }
            name="userName"
            sx={{ marginTop: 2 }}
            size="medium"
            error={loginError.userNameError ? true : false}
            onChange={handleInputChange}
          />
          <Typography
            textAlign="end"
            sx={{
              marginTop: 1,
              border: 0,
              background: "none",
              cursor: "pointer",
              width: "fit-content",
            }}
            component="button"
          >
            Forgot password?
          </Typography>
          <TextField
            label={
              loginError.passwordError ? loginError.passwordError : "Password"
            }
            size="medium"
            name="password"
            sx={{ marginTop: 1 }}
            type="password"
            error={loginError.passwordError ? true : false}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            sx={{ marginTop: 4, p: 1, textTransform: "initial" }}
            size="large"
            onClick={handleSubmit}
          >
            Log in
          </Button>
        </LoginForm>
        <LoginSubContainer width={300} sx={{ marginTop: 4 }}>
          <Typography>New User?</Typography>
          <Button
            size="medium"
            variant="outlined"
            sx={{ textTransform: "initial" }}
            onClick={() => navigate("/create_account")}
          >
            Create an account
          </Button>
        </LoginSubContainer>
      </LoginContainer>
      <LoaderAnimation open={loading} />
      <CustomSnackBar
        status={snackBarData.status}
        message={snackBarData.message}
        open={snackBarOpen}
        setOpen={setSnackBarOpen}
      />
    </>
  );
}

export default Login;
