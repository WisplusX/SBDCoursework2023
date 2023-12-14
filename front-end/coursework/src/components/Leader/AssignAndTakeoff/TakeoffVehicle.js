import React, { useState } from "react";
import { TextField, Button, Card, Typography } from "@mui/material";
import SuccessNotificationSnackbar from "../../Notifications/SuccessNotificationSnackbar";
import FailNotificationSnackbar from "../../Notifications/FailNotificationSnackbar";

const TakeoffVehicle = () => {
  const [vehicleId, setRouteId] = useState("");

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openFailSnackbar, setOpenFailSnackbar] = useState(false);

  const handleRouteIdChange = (event) => {
    setRouteId(event.target.value);
  };

  const handleAssignClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/transport/takeoff/${vehicleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Водитель успешно снят с транспорта");
        setOpenSuccessSnackbar(true);
      } else {
        console.error("Ошибка при снятии с транспорта");
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
        backgroundColor: "#FFD8E2",
        borderRadius: 3,
        padding: 3,
        margin: "auto",
        marginTop: 2,
        maxWidth: 800,
      }}
    >
      <Typography sx={{ mb: 2 }}>
        <strong>Зняти водія з транспорту</strong>
      </Typography>
      <TextField
        label="ID транспорту"
        variant="outlined"
        value={vehicleId}
        onChange={handleRouteIdChange}
        color="error"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAssignClick}
        sx={{
          mb: 2,
          ml: 2,
          boxShadow: "none",
          backgroundColor: "#FF3156",
          borderRadius: 1,
          height: "56px",
          "&:hover": {
            backgroundColor: "#bf1937",
          },
        }}
      >
        Зняти
      </Button>
      <SuccessNotificationSnackbar
        open={openSuccessSnackbar}
        message="Водія знято з транспорту"
        onClose={handleSuccessSnackbarClose}
      />
      <FailNotificationSnackbar
        open={openFailSnackbar}
        message="Помилка. Не вдалося зняти водія з транспорту"
        onClose={handleFailSnackbarClose}
      />
    </Card>
  );
};

export default TakeoffVehicle;
