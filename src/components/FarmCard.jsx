import * as React from "react";

import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";

import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import PowerRoundedIcon from "@mui/icons-material/PowerRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";

import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const CustomCard = styled(Card)(({ theme }) => ({
  minWidth: 300,
  [theme.breakpoints.down("sm")]: {
    minWidth: 280,
  },
}));
function FarmCard({
  id,
  name,
  deviceCount,
  powerConsumption,
  waterConsumption,
}) {
  const navigate = useNavigate();
  return (
    <CustomCard>
      <CardMedia
        sx={{ height: 160 }}
        image="https://media.istockphoto.com/id/483728598/photo/allotments-at-sunset-plastic-greenhouse.jpg?s=612x612&w=0&k=20&c=ZURNvGRhedK4k6EKLD98JvtcpWo6wTMWKSTHqCOkDu4="
        title="green iguana"
      />
      <CardContent sx={{ paddingTop: 2, paddingBottom: 0 }}>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <List disablePadding>
          <ListItem sx={{ padding: 0 }}>
            <ListItemIcon>
              <DevicesRoundedIcon color="primary" />
            </ListItemIcon>
            <ListItemText>{deviceCount ? deviceCount : 0} Devices</ListItemText>
          </ListItem>
          <ListItem sx={{ padding: 0 }}>
            <ListItemIcon>
              <PowerRoundedIcon color="primary" />
            </ListItemIcon>
            <ListItemText>
              {powerConsumption ? powerConsumption : 0} W Power
            </ListItemText>
          </ListItem>
          <ListItem sx={{ padding: 0 }}>
            <ListItemIcon>
              <WaterDropRoundedIcon color="primary" />
            </ListItemIcon>
            <ListItemText>
              {waterConsumption ? waterConsumption : 0} L Water
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
          size="medium"
          onClick={() => navigate(`/control-panel/devices/${id}`)}
        >
          Manage
        </Button>
      </CardActions>
    </CustomCard>
  );
}

export default FarmCard;
