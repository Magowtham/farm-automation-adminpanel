import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  AppBar,
  Box,
  Stack,
  IconButton,
  Toolbar,
  Input,
  Tooltip,
} from "@mui/material";
import styled from "@emotion/styled";

//icons
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import LinkOffRoundedIcon from "@mui/icons-material/LinkOffRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

//pages
import FarmGrid from "./FarmGrid";
import DeviceGrid from "./DeviceGrid";
import NodeGrid from "./NodeGrid";

//components
import FloatingButton from "../components/FloatingButton";

//socket connection instance
import { useSocket } from "../provider/Socket";

const NodeManageContainer = styled(Box)(() => ({
  backgroundColor: "white",
  width: "100%",
  height: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
}));

const NodeManageAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  paddingTop: 20,
  paddingLeft: 2,
  paddingRight: 2,
  paddingBottom: 0,
}));

const SearchContainer = styled("div")(({ theme }) => {
  return {
    border: "2px",
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
    borderRadius: "4px",
  };
});

const ManageSectionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
}));

function FarmNodeManage({ userId }) {
  const [dialogBox, setDialogBox] = useState(false);

  //using socket instance
  const { isSocketDisconnected } = useSocket();

  return (
    <NodeManageContainer>
      <NodeManageAppBar position="static">
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Box>
              <Tooltip title="Socket Connection">
                <IconButton>
                  {isSocketDisconnected ? (
                    <LinkOffRoundedIcon
                      color="primary"
                      sx={{ height: 35, width: 35 }}
                    />
                  ) : (
                    <LinkRoundedIcon
                      color="primary"
                      sx={{ height: 35, width: 35 }}
                    />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
            <ManageSectionContainer>
              <SearchContainer>
                <IconButton size="medium">
                  <SearchRoundedIcon color="primary" />
                </IconButton>
                <Input
                  placeholder="search.."
                  disableUnderline
                  sx={{ width: { xs: 150, sm: 200 } }}
                />
              </SearchContainer>
            </ManageSectionContainer>
          </Stack>
        </Toolbar>
      </NodeManageAppBar>

      <Routes>
        <Route
          path="/"
          element={
            <FarmGrid dialogBox={dialogBox} setDialogBox={setDialogBox} />
          }
        />
        <Route
          path="/devices/:id"
          element={
            <DeviceGrid dialogBox={dialogBox} setDialogBox={setDialogBox} />
          }
        />
        <Route
          path="/nodes/:id/:farm_id"
          element={
            <NodeGrid
              userId={userId}
              dialogBox={dialogBox}
              setDialogBox={setDialogBox}
            />
          }
        />
      </Routes>

      <FloatingButton setOpen={setDialogBox} />
    </NodeManageContainer>
  );
}

export default FarmNodeManage;
