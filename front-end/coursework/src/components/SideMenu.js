import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/MenuRounded";
import PersonIcon from "@mui/icons-material/PersonRounded";
import RouteIcon from "@mui/icons-material/RouteRounded";
import VehicleIcon from "@mui/icons-material/DirectionsBusRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ChangeCircleRoundedIcon from "@mui/icons-material/ChangeCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

import { IconButton, Avatar } from "@mui/material";

export default function SideMenu({ role }) {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ left: open });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      toggleDrawer(false);
    }
  };

  const leaderList = () => (
    <Box
      sx={{ width: 370 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding onClick={() => scrollToSection("drivers")}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar sx={{ mr: 2, bgcolor: "#D7EBFC" }}>
                <PersonIcon sx={{ color: "#2399EF" }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Список водіїв" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => scrollToSection("routes")}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar sx={{ mr: 2, bgcolor: "#D7EBFC" }}>
                <RouteIcon sx={{ color: "#2399EF" }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Список маршрутів" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => scrollToSection("vehicles")}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar sx={{ mr: 2, bgcolor: "#D7EBFC" }}>
                <VehicleIcon sx={{ color: "#2399EF" }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Список транспортних засобів" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem disablePadding onClick={() => scrollToSection("reports")}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar sx={{ mr: 2, bgcolor: "#D7EBFC" }}>
                <DescriptionRoundedIcon sx={{ color: "#2399EF" }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Перегляд звітів" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem disablePadding onClick={() => scrollToSection("adddata")}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar sx={{ mr: 2, bgcolor: "#DBF6E7" }}>
                <AddCircleRoundedIcon sx={{ color: "#0cc977" }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Додати дані" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => scrollToSection("changedata")}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar sx={{ mr: 2, bgcolor: "#FCEEBC" }}>
                <ChangeCircleRoundedIcon sx={{ color: "#F3AC3C" }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Змінити дані" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const adminList = () => (
    <Box
      sx={{ width: 370 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding onClick={() => scrollToSection("drivers")}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar sx={{ mr: 2, bgcolor: "#D7EBFC" }}>
                <PersonIcon sx={{ color: "#2399EF" }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Список водіїв" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => scrollToSection("routes")}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar sx={{ mr: 2, bgcolor: "#D7EBFC" }}>
                <RouteIcon sx={{ color: "#2399EF" }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Список маршрутів" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => scrollToSection("vehicles")}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar sx={{ mr: 2, bgcolor: "#D7EBFC" }}>
                <VehicleIcon sx={{ color: "#2399EF" }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Список транспортних засобів" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem disablePadding onClick={() => scrollToSection("snapshots")}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar sx={{ mr: 2, bgcolor: "#D7EBFC" }}>
                <SaveRoundedIcon sx={{ color: "#2399EF" }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Перегляд снапшотів" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => scrollToSection("authlogs")}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar sx={{ mr: 2, bgcolor: "#D7EBFC" }}>
                <LockOpenRoundedIcon sx={{ color: "#2399EF" }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Перегляд логів авторизації" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem disablePadding onClick={() => scrollToSection("adddata")}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar sx={{ mr: 2, bgcolor: "#DBF6E7" }}>
                <AddCircleRoundedIcon sx={{ color: "#0cc977" }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Додати дані" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => scrollToSection("changedata")}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar sx={{ mr: 2, bgcolor: "#FCEEBC" }}>
                <ChangeCircleRoundedIcon sx={{ color: "#F3AC3C" }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Змінити дані" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => scrollToSection("deletedata")}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar sx={{ mr: 2, bgcolor: "#FFD8E2" }}>
                <RemoveCircleRoundedIcon sx={{ color: "#FF3156" }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Видалити дані" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={state.left} onClose={toggleDrawer(false)}>
        {role === "ADMIN" ? adminList() : leaderList()}
      </Drawer>
    </div>
  );
}
