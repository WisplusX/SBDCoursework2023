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

function DeleteRouteForm() {
  const [routeId, setRouteId] = useState("");

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openFailSnackbar, setOpenFailSnackbar] = useState(false);

  const handleInputChange = (e) => {
    setRouteId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/routes/${routeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setOpenSuccessSnackbar(true);
      } else {
        setOpenFailSnackbar(true);
      }
    } catch (error) {
      console.error("An error occurred while sending the request", error);
      setOpenFailSnackbar(true);
    }
  };

  const handleCloseSuccessSnackbar = () => {
    setOpenSuccessSnackbar(false);
  };

  const handleCloseFailSnackbar = () => {
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
          <strong>Видалити маршрут</strong>
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="ID маршруту для видалення"
            name="routeId"
            value={routeId}
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
                backgroundColor: "#1a7bb9", // Новый цвет при наведении
              },
            }}
          >
            Видалити
          </Button>
        </form>
      </CardContent>
      <SuccessNotificationSnackbar
        open={openSuccessSnackbar}
        message="Маршрут успішно видалено"
        onClose={handleCloseSuccessSnackbar}
      />

      <FailNotificationSnackbar
        open={openFailSnackbar}
        message="Помилка. Не вдалось видалити маршрут"
        onClose={handleCloseFailSnackbar}
      />
    </Card>
  );
}

export default DeleteRouteForm;
