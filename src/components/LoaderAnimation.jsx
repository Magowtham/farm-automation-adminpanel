import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

function LoaderAnimation({ open }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default LoaderAnimation;
