import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import styled from "@emotion/styled";

//components
import NodeCard from "../components/NodeCard";
import NodeAddForm from "../components/NodeAddForm";
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

function NodeGrid({ userId, dialogBox, setDialogBox }) {
  const { id, farm_id } = useParams();
  const navigate = useNavigate();
  const [maxHeight, setMaxHeight] = useState(window.innerHeight - 260);
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageRefresh, setPageRefresh] = useState(false);
  const [nodePins, setNodePins] = useState([]);
  const [nodeManualControlPins, setNodeManualControlPins] = useState([]);
  const [snackBarData, setSnackBarData] = useState({
    status: "",
    message: "",
  });
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleWindowResize = () => {
    setMaxHeight(window.innerHeight - 260);
  };

  const fetchNodes = async (req, res) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/nodes?device_id=${id}`
      );
      const result = await response.json();
      if (response.status === 200) {
        setTimeout(() => {
          setNodes(result.nodes);
          setNodePins(result.available_node_pins);
          setNodeManualControlPins(result.available_node_manual_control_pins);
        }, 1000);
      } else {
        setSnackBarData({ status: "error", message: result.message });
        setSnackBarOpen(true);
      }
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

  const checkDeviceStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/device_status/${id}`
      );
      const result = await response.json();
      if (response.status === 200) {
        setSnackBarData({ status: "success", message: result.message });
        setSnackBarOpen(true);
      } else {
        setSnackBarData({ status: "error", message: result.message });
        setSnackBarOpen(true);

        setTimeout(() => {
          setLoading(true);
        }, 2000);

        setTimeout(() => {
          navigate(`/control-panel/devices/${farm_id}`);
          setLoading(false);
        }, 6000);
      }
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
    }
  };

  useEffect(() => {
    checkDeviceStatus();
    fetchNodes();
  }, []);

  useEffect(() => {
    if (pageRefresh) {
      fetchNodes();
    }
  }, [pageRefresh]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  return (
    <>
      <NodeGridContainer>
        <Typography variant="h5">Connected Nodes</Typography>
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
          {nodes.map((node, index) => (
            <Grid item key={index}>
              <NodeCard
                userId={userId}
                deviceId={id}
                farmId={farm_id}
                nodeName={node.name}
                nodePin={node.node_pin}
                nodeManualControlPin={node.node_manual_control_pin}
                nodePowerConsumption={node.power_consumption}
                nodeUsageTime={node.usage_time}
                nodePrevState={node.state}
              />
            </Grid>
          ))}
        </Grid>
        <NodeAddForm
          id={id}
          open={dialogBox}
          setOpen={setDialogBox}
          nodePins={nodePins}
          nodeManualControlPins={nodeManualControlPins}
          apiEndPoint={`${process.env.REACT_APP_API_URL}/create_node`}
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

export default NodeGrid;
