import React from "react";
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
  Button,
  IconButton,
} from "@mui/material";

import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import PowerRoundedIcon from "@mui/icons-material/PowerRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

function DeviceCard({
  id,
  farmId,
  deviceName,
  deviceStatus,
  nodeCount,
  powerConsumption,
  setAlertBoxOpen,
  setAlertBoxData,
}) {
  const navigate = useNavigate();

  const handleUnitRestart = () => {
    setAlertBoxOpen(true);
    setAlertBoxData({ title: "", content: "" });
  };
  return (
    <Card sx={{ maxWidth: 250, minWidth: 250 }}>
      <CardMedia
        sx={{ height: 130 }}
        image="https://cdn.pixabay.com/photo/2022/01/10/18/34/service-6929022_640.png"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          textTransform="capitalize"
        >
          {deviceName}
        </Typography>
        <List sx={{ padding: 0 }}>
          <ListItem sx={{ padding: 0 }}>
            <ListItemIcon>
              <DevicesRoundedIcon color="primary" />
            </ListItemIcon>
            <ListItemText>{nodeCount ? nodeCount : 0} Nodes</ListItemText>
          </ListItem>
        </List>
        <List sx={{ padding: 0 }}>
          <ListItem sx={{ padding: 0 }}>
            <ListItemIcon>
              <PowerRoundedIcon color="primary" />
            </ListItemIcon>
            <ListItemText>
              {powerConsumption ? powerConsumption : 0} W Power
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
        <IconButton size="medium" onClick={handleUnitRestart}>
          <RestartAltRoundedIcon color="primary" />
        </IconButton>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`/control-panel/nodes/${id}/${farmId}`)}
          disabled={deviceStatus ? false : true}
        >
          Manage
        </Button>
      </CardActions>
    </Card>
  );
}

export default DeviceCard;
