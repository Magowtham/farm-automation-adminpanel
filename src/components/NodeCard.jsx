import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Switch,
  Button,
} from "@mui/material";

import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import PowerRoundedIcon from "@mui/icons-material/PowerRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import CustomSnackBar from "./CustomSnackBar";

import { useSocket } from "../provider/Socket";
import LoaderAnimation from "./LoaderAnimation";

function NodeCard({
  userId,
  deviceId,
  farmId,
  nodeName,
  nodePin,
  nodePowerConsumption,
  nodeUsageTime,
  nodePrevState,
}) {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [nodeState, setNodeState] = useState(nodePrevState);
  const [loaderAnimation, setLoaderAnimation] = useState(false);
  const [snackBarData, setSnackBarData] = useState({
    status: "",
    message: "",
  });
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleSwitchButton = () => {
    socket.emit(nodeName, {
      userId,
      deviceId,
      nodeName: nodeName,
      state: !nodeState,
    });
    setLoaderAnimation(true);
  };

  const handleAcknowledgement = (data) => {
    if (nodeName === data.nodeName) {
      setNodeState(data.state);
      setLoaderAnimation(false);
    }
  };

  const handleNodeMannualControl = (data) => {
    if (nodeName === data.nodeName) {
      setNodeState(data.nodeState);
      setLoaderAnimation(false);
    }
  };

  const handleUnitDisconnected = () => {
    setSnackBarData({ status: "error", message: "unit is offline" });
    setSnackBarOpen(true);
    setTimeout(() => {
      setLoaderAnimation(false);
    }, 1000);

    setTimeout(() => {
      navigate(`/control-panel/devices/${farmId}`);
      setLoaderAnimation(false);
    }, 6000);
  };

  useEffect(() => {
    socket.on("adminpanel-acknowledgement", handleAcknowledgement);
    socket.on("node-mannual-control", handleNodeMannualControl);
    socket.on("unit-disconnected", handleUnitDisconnected);
    return () => {
      socket.off("adminpanel-acknowledgement", handleAcknowledgement);
      socket.off("node-mannual-control", handleNodeMannualControl);
      socket.off("unit-disconnected", handleUnitDisconnected);
    };
  }, []);

  return (
    <>
      <Card sx={{ maxWidth: 250, minWidth: 250 }}>
        <CardMedia
          sx={{ height: 130 }}
          image="https://cdn.pixabay.com/photo/2022/01/10/18/34/service-6929022_640.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {nodeName}
          </Typography>
          <List sx={{ padding: 0 }}>
            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon>
                <ElectricalServicesIcon color="primary" />
              </ListItemIcon>
              <ListItemText>
                {nodePin ? `${nodePin} Pin` : `Not Defined`}
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon>
                <PowerRoundedIcon color="primary" />
              </ListItemIcon>
              <ListItemText>
                {nodePowerConsumption ? nodePowerConsumption : 0} W Power
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon>
                <AccessTimeRoundedIcon color="primary" />
              </ListItemIcon>
              <ListItemText>
                {nodeUsageTime ? nodeUsageTime : 0} Hour Time
              </ListItemText>
            </ListItem>
          </List>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 0,
          }}
        >
          <Button variant="contained" size="small">
            Manage
          </Button>
          <Switch
            color="primary"
            checked={nodeState}
            onChange={handleSwitchButton}
          />
        </CardActions>
      </Card>
      <LoaderAnimation open={loaderAnimation} />
      <CustomSnackBar
        status={snackBarData.status}
        message={snackBarData.message}
        open={snackBarOpen}
        setOpen={setSnackBarOpen}
      />
    </>
  );
}

export default NodeCard;
