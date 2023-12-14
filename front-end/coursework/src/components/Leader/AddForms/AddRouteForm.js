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

function AddRouteForm() {
  const [routeData, setRouteData] = useState({
    routeStart: "",
    routeEnd: "",
    routeLength: "",
  });

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openFailSnackbar, setOpenFailSnackbar] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRouteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/routes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(routeData),
      });

      if (response.ok) {
        console.log("Route added successfully");
        setOpenSuccessSnackbar(true);
      } else {
        console.error("Failed to add route:", response.statusText);
        setOpenFailSnackbar(true);
      }
    } catch (error) {
      console.error("Error during route addition:", error);
      setOpenFailSnackbar(true);
    }

    setRouteData({
      routeStart: "",
      routeEnd: "",
      routeLength: "",
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
          <strong>Додати маршрут</strong>
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Початкова точка"
            name="routeStart"
            value={routeData.routeStart}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Кінцева точка"
            name="routeEnd"
            value={routeData.routeEnd}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Довжина маршрута (км)"
            name="routeLength"
            value={routeData.routeLength}
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
        message="Маршрут успішно додано"
        onClose={handleSuccessSnackbarClose}
      />
      <FailNotificationSnackbar
        open={openFailSnackbar}
        message="Помилка. Не вдалося додати маршрут"
        onClose={handleFailSnackbarClose}
      />
    </Card>
  );
}

export default AddRouteForm;
