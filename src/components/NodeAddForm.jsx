import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from "@mui/material";

import CustomSnackBar from "./CustomSnackBar";
import FormLoaderAnimation from "./FormLoaderAnimation";

function NodeAddForm({
  id,
  open,
  setOpen,
  apiEndPoint,
  nodePins,
  nodeManualControlPins,
  setPageRefresh,
}) {
  const [formData, setFormData] = useState({
    deviceId: id,
    name: "",
    nodePin: "",
    nodeManualControlPin: "",
  });
  const [formError, setFormError] = useState({});
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarData, setSnackBarData] = useState({ status: "", message: "" });
  const [formLoaderAnimation, setFormLoaderAnimation] = useState(false);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const formValidater = () => {
    if (!formData.name) {
      setFormError({ nameError: "Node name is required" });
      setSnackBarData({ status: "error", message: "Please enter a node name" });
      setSnackBarOpen(true);
      return false;
    } else if (!formData.nodePin) {
      setFormError({ nodePinError: "Node pin is required" });
      setSnackBarData({ status: "error", message: "Please select a node pin" });
      setSnackBarOpen(true);
      return false;
    } else if (!formData.nodeManualControlPin) {
      setFormError({ nodePinError: "Node mannual control pin is required" });
      setSnackBarData({
        status: "error",
        message: "Please select a node mannual control pin",
      });
      setSnackBarOpen(true);
    } else {
      setFormError({});
      return true;
    }
  };
  const handleSubmit = async () => {
    console.log("called");
    const isFormValidated = formValidater();
    if (isFormValidated) {
      try {
        setFormLoaderAnimation(true);
        const response = await fetch(apiEndPoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await response.json();

        if (response.status === 201) {
          setSnackBarData({ status: "success", message: result.message });
          setSnackBarOpen(true);
          setFormLoaderAnimation(false);
          setOpen(false);
          setPageRefresh(true);
        } else {
          setSnackBarData({
            status: "error",
            message: result.message,
          });
          setSnackBarOpen(true);
          setFormLoaderAnimation(false);
          setOpen(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setFormData({
          deviceId: id,
          name: "",
          nodePin: "",
          nodeManualControlPin: "",
        });
        setFormLoaderAnimation(false);
      }
    }
  };

  return (
    <>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <FormLoaderAnimation open={formLoaderAnimation} />
        <DialogTitle>New Node</DialogTitle>
        <Box
          sx={{
            marginLeft: 3,
            marginRight: 3,
            marginBottom: 3,
          }}
        >
          <Box component="form" noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label={formError.nameError ? formError.nameError : "Node Name"}
              name="name"
              variant="outlined"
              error={formError.nameError ? true : false}
              onChange={handleInputChange}
              fullWidth
            />

            <FormControl fullWidth sx={{ marginTop: 3 }}>
              <InputLabel id="Name">Node Pin</InputLabel>
              <Select
                value={formData.nodePin}
                label={
                  formData.nodePinError ? formData.nodePinError : "Node Pin"
                }
                name="nodePin"
                error={formData.nodePinError ? true : false}
                onChange={handleInputChange}
              >
                {nodePins?.map((pin, index) => (
                  <MenuItem key={index} value={pin}>
                    {pin}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: 3 }}>
              <InputLabel id="Name">Node Manual Control Pin</InputLabel>
              <Select
                value={formData.nodeManualControlPin}
                label={
                  formData.nodeManualControlPinError
                    ? formData.nodeManualControlPinError
                    : "Node Manual Control Pin"
                }
                name="nodeManualControlPin"
                error={formData.nodeManualControlPinError ? true : false}
                onChange={handleInputChange}
              >
                {nodeManualControlPins?.map((pin, index) => (
                  <MenuItem key={index} value={pin}>
                    {pin}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              size="medium"
              sx={{ marginTop: 2 }}
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Dialog>
      <CustomSnackBar
        status={snackBarData.status}
        message={snackBarData.message}
        open={snackBarOpen}
        setOpen={setSnackBarOpen}
      />
    </>
  );
}

export default NodeAddForm;
