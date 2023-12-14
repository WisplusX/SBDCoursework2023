import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Avatar,
} from "@mui/material";
import RouteIcon from "@mui/icons-material/RouteRounded";

import SuccessNotificationSnackbar from "../Notifications/SuccessNotificationSnackbar";
import FailNotificationSnackbar from "../Notifications/FailNotificationSnackbar";

function CurrentRouteInfoCard({ userId }) {
  const [routeInfo, setRouteInfo] = useState(null);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openFailSnackbar, setOpenFailSnackbar] = useState(false);

  useEffect(() => {
    const fetchRouteInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/drivers/${userId}/route`
        );
        const data = await response.json();

        if (response.ok) {
          setRouteInfo(data);
        } else if (response.status === 404) {
          setRouteInfo(null);
        } else {
          console.error("Failed to fetch route info:", data.message);
        }
      } catch (error) {
        console.error("Error during route info fetch:", error);
      }
    };

    fetchRouteInfo();
  }, [userId]);

  const handleFinishRoute = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/routes/finish/${routeInfo.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      );

      if (response.ok) {
        setOpenSuccessSnackbar(true);
      } else {
        setOpenFailSnackbar(true);
      }
    } catch (error) {
      console.error("Error during route finish:", error);
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
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", mb: 2.5 }}
        >
          <Avatar sx={{ mr: 2, bgcolor: "#D7EBFC" }}>
            <RouteIcon sx={{ color: "#2399EF" }} />
          </Avatar>
          <strong>Поточний маршрут</strong>
        </Typography>
        {routeInfo ? (
          <>
            <Typography variant="body1">
              <strong>ID маршруту:</strong> {routeInfo.id}
            </Typography>
            <Typography variant="body1">
              <strong>Початкова точка:</strong> {routeInfo.routeStart}
            </Typography>
            <Typography variant="body1">
              <strong>Кінцева точка:</strong> {routeInfo.routeEnd}
            </Typography>
            <Typography variant="body1">
              <strong>Довжина маршрута:</strong> {routeInfo.routeLength} км
            </Typography>
            <Button
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
              onClick={handleFinishRoute}
            >
              Завершити маршрут
            </Button>
          </>
        ) : (
          <Alert
            severity="error"
            sx={{
              mt: 2,
              color: "#FF3156",
              backgroundColor: "#FFD8E2",
              boxShadow: "none",
            }}
          >
            Маршрут не призначено
          </Alert>
        )}

        <SuccessNotificationSnackbar
          open={openSuccessSnackbar}
          message="Маршрут успішно завершено"
          onClose={handleCloseSuccessSnackbar}
        />

        <FailNotificationSnackbar
          open={openFailSnackbar}
          message="Помилка. Не вдалось завершити маршрут"
          onClose={handleCloseFailSnackbar}
        />
      </CardContent>
    </Card>
  );
}

export default CurrentRouteInfoCard;
