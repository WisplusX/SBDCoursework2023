import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import SuccessNotificationSnackbar from "../../Notifications/SuccessNotificationSnackbar";
import FailNotificationSnackbar from "../../Notifications/FailNotificationSnackbar";

function EditVehicleForm({ onEditVehicle }) {
  const [vehicleData, setVehicleData] = useState({
    vehicleId: "",
    model: "",
    licensePlate: "",
    consumption: "",
  });

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openFailSnackbar, setOpenFailSnackbar] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/transport/${vehicleData.vehicleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vehicleData),
        }
      );

      if (response.ok) {
        console.log("Vehicle updated successfully");
        setOpenSuccessSnackbar(true);
      } else {
        console.error("Failed to update vehicle:", response.statusText);
        setOpenFailSnackbar(true);
      }
    } catch (error) {
      console.error("Error during vehicle update:", error);
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
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        backgroundColor: "white",
        borderRadius: 3,
        padding: 2,
        margin: "auto",
        marginTop: 2,
        marginBottom: 2,
        maxWidth: 800,
      }}
    >
      <CardContent>
        <Typography variant="h6">
          <strong>Змінити дані транспорту</strong>
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="ID транспорту для зміни"
            name="vehicleId"
            value={vehicleData.vehicleId}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Divider
            variant="middle"
            sx={{ margin: "auto", mt: 2, mb: 1, maxWidth: 800 }}
          />
          <TextField
            label="Модель"
            name="model"
            value={vehicleData.model}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Номерний знак"
            name="licensePlate"
            value={vehicleData.licensePlate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Витрата: л/100 км"
            name="consumption"
            value={vehicleData.consumption}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              boxShadow: "none",
              backgroundColor: "#2399EF",
              borderRadius: 1,
              height: "45px",
              "&:hover": {
                backgroundColor: "#1a7bb9",
              },
            }}
          >
            Змінити
          </Button>
        </form>
      </CardContent>

      <SuccessNotificationSnackbar
        open={openSuccessSnackbar}
        message="Дані транспорту успішно змінено"
        onClose={handleSuccessSnackbarClose}
      />
      <FailNotificationSnackbar
        open={openFailSnackbar}
        message="Помилка. Не вдалося змінити дані транспорту"
        onClose={handleFailSnackbarClose}
      />
    </Card>
  );
}

export default EditVehicleForm;
