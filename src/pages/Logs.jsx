import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import styled from "@emotion/styled";
import Lottie from "react-lottie";

import notFoundAnimationData from "../animations/not_found.json";

const LogsContainer = styled(Box)(() => ({
  height: "100%",
}));

const TabContainer = styled(Box)(() => ({
  margin: 20,
}));

function Logs() {
  const [value, setValue] = useState(0);
  const handleOnchange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: notFoundAnimationData,
  };
  return (
    <LogsContainer>
      <TabContainer>
        <Tabs value={value} onChange={handleOnchange}>
          <Tab label="Nodes Log" />
          <Tab label="Sensors Log" />
        </Tabs>
      </TabContainer>
      {/* <Lottie options={lottieOptions} width={300} height={300} /> */}
    </LogsContainer>
  );
}

export default Logs;
