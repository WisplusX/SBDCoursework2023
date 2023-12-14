// ReportCard.js
import React from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import AuthLogList from "./AuthLogsList";

function AuthLogsCard() {
  return (
    <Card
      id="authlogs"
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2.5,
          }}
        >
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Avatar sx={{ mr: 2, bgcolor: "#D7EBFC" }}>
              <LockOpenRoundedIcon sx={{ color: "#2399EF" }} />
            </Avatar>
            <Box>
              <strong>Перегляд логів авторизації</strong>
              <Typography
                variant="body2"
                color="text.secondary"
                fontSize="small"
              >
                Ви бачите останні 10 записів авторизації
              </Typography>
            </Box>
          </Typography>
        </Box>
        <AuthLogList></AuthLogList>
      </CardContent>
    </Card>
  );
}

export default AuthLogsCard;
