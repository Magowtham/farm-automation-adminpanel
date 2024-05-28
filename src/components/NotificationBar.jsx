import React from "react";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

//icons
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

function NotificationBar({
  notificationIndex,
  notificationId,
  fullName,
  nodeName,
  nodeState,
  date,
  time,
  setNotificationClearState,
}) {
  const handleNotificationClear = () => {
    setNotificationClearState({
      index: notificationIndex,
      id: notificationId,
    });
  };
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 900,
        borderRadius: "4px",
      }}
    >
      <ListItem
        secondaryAction={
          <IconButton onClick={handleNotificationClear}>
            <ClearRoundedIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar>
            <PersonRoundedIcon color="primary" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${fullName} turned the ${nodeName} ${
            nodeState ? "on" : "off"
          }`}
          secondary={`${date} ${time}`}
        />
      </ListItem>
      <Divider />
    </List>
  );
}

export default NotificationBar;
