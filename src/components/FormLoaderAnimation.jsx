import React from "react";
import { Box, LinearProgress } from "@mui/material";

function FormLoaderAnimation({ open }) {
  return (
    <Box sx={{ visibility: open ? "visible" : "hidden" }}>
      <LinearProgress sx={{ position: "relative", zIndex: 999 }} />
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          top: 0,
          background: "black",
          opacity: 0.5,
          height: "100%",
          zIndex: 99,
        }}
      ></Box>
    </Box>
  );
}

export default FormLoaderAnimation;
