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
} from "@mui/material";

import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import PowerRoundedIcon from "@mui/icons-material/PowerRounded";

function DeviceCard({ id, deviceName, nodeCount, powerConsumption }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 250, minWidth: 250 }}>
      <CardMedia
        sx={{ height: 130 }}
        image="https://cdn.pixabay.com/photo/2022/01/10/18/34/service-6929022_640.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
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
          justifyContent: "end",
          paddingTop: 0,
        }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`/control-panel/nodes/${id}`)}
        >
          Manage
        </Button>
      </CardActions>
    </Card>
  );
}

export default DeviceCard;
