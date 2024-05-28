import React, { useEffect } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import styled from "@emotion/styled";

import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../provider/Socket";

import Lottie from "react-lottie";
import adminAnimationData from "../animations/admin.json";

const UserAccountAproveContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}));

const UserAccountAproveCard = styled(Card)(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  borderWidth: "2px",
  borderStyle: "solid",
  maxWidth: 350,
  marginTop: 100,
  [theme.breakpoints.down("sm")]: {
    width: 300,
  },
}));

function UserAccountAprove() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const { socket } = useSocket();
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: adminAnimationData,
  };

  const handleAccountVerification = () => {
    navigate("/login");
  };

  useEffect(() => {
    socket.on("account-aproved", handleAccountVerification);
    socket.on("account-rejected", handleAccountVerification);

    return () => {
      socket.off("account-aproved", handleAccountVerification);
      socket.off("account-rejected", handleAccountVerification);
    };
  }, []);

  return (
    <UserAccountAproveContainer>
      <UserAccountAproveCard>
        <CardContent>
          <Typography
            variant="h5"
            sx={{ fontWeight: 500, textAlign: "center" }}
          >
            Account approval pending
          </Typography>
          <Lottie options={lottieOptions} width={150} height={150} />
          <Typography variant="body1" sx={{ fontWeight: 400 }}>
            Your account is pending admin approval. We'll notify you as soon as
            it's approved, granting you access. Thanks for your patience!
          </Typography>
        </CardContent>
      </UserAccountAproveCard>
    </UserAccountAproveContainer>
  );
}

export default UserAccountAprove;
