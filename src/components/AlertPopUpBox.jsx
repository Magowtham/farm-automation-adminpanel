import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertPopUpBox({ data, open, setOpen, setAgree }) {
  const handleAgree = () => {
    setAgree(true);
    setOpen(false);
  };

  const handleDisAgree = () => {
    setAgree(false);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleDisAgree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{data?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {data?.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAgree}>Disagree</Button>
          <Button onClick={handleDisAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
