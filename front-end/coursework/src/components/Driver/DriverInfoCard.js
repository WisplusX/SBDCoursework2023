import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/PersonRounded";

function DriverInfoCard({ user }) {
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
            <PersonIcon sx={{ color: "#2399EF" }} />
          </Avatar>
          <strong>Інформація про водія</strong>
        </Typography>
        <Typography variant="body1">
          <strong>Імʼя:</strong> {user.userInfo.name}
        </Typography>
        <Typography variant="body1">
          <strong>Номер:</strong> {user.userInfo.number}
        </Typography>
        <Typography variant="body1">
          <strong>Адреса:</strong> {user.userInfo.address}
        </Typography>
        <Typography variant="body1">
          <strong>Зарплата:</strong> ${user.userInfo.salary}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DriverInfoCard;
