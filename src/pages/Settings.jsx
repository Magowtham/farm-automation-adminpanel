import React from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import Lottie from "react-lottie";

import notFoundAnimationData from "../animations/not_found.json";

const SettingsContainer = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

function Settings() {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: notFoundAnimationData,
  };
  return (
    <SettingsContainer>
      <Lottie options={lottieOptions} width={300} height={300} />
    </SettingsContainer>
  );
}

export default Settings;
