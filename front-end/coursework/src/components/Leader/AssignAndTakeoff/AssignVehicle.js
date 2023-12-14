import React, { useState } from "react";
import { TextField, Button, Typography, Card } from "@mui/material";
import SuccessNotificationSnackbar from "../../Notifications/SuccessNotificationSnackbar";
import FailNotificationSnackbar from "../../Notifications/FailNotificationSnackbar";

const AssignVehicle = () => {
  const [driverId, setDriverId] = useState("");
  const [vehicleId, setvehicleId] = useState("");

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openFailSnackbar, setOpenFailSnackbar] = useState(false);

  const handleDriverIdChange = (event) => {
    setDriverId(event.target.value);
  };

  const handlevehicleIdChange = (event) => {
    setvehicleId(event.target.value);
  };

  const handleAssignClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/transport/assign/${vehicleId}`,
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
        <strong>Назначити транспорт водію</strong>
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
        label="ID транспорту"
        variant="outlined"
        value={vehicleId}
        onChange={handlevehicleIdChange}
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
        message="Транспорт назначено"
        onClose={handleSuccessSnackbarClose}
      />
      <FailNotificationSnackbar
        open={openFailSnackbar}
        message="Помилка. Не вдалося назначити транспорт"
        onClose={handleFailSnackbarClose}
      />
    </Card>
  );
};

export default AssignVehicle;
