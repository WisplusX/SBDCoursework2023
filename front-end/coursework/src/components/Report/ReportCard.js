// ReportCard.js
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  TextField,
} from "@mui/material";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ReportList from "./ReportList";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SortingReports from "./SortingReports";

function ReportCard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sortingField, setSortingField] = useState("createdAt");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSortingChange = (field) => {
    setSortingField(field);
  };

  return (
    <Card
      id="reports"
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
              <DescriptionRoundedIcon sx={{ color: "#2399EF" }} />
            </Avatar>
            <strong>Перегляд звітів</strong>
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(props) => (
                <TextField {...props} variant="standard" />
              )}
            />
          </LocalizationProvider>
          <SortingReports
            sortingField={sortingField}
            onSortingChange={handleSortingChange}
          />
        </Box>
        <ReportList selectedDate={selectedDate} sortingField={sortingField} />
      </CardContent>
    </Card>
  );
}

export default ReportCard;
