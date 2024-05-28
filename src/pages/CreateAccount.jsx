import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import styled from "@emotion/styled";

import LoaderAnimation from "../components/LoaderAnimation";
import CustomSnackBar from "../components/CustomSnackBar";

const SignUpContainer = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const SignUpForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: 400,
  [theme.breakpoints.down("sm")]: {
    width: 300,
    marginTop: 15,
  },
}));

const SignUpSubContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    width: 300,
  },
}));

function CreateAccount() {
  const navigate = useNavigate();
  const userNameRegex = /\s/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [userData, setUserData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
    accessibleFarmId: "",
  });
  const [farmsData, setFarmsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userError, setUserError] = useState({});
  const [snackBarData, setSnackBarData] = useState({ status: "", message: "" });
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleInputChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const fetchFarms = async () => {
    try { 
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/farms`);
      const result = await response.json();

      const farms = result.farms.map((farm) => ({
        farmName: farm.farm_name,
        farmId: farm.farm_id,
      }));
      setFarmsData(farms);
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
  };

  const formValidater = () => {
    if (!userData.userName) {
      setUserError({ userNameError: "User name is required" });
      setSnackBarData({ status: "error", message: "Please enter a user name" });
      setSnackBarOpen(true);
      return false;
    } else if (userData.userName.length < 3) {
      setUserError({
        userNameError: "User Name length must be greater than 3 letters",
      });
      setSnackBarData({
        status: "error",
        message: "Please use atleast 3 characters for user name",
      });
      setSnackBarOpen(true);
      return false;
    } else if (userNameRegex.test(userData.userName)) {
      setUserError({
        userNameError: "User Name contains white space is not allowed",
      });
      setSnackBarData({
        status: "error",
        message: "Please remove the white space in the user name",
      });
      setSnackBarOpen(true);
      return false;
    } else if (!userData.firstName) {
      setUserError({
        firstNameError: "First Name is required",
      });
      setSnackBarData({
        status: "error",
        message: "Please enter your first name",
      });
      setSnackBarOpen(true);
      return false;
    } else if (!userData.email) {
      setUserError({
        emailError: "Email is required",
      });
      setSnackBarData({
        status: "error",
        message: "Please enter your email address",
      });
      setSnackBarOpen(true);
      return false;
    } else if (!emailRegex.test(userData.email)) {
      setUserError({
        emailError: "Email is invalid",
      });
      setSnackBarData({
        status: "error",
        message: "Please enter a valid email address",
      });
      setSnackBarOpen(true);
      return false;
    } else if (!userData.newPassword) {
      setUserError({
        newPasswordError: "New Password is required",
      });
      setSnackBarData({
        status: "error",
        message: "Please set a new password",
      });
      setSnackBarOpen(true);
      return false;
    } else if (userData.newPassword.length < 6) {
      setUserError({
        newPasswordError: "New Password must be at least 6 characters",
      });
      setSnackBarData({
        status: "error",
        message: "Please use at least 6 characters for the password",
      });
      setSnackBarOpen(true);
      return false;
    } else if (!userData.confirmPassword) {
      setUserError({
        confirmPasswordError: "Confirm your new password",
      });
      setSnackBarData({
        status: "error",
        message: "Please confirm your new password",
      });
      setSnackBarOpen(true);
      return false;
    } else if (userData.newPassword !== userData.confirmPassword) {
      setUserError({
        confirmPasswordError: "Confirmed Password is incorrect",
      });
      setSnackBarData({
        status: "error",
        message: "Please enter a correct password",
      });
      setSnackBarOpen(true);
      return false;
    } else if (!userData.accessibleFarmId) {
      setUserError({
        accessibleFarmIdError: "Access farm is required",
      });
      setSnackBarData({
        status: "error",
        message: "Please select a farm to access",
      });
      setSnackBarOpen(true);
      return false;
    } else {
      setUserError({});
      return true;
    }
  };

  const handleFormSubmit = async () => {
    const isFormValidated = formValidater();
    if (isFormValidated) {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/create_account`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
        const result = await response.json();
        if (response.status === 201) {
          setSnackBarData({ status: "success", message: result.message });
          setSnackBarOpen(true);
          setTimeout(() => setLoading(true), 2000);
          setTimeout(() => {
            navigate(`/email-verify/${result.userId}/${result.userEmail}`);
            setLoading(false);
          }, 5000);
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
  useEffect(() => {
    fetchFarms();
  }, []);

  return (
    <>
      <SignUpContainer>
        <SignUpForm component="form" marginTop={10}>
          <Typography
            variant="h1"
            align="center"
            fontSize={25}
            fontWeight={400}
            color="primary"
          >
            Create an account
          </Typography>
          <TextField
            label={
              userError.userNameError ? userError.userNameError : "User Name"
            }
            sx={{ marginTop: 2 }}
            size="medium"
            name="userName"
            error={userError.userNameError ? true : false}
            onChange={handleInputChange}
          />
          <TextField
            label={
              userError.firstNameError ? userError.firstNameError : "First Name"
            }
            sx={{ marginTop: 2 }}
            size="medium"
            name="firstName"
            error={userError.firstNameError ? true : false}
            onChange={handleInputChange}
          />
          <TextField
            label="Last Name"
            sx={{ marginTop: 1 }}
            size="medium"
            name="lastName"
            onChange={handleInputChange}
          />
          <TextField
            label={userError.emailError ? userError.emailError : "Email"}
            sx={{ marginTop: 2 }}
            size="medium"
            name="email"
            error={userError.emailError ? true : false}
            onChange={handleInputChange}
          />
          <TextField
            label={
              userError.newPasswordError
                ? userError.newPasswordError
                : "New Password"
            }
            type="password"
            sx={{ marginTop: 2 }}
            size="medium"
            name="newPassword"
            error={userError.newPasswordError ? true : false}
            onChange={handleInputChange}
          />
          <TextField
            label={
              userError.confirmPasswordError
                ? userError.confirmPasswordError
                : "Confirm Password"
            }
            type="password"
            sx={{ marginTop: 1 }}
            size="medium"
            name="confirmPassword"
            error={userError.confirmPasswordError ? true : false}
            onChange={handleInputChange}
          />

          <FormControl
            fullWidth
            sx={{ marginTop: 2 }}
            error={userError.accessibleFarmIdError ? true : false}
          >
            <InputLabel>
              {userError.accessibleFarmIdError
                ? userError.accessibleFarmIdError
                : "Access To"}
            </InputLabel>
            <Select
              label={
                userError.accessibleFarmIdError
                  ? userError.accessibleFarmIdError
                  : "Access To"
              }
              value={userData.accessibleFarmId}
              name="accessibleFarmId"
              onChange={handleInputChange}
            >
              {farmsData.map((farm) => (
                <MenuItem
                  sx={{ textTransform: "capitalize" }}
                  value={farm.farmId}
                >
                  {farm.farmName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{ marginTop: 4, p: 1, textTransform: "initial" }}
            size="large"
            onClick={handleFormSubmit}
          >
            Create account
          </Button>
        </SignUpForm>
        <SignUpSubContainer width={400} sx={{ marginTop: 4 }}>
          <Typography>Already have an account?</Typography>
          <Button
            size="medium"
            variant="outlined"
            sx={{ textTransform: "initial" }}
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
        </SignUpSubContainer>
      </SignUpContainer>
      <CustomSnackBar
        status={snackBarData.status}
        message={snackBarData.message}
        open={snackBarOpen}
        setOpen={setSnackBarOpen}
      />
      <LoaderAnimation open={loading} />
    </>
  );
}

export default CreateAccount;
