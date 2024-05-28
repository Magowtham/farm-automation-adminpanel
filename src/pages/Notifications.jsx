import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import styled from "@emotion/styled";

import Lottie from "react-lottie";
import emptyAnimationData from "../animations/empty.json";

import { useSocket } from "../provider/Socket";

import NotificationBar from "../components/NotificationBar";
import LoaderAnimation from "../components/LoaderAnimation";
import CustomSnackBar from "../components/CustomSnackBar";

const NotificationsContainer = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
}));

function Notifications() {
  const { user_id } = useParams();
  const { socket } = useSocket();

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyAnimationData,
  };

  const [notifications, setNotifications] = useState([]);
  const [notificationClearState, setNotificationClearState] = useState(null);
  const [snackBarData, setSnackBarData] = useState({ status: "", message: "" });
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/notifications/${user_id}`
      );

      const result = await response.json();

      if (response.status === 200) {
        setNotifications(result.notifications);
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
      setLoading(false);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/delete_notification/${id}`
      );
      const result = await response.json();

      if (response.status === 200) {
        setSnackBarData({ status: "success", message: result.message });
        setSnackBarOpen(true);
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
    }
  };

  useEffect(() => {
    if (notificationClearState !== null) {
      deleteNotification(notificationClearState.id);
      notifications.splice(notificationClearState.index, 1);
      setNotificationClearState(null);
    }
  }, [notificationClearState]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    socket.on("notification", fetchNotifications);
    return () => {
      socket.off("notification", fetchNotifications);
    };
  }, []);
  return (
    <>
      <NotificationsContainer>
        <Stack
          alignItems={"center"}
          overflow={"auto"}
          sx={{
            width: "100%",
            maxHeight: "80vh",
          }}
        >
          {notifications.length === 0 ? (
            <Lottie options={lottieOptions} width={300} height={300} />
          ) : (
            notifications.map((notification, index) => (
              <NotificationBar
                key={index}
                notificationIndex={index}
                notificationId={notification?.id}
                fullName={notification?.userFullName}
                nodeName={notification?.nodeName}
                nodeState={notification?.state}
                date={notification?.date}
                time={notification?.time}
                setNotificationClearState={setNotificationClearState}
              />
            ))
          )}
        </Stack>
      </NotificationsContainer>
      <LoaderAnimation open={loading} />
      <CustomSnackBar
        status={snackBarData.status}
        message={snackBarData.message}
        open={snackBarOpen}
        setOpen={setSnackBarOpen}
      />
    </>
  );
}

export default Notifications;
