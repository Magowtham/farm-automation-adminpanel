import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import styled from "@emotion/styled";

//components
import DeviceCard from "../components/DeviceCard";
import AddForm from "../components/AddForm";
import LoaderAnimation from "../components/LoaderAnimation";
import CustomSnackBar from "../components/CustomSnackBar";

const NodeGridContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: 10,
  paddingLeft: 40,
  paddingRight: 40,
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 20,
    paddingRight: 20,
  },
}));

function DeviceGrid({ dialogBox, setDialogBox }) {
  const { id } = useParams();
  const [maxHeight, setMaxHeight] = useState(window.innerHeight - 260);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackBarData, setSnackBarData] = useState({
    status: "",
    message: "",
  });
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [pageRefresh, setPageRefresh] = useState(false);

  const handleWindowResize = () => {
    setMaxHeight(window.innerHeight - 260);
  };

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/devices?farm_id=${id}`
      );
      const result = await response.json();
      setTimeout(() => {
        setDevices(result.devices);
      }, 1000);

      console.log(result);
    } catch (error) {
      setSnackBarData({
        status: "error",
        message: "Server communication failed",
      });
      setSnackBarOpen(true);
      setTimeout(() => {
        setSnackBarData({
          status: "error",
          message: "Check your internet connection",
        });
        setSnackBarOpen(true);
      }, 3000);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      setPageRefresh(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  useEffect(() => {
    fetchDevices();
  }, []);
  useEffect(() => {
    if (pageRefresh) {
      fetchDevices();
    }
  }, [pageRefresh]);

  return (
    <>
      <NodeGridContainer>
        <Typography variant="h5">Installed Units</Typography>
        <Grid
          container
          gap={5}
          sx={{
            padding: 0,
            maxHeight: `${maxHeight}px`,
            overflow: "auto",
            marginTop: 3,
          }}
        >
          {devices.map((device, index) => (
            <Grid item>
              <DeviceCard
                key={index}
                id={device.device_id}
                farmId={id}
                deviceName={device.device_name}
                deviceStatus={device.device_status}
                nodeCount={device.connected_nodes_length}
                powerConsumption={device.power_consumption}
              />
            </Grid>
          ))}
        </Grid>
        <AddForm
          fields={[{ label: "Name" }]}
          title="New Device"
          open={dialogBox}
          setOpen={setDialogBox}
          buttonValue="create"
          apiEndPoint={`${process.env.REACT_APP_API_URL}/create_device`}
          formDataTemplate={{ farmId: id, name: "" }}
          setPageRefresh={setPageRefresh}
        />
        <LoaderAnimation open={loading} />
      </NodeGridContainer>
      <CustomSnackBar
        status={snackBarData.status}
        message={snackBarData.message}
        open={snackBarOpen}
        setOpen={setSnackBarOpen}
      />
    </>
  );
}

export default DeviceGrid;
