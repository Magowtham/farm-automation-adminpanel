import React from "react";
import { Fab } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

function FloatingButton({ setOpen }) {
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{ position: "absolute", bottom: 30, right: 30 }}
      onClick={() => setOpen(true)}
    >
      <AddRoundedIcon />
    </Fab>
  );
}

export default FloatingButton;
