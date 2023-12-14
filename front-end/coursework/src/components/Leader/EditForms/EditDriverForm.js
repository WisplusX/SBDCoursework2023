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

function EditDriverForm() {
  const [driverData, setDriverData] = useState({
    email: "",
    password: "",
    role: "DRIVER",
    name: "",
    number: "",
    address: "",
    salary: "",
  });

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openFailSnackbar, setOpenFailSnackbar] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriverData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/drivers/${driverData.driverId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(driverData),
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
          <strong>Змінити дані водія</strong>
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="ID водія для зміни"
            name="driverId"
            value={driverData.driverId}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Divider
            variant="middle"
            sx={{ margin: "auto", mt: 2, mb: 1, maxWidth: 800 }}
          />
          <TextField
            label="Email"
            name="email"
            value={driverData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Пароль"
            name="password"
            type="password"
            value={driverData.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ім'я"
            name="name"
            value={driverData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Номер телефону"
            name="number"
            value={driverData.number}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Адреса"
            name="address"
            value={driverData.address}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Зарплата"
            name="salary"
            value={driverData.salary}
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
        message="Дані водія успішно змінено"
        onClose={handleSuccessSnackbarClose}
      />
      <FailNotificationSnackbar
        open={openFailSnackbar}
        message="Помилка. Не вдалося змінити дані водія"
        onClose={handleFailSnackbarClose}
      />
    </Card>
  );
}

export default EditDriverForm;
