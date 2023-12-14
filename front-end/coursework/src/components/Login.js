import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NotificationSnackbar from "./Notifications/FailNotificationSnackbar";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Moriev, Poloziuk, Verkhola team. {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SignIn = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const user = result.user;
        navigate(`/${user.role.toLowerCase()}`, { state: { user } });
      } else {
        console.error("Authentication failed:", result.message);
        setErrorMessage("Помилка. Неправильні дані для входу.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#D7EBFC" }}>
          <LockOutlinedIcon sx={{ color: "#2399EF" }} />
        </Avatar>
        <Typography component="h1" variant="h4">
          <strong>Вітаємо.</strong>
        </Typography>
        <Typography component="h1" variant="h6">
          Будь ласка, авторизуйтесь.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <NotificationSnackbar
            open={openSnackbar}
            message={errorMessage}
            onClose={handleSnackbarClose}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Адреса ел. пошти"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              boxShadow: "none",
              backgroundColor: "#2399EF",
              borderRadius: 1,
              height: "45px",
              "&:hover": {
                backgroundColor: "#1a7bb9",
              },
            }}
          >
            УВІЙТИ
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 4, mb: 4 }} />
    </Container>
  );
};

export default SignIn;
