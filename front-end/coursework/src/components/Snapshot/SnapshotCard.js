import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import SnapshotList from "./SnapshotList";

function SnapshotCard() {
  const handleCreateReport = async () => {
    try {
      const response = await fetch("http://localhost:8080/snapshots/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Скриншот базы данных создан успешно!");
        window.location.reload();
      } else {
        console.error("Ошибка при создании скриншота базы данных");
      }
    } catch (error) {
      console.error("Произошла ошибка", error);
    }
  };

  return (
    <Card
      id="snapshots"
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
              <SaveRoundedIcon sx={{ color: "#2399EF" }} />
            </Avatar>

            <Tooltip
              title="Снапшот - знімок файлової системи, призначений для збереження її копії."
              placement="top"
              arrow
            >
              <strong>Перегляд снапшотів</strong>
            </Tooltip>
          </Typography>
          <Button
            variant="contained"
            sx={{
              boxShadow: "none",
              backgroundColor: "#2399EF",
              borderRadius: 1,
              height: "45px",
              "&:hover": {
                backgroundColor: "#1a7bb9",
              },
            }}
            onClick={handleCreateReport}
          >
            Створити снапшот
          </Button>
        </Box>
        <SnapshotList></SnapshotList>
      </CardContent>
    </Card>
  );
}

export default SnapshotCard;
