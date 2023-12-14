import React, { useEffect, useState } from "react";
import VehicleIcon from "@mui/icons-material/DirectionsBusRounded";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";
import AssignVehicle from "./AssignAndTakeoff/AssignVehicle";
import TakeoffVehicle from "./AssignAndTakeoff/TakeoffVehicle";

const renderText = (text, present) => {
  let textColor = "";
  let backgroundColor = "";

  if (present) {
    // green
    textColor = "#0cc977";
    backgroundColor = "#DBF6E7";
  } else {
    // red
    textColor = "#FF3156";
    backgroundColor = "#FFD8E2";
  }

  return (
    <Typography
      variant="body1"
      sx={{
        color: textColor,
        backgroundColor: backgroundColor,
        padding: "4px 8px",
        borderRadius: "4px",
        display: "inline-block",
        fontSize: "1em",
      }}
    >
      {text}
    </Typography>
  );
};

function VehicleList() {
  const [vehiclesData, setVehiclesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortingValue, setSortingValue] = useState(10);

  useEffect(() => {
    const fetchVehiclesData = async () => {
      try {
        let endpoint = `http://localhost:8080/transport?page=${
          currentPage - 1
        }`;

        switch (sortingValue) {
          case 20:
            endpoint += "&sortBy=model";
            break;
          case 30:
            endpoint += "&sortBy=licensePlate";
            break;
          case 40:
            endpoint += "&sortBy=consumption";
            break;
          case 50:
            endpoint = `http://localhost:8080/transport/driverPresence?page=${
              currentPage - 1
            }&isPresent=present`;
            break;
          case 60:
            endpoint = `http://localhost:8080/transport/driverPresence?page=${
              currentPage - 1
            }&isPresent=absent`;
            break;
          default:
            break;
        }

        const response = await fetch(endpoint);
        const { content, totalPages } = await response.json();

        setVehiclesData(content);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchVehiclesData();
  }, [currentPage, sortingValue]);

  const handleSortingChange = (event) => {
    setSortingValue(event.target.value);
    setCurrentPage(1); // Reset to the first page when sorting changes
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Card
      id="vehicles"
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Avatar sx={{ mr: 2, bgcolor: "#D7EBFC" }}>
                <VehicleIcon sx={{ color: "#2399EF" }} />
              </Avatar>
              <strong>Список транспортних засобів</strong>
            </Typography>
          </div>
          <FormControl variant="standard" sx={{ mb: 1, minWidth: 120 }}>
            <InputLabel>Сортування за:</InputLabel>
            <Select
              label="sorting"
              defaultValue={sortingValue}
              onChange={handleSortingChange}
            >
              <MenuItem value={10}>ID</MenuItem>
              <MenuItem value={20}>Моделлю</MenuItem>
              <MenuItem value={30}>Номерним знаком</MenuItem>
              <MenuItem value={40}>Витратою</MenuItem>
              <MenuItem value={50}>Є водій</MenuItem>
              <MenuItem value={60}>Немає водія</MenuItem>
            </Select>
          </FormControl>
        </div>

        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID авто</TableCell>
                <TableCell>Модель</TableCell>
                <TableCell>Номерний знак</TableCell>
                <TableCell>Витрата</TableCell>
                <TableCell>Поточний водій</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehiclesData.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.id}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.licensePlate}</TableCell>
                  <TableCell>{vehicle.consumption} л/100 км</TableCell>
                  <TableCell>
                    {vehicle.driver
                      ? renderText("ID: " + vehicle.driver.id, true)
                      : renderText("Відсутній", false)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          sx={{ mt: 2, mb: 4, textAlign: "center" }}
        />

        <AssignVehicle></AssignVehicle>
        <TakeoffVehicle></TakeoffVehicle>
      </CardContent>
    </Card>
  );
}

export default VehicleList;
