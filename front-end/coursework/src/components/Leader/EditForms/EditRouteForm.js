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

function EditRouteForm() {
  const [routeData, setRouteData] = useState({
    routeId: "",
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
      const response = await fetch(
        `http://localhost:8080/routes/${routeData.routeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(routeData),
        }
      );

      if (response.ok) {
        console.log("Route updated successfully");
        setOpenSuccessSnackbar(true);
      } else {
        console.error("Failed to update route:", response.statusText);
        setOpenFailSnackbar(true);
      }
    } catch (error) {
      console.error("Error during route update:", error);
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
          <strong>Змінити дані маршруту</strong>
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="ID маршруту для зміни"
            name="routeId"
            value={routeData.routeId}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Divider
            variant="middle"
            sx={{ margin: "auto", mt: 2, mb: 1, maxWidth: 800 }}
          />
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
            Змінити
          </Button>
        </form>
      </CardContent>
      <SuccessNotificationSnackbar
        open={openSuccessSnackbar}
        message="Дані маршруту успішно змінено"
        onClose={handleSuccessSnackbarClose}
      />
      <FailNotificationSnackbar
        open={openFailSnackbar}
        message="Помилка. Не вдалося змінити дані маршруту"
        onClose={handleFailSnackbarClose}
      />
    </Card>
  );
}

export default EditRouteForm;
