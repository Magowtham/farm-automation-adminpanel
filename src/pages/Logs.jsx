import React from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import Lottie from "react-lottie";

import notFoundAnimationData from "../animations/not_found.json";

const LogsContainer = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

function Logs() {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: notFoundAnimationData,
  };
  return (
    <LogsContainer>
      <Lottie options={lottieOptions} width={300} height={300} />
    </LogsContainer>
  );
}

export default Logs;
