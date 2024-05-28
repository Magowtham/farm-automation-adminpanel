import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Stack,
  Divider,
} from "@mui/material";

//pages
import NavBar from "./NavBar";
import Home from "./Analytics";
import Logs from "./Logs";
import Media from "./Media";
import Notifications from "./Notifications";
import Contact from "./Contact";
import Settings from "./Settings";
import FarmNodeManage from "./FarmNodeManage";
import LoaderAnimation from "../components/LoaderAnimation";

//components
import CustomSnackBar from "../components/CustomSnackBar";

//icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import DatasetRoundedIcon from "@mui/icons-material/DatasetRounded";
import MovieRoundedIcon from "@mui/icons-material/MovieRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import styled from "@emotion/styled";

const MainContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
}));

const SubContainer = styled(Box)(() => ({
  display: "flex",
  position: "relative",
  flex: 1,
}));

const SideBarContainer = styled(Box)(({ theme, sideBarOpen }) => ({
  height: "100%",
  position: "relative",
  zIndex: 3,
  overflow: "hidden",
  borderRight: "1px solid grey",
  backgroundColor: theme.palette.secondary.main,
  flex: sideBarOpen ? 1.1 : 0,
  transition: "flex ease-in 0.3s",
  [theme.breakpoints.between("md", "xl")]: {
    flex: sideBarOpen ? 2 : 0,
  },
  [theme.breakpoints.down("md")]: {
    position: "absolute",
    left: sideBarOpen ? 0 : -500,
    transition: "left ease-out 0.5s",
  },
}));

const ContentContainer = styled(Box)(() => ({
  flex: 8,
}));

const OverLay = styled("div")(({ theme, sideBarOpen }) => ({
  zIndex: 2,
  position: "absolute",
  backgroundColor: "black",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  opacity: 0.5,
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
    visibility: sideBarOpen ? "visisble" : "hidden",
  },
}));

function App() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackBarData, setSnackBarData] = useState({ status: "", message: "" });
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleWindowResize = () => {
    if (window.innerWidth < 1024) setSideBarOpen(false);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await fetch(`${process.env.REACT_APP_API_URL}/user_logout`, {
        credentials: "include",
      });
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
      navigate("/login");
    }
  };

  const verifyToken = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/verify_token`,
        {
          credentials: "include",
        }
      );

      const result = await response.json();
      console.log(result);
      if (response.status === 200) {
        setUserId(result.decodedData.userId);
      } else {
        navigate("/login");
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

  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  return (
    <>
      <MainContainer>
        <Box>
          <NavBar setDrawerOpen={setSideBarOpen} drawerOpen={sideBarOpen} />
        </Box>
        <SubContainer>
          <SideBarContainer sideBarOpen={sideBarOpen}>
            <Stack
              justifyContent="center"
              sx={{
                height: "100%",
              }}
            >
              <List
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <ListItem>
                  <ListItemButton onClick={() => navigate("/")}>
                    <ListItemIcon>
                      <HomeRoundedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={() => navigate("/control-panel")}>
                    <ListItemIcon>
                      <HubRoundedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Control" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={() => navigate("/logs")}>
                    <ListItemIcon>
                      <DatasetRoundedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Logs" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={() => navigate("/media")}>
                    <ListItemIcon>
                      <MovieRoundedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Media" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    onClick={() => navigate(`/notifications/${userId}`)}
                  >
                    <ListItemIcon>
                      <NotificationsActiveRoundedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Notifications" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={() => navigate("/contact")}>
                    <ListItemIcon>
                      <ContactMailRoundedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Contact" />
                  </ListItemButton>
                </ListItem>
                <Divider sx={{ marginTop: 2, width: "80%", margin: "auto" }} />
                <ListItem sx={{ marginTop: 3 }}>
                  <ListItemButton onClick={() => navigate("/settings")}>
                    <ListItemIcon>
                      <SettingsRoundedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutRoundedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Stack>
          </SideBarContainer>
          <OverLay
            sideBarOpen={sideBarOpen}
            onClick={() => setSideBarOpen(false)}
          />
          <ContentContainer>
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route
                path="/control-panel/*"
                element={<FarmNodeManage userId={userId} />}
              />
              <Route path="/logs/*" element={<Logs />} />
              <Route path="/media/*" element={<Media />} />
              <Route
                path="/notifications/:user_id/*"
                element={<Notifications />}
              />
              <Route path="/contact/*" element={<Contact />} />
              <Route path="/settings/*" element={<Settings />} />
            </Routes>
          </ContentContainer>
        </SubContainer>
      </MainContainer>
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

export default App;
