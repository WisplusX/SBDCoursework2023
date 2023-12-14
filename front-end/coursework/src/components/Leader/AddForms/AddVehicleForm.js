import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import SuccessNotificationSnackbar from "../../Notifications/SuccessNotificationSnackbar";
import FailNotificationSnackbar from "../../Notifications/FailNotificationSnackbar";

function AddVehicleForm() {
  const [vehicleData, setVehicleData] = useState({
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
      const response = await fetch("http://localhost:8080/transport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleData),
      });

      if (response.ok) {
        console.log("Vehicle added successfully");
        setOpenSuccessSnackbar(true);
      } else {
        console.error("Failed to add vehicle:", response.statusText);
        setOpenFailSnackbar(true);
      }
    } catch (error) {
      console.error("Error during vehicle addition:", error);
      setOpenFailSnackbar(true);
    }

    setVehicleData({
      model: "",
      licensePlate: "",
      consumption: "",
    });
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
          <strong>Додати транспорт</strong>
        </Typography>

        <form onSubmit={handleSubmit}>
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
            Додати
          </Button>
        </form>
      </CardContent>
      <SuccessNotificationSnackbar
        open={openSuccessSnackbar}
        message="Транспорт успішно додано"
        onClose={handleSuccessSnackbarClose}
      />
      <FailNotificationSnackbar
        open={openFailSnackbar}
        message="Помилка. Не вдалося додати транспорт"
        onClose={handleFailSnackbarClose}
      />
    </Card>
  );
}

export default AddVehicleForm;
