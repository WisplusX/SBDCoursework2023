import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Alert, Avatar } from "@mui/material";
import VehicleIcon from "@mui/icons-material/DirectionsBusRounded";

function VehicleInfoCard({ userId }) {
  const [vehicleInfo, setVehicleInfo] = useState(null);

  useEffect(() => {
    const fetchVehicleInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/drivers/${userId}/transport`
        );
        const data = await response.json();

        if (response.ok) {
          setVehicleInfo(data);
        } else if (response.status === 404) {
          // Транспорт не найден
          setVehicleInfo(null);
        } else {
          console.error("Failed to fetch vehicle info:", data.message);
        }
      } catch (error) {
        console.error("Error during vehicle info fetch:", error);
      }
    };

    fetchVehicleInfo();
  }, [userId]);

  return (
    <Card
      sx={{
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        backgroundColor: "white",
        borderRadius: 3,
        padding: 2,
        margin: "auto",
        marginTop: 2,
        maxWidth: 800,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", mb: 2.5 }}
        >
          <Avatar sx={{ mr: 2, bgcolor: "#D7EBFC" }}>
            <VehicleIcon sx={{ color: "#2399EF" }} />
          </Avatar>
          <strong>Інформація про транспорт</strong>
        </Typography>
        {vehicleInfo ? (
          <>
            <Typography variant="body1">
              <strong>Модель:</strong> {vehicleInfo.model}
            </Typography>
            <Typography variant="body1">
              <strong>Номер:</strong> {vehicleInfo.licensePlate}
            </Typography>
            <Typography variant="body1">
              <strong>Витрата:</strong> {vehicleInfo.consumption} л/100 км
            </Typography>
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
            Транспорт не призначено
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default VehicleInfoCard;
