import React, { useState } from "react";
import { TextField, Button, Card, Typography } from "@mui/material";
import SuccessNotificationSnackbar from "../../Notifications/SuccessNotificationSnackbar";
import FailNotificationSnackbar from "../../Notifications/FailNotificationSnackbar";

const AssignRoute = () => {
  const [driverId, setDriverId] = useState("");
  const [routeId, setRouteId] = useState("");

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openFailSnackbar, setOpenFailSnackbar] = useState(false);

  const handleDriverIdChange = (event) => {
    setDriverId(event.target.value);
  };

  const handleRouteIdChange = (event) => {
    setRouteId(event.target.value);
  };

  const handleAssignClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/routes/assign/${routeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parseInt(driverId)),
        }
      );

      if (response.ok) {
        console.log("Маршрут успешно назначен");
        setOpenSuccessSnackbar(true);
      } else {
        console.error("Ошибка при назначении маршрута");
        setOpenFailSnackbar(true);
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса", error);
      setOpenFailSnackbar(true);
    }
  };

  const handleSuccessSnackbarClose = () => {
    setOpenSuccessSnackbar(false);
  };

  const handleFailSnackbarClose = () => {
    setOpenFailSnackbar(false);
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
        backgroundColor: "#DBF6E7",
        borderRadius: 3,
        padding: 3,
        margin: "auto",
        marginTop: 2,
        maxWidth: 800,
      }}
    >
      <Typography sx={{ mb: 2 }}>
        <strong>Назначити маршрут водію</strong>
      </Typography>
      <TextField
        label="ID водія"
        variant="outlined"
        value={driverId}
        onChange={handleDriverIdChange}
        color="success"
        sx={{ mr: 2 }}
      />
      <TextField
        label="ID маршруту"
        variant="outlined"
        value={routeId}
        onChange={handleRouteIdChange}
        color="success"
        sx={{ mr: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAssignClick}
        sx={{
          mb: 2,
          boxShadow: "none",
          backgroundColor: "#0cc977",
          borderRadius: 1,
          height: "56px",
          "&:hover": {
            backgroundColor: "#0e995d",
          },
        }}
      >
        Назначити
      </Button>
      <SuccessNotificationSnackbar
        open={openSuccessSnackbar}
        message="Маршрут назначено"
        onClose={handleSuccessSnackbarClose}
      />
      <FailNotificationSnackbar
        open={openFailSnackbar}
        message="Помилка. Не вдалося назначити маршрут"
        onClose={handleFailSnackbarClose}
      />
    </Card>
  );
};

export default AssignRoute;
