import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/PersonRounded";
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
  Pagination,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

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

function DriverList() {
  const [drivers, setDrivers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortingField] = useState("id");

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchDriversData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/users?page=${
            currentPage - 1
          }&size=10&sortField=${sortField}&sortDirection=ASC`
        );
        const data = await response.json();

        const driversWithDetails = await Promise.all(
          data.content
            .filter((driver) => driver.role === "DRIVER")
            .map(async (driver) => {
              const routeResponse = await fetch(
                `http://localhost:8080/drivers/${driver.id}/route`
              );

              let routeData;
              if (routeResponse.status === 404) {
                routeData = null;
              } else {
                routeData = await routeResponse.json();
              }

              const transportResponse = await fetch(
                `http://localhost:8080/drivers/${driver.id}/transport`
              );

              let transportData;
              if (transportResponse.status === 404) {
                transportData = null;
              } else {
                transportData = await transportResponse.json();
              }

              return {
                ...driver,
                route: routeData,
                transport: transportData,
              };
            })
        );

        setDrivers(driversWithDetails);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };

    fetchDriversData();
  }, [currentPage, sortField]);

  const handleSortingChange = (event) => {
    setSortingField(event.target.value);
  };

  return (
    <Card
      id="drivers"
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
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Avatar sx={{ mr: 2, bgcolor: "#D7EBFC" }}>
              <PersonIcon sx={{ color: "#2399EF" }} />
            </Avatar>
            <strong>Список водіїв</strong>
          </Typography>
          <FormControl variant="standard" sx={{ mb: 1, minWidth: 120 }}>
            <InputLabel>Сортування за:</InputLabel>
            <Select
              label="sorting"
              value={sortField}
              onChange={handleSortingChange}
            >
              <MenuItem value="id">ID</MenuItem>
              <MenuItem value="userInfo.name">Імʼя</MenuItem>
            </Select>
          </FormControl>
        </div>

        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID водія</TableCell>
                <TableCell>Імʼя</TableCell>
                <TableCell>ID маршрута</TableCell>
                <TableCell>ID транспорта</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>{driver.id}</TableCell>
                  <TableCell>{driver.userInfo.name}</TableCell>
                  <TableCell>
                    {driver.route
                      ? renderText(driver.route.id, true)
                      : renderText("Відсутній", false)}
                  </TableCell>
                  <TableCell>
                    {driver.transport
                      ? renderText(driver.transport.id, true)
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
          sx={{
            mt: 2,
            mb: 4,
            textAlign: "center",
            "& .Mui-selected": {
              backgroundColor: "#2399EF",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

export default DriverList;
