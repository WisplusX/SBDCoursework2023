import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SideMenu from "./SideMenu";

export default function AppHeader({ userName, role }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          color: "black",
        }}
      >
        <Toolbar>
          {role !== "DRIVER" && <SideMenu role={role} />}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userName ? `Вітаємо, ${userName}` : "Вітаємо"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              mb: 2,
              boxShadow: "none",
              backgroundColor: "#2399EF",
              borderRadius: 1,
              height: "45px",
              "&:hover": {
                backgroundColor: "#1a7bb9",
              },
            }}
            href="/"
            startIcon={<LogoutRoundedIcon />}
          >
            Вийти з профілю
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
