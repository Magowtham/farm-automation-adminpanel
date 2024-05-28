import React from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

//pages
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import UserEmailVerify from "./pages/UserEmailVerify";
import UserAccountAprove from "./pages/UserAccountAprove";
import Home from "./pages/Home";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 920,
      md: 1024,
      lg: 1200,
      xl: 1800,
    },
  },
  palette: {
    primary: {
      main: "#292929",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create_account" element={<CreateAccount />} />
        <Route
          path="/email-verify/:user_id/:user_email"
          element={<UserEmailVerify />}
        />
        <Route path="/admin-aprove/:user_id" element={<UserAccountAprove />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
