import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Lottie from "react-lottie";
import styled from "@emotion/styled";

//components
import LoaderAnimation from "../components/LoaderAnimation";
import CustomSnackBar from "../components/CustomSnackBar";
import emailVerificationAnimationData from "../animations/email_verification.json";

import { useSocket } from "../provider/Socket";

const UserEmailVerifyContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}));

const UserEmailVerifyCard = styled(Card)(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  borderWidth: "2px",
  borderStyle: "solid",
  maxWidth: 350,
  marginTop: 100,
  [theme.breakpoints.down("sm")]: {
    width: 300,
  },
}));

function UserEmailVerify() {
  const navigate = useNavigate();
  const { user_id, user_email } = useParams();
  const { socket } = useSocket();

  const [loading, setLoading] = useState(false);
  const [snackBarData, setSnackBarData] = useState({ status: "", message: "" });
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: emailVerificationAnimationData,
  };

  const handleEmailVerification = (data) => {
    if (data.userId === user_id) navigate(`/admin-aprove/${user_id}`);
  };

  const sendEmailVerifyEmail = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/account/send__email_verify_email/${user_id}`
      );
      const result = await response.json();
      if (response.status === 200) {
        setSnackBarData({ status: "success", message: result.message });
        setSnackBarOpen(true);
      } else if (response.status === 404) {
        navigate("/login");
      } else {
        navigate("/login");
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
  };

  useEffect(() => {
    socket.on("email-verified", handleEmailVerification);
    return () => {
      socket.off("email-verified", handleEmailVerification);
    };
  }, []);

  return (
    <>
      <UserEmailVerifyContainer>
        <UserEmailVerifyCard>
          <CardContent>
            <Typography
              variant="h5"
              sx={{ fontWeight: 500, textAlign: "center" }}
            >
              Please verify your email
            </Typography>
            <Lottie options={lottieOptions} width={150} height={150} />
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              Verification email sent! to{" "}
              <Typography sx={{ fontWeight: 500 }} component="span">
                {user_email}
              </Typography>
              . Check your inbox and click the link to verify.
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              variant="contained"
              size="medium"
              onClick={sendEmailVerifyEmail}
            >
              Resend
            </Button>
          </CardActions>
        </UserEmailVerifyCard>
      </UserEmailVerifyContainer>
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

export default UserEmailVerify;
