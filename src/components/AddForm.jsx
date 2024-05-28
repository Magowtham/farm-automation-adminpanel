import React, { useState } from "react";
import { Dialog, DialogTitle, Box, Button, TextField } from "@mui/material";

//components
import FormLoaderAnimation from "./FormLoaderAnimation";
import CustomSnackBar from "./CustomSnackBar";

function AddForm({
  fields,
  title,
  buttonValue,
  open,
  setOpen,
  apiEndPoint,
  formDataTemplate,
  setPageRefresh,
}) {
  const [formData, setFormData] = useState(formDataTemplate);
  const [formError, setFormError] = useState({});
  const [loaderAnimation, setLoaderAnimation] = useState(false);
  const [snackBarData, setSnackBarData] = useState({ status: "", message: "" });
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const formValidater = () => {
    if (!formData.name) {
      setFormError({ name: "Name is required" });
      setSnackBarData({ status: "error", message: "Please enter a name" });
      setSnackBarOpen(true);
      return false;
    } else {
      setFormError({});
      return true;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isFormValid = formValidater();

    if (isFormValid) {
      try {
        setLoaderAnimation(true);
        const response = await fetch(apiEndPoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        console.log(result);
        if (response.status === 201) {
          setSnackBarData({ status: "success", message: result.message });
          setSnackBarOpen(true);
          setLoaderAnimation(false);
          setOpen(false);
          setPageRefresh(true);
        } else {
          setSnackBarData({
            status: "error",
            message: result.message,
          });
          setSnackBarOpen(true);
          setLoaderAnimation(false);
          setOpen(false);
        }
      } catch (error) {
      } finally {
        setLoaderAnimation(false);
      }
    }
  };
  return (
    <>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <FormLoaderAnimation open={loaderAnimation} />
        <DialogTitle>{title}</DialogTitle>
        <Box
          sx={{
            marginLeft: 3,
            marginRight: 3,
            marginBottom: 3,
          }}
        >
          <Box component="form" noValidate fullWidth autoComplete="off">
            {fields.map((value, index) => (
              <TextField
                key={index}
                id="outlined-basic"
                label={formError.name ? formError.name : value.label}
                variant="outlined"
                name="name"
                fullWidth
                error={formError.name ? true : false}
                onChange={handleInputChange}
              />
            ))}
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
              {buttonValue}
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

export default AddForm;
