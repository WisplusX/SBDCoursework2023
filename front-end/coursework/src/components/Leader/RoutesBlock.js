import {
  Card,
  CardContent,
  Typography,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import RouteTable from "./RouteTable";
import React, { useEffect, useState } from "react";
import RouteIcon from "@mui/icons-material/RouteRounded";
import AssignRoute from "./AssignAndTakeoff/AssignRoute";
import TakeoffRoute from "./AssignAndTakeoff/TakeoffRoute";

function RoutesBlock() {
  const [routes, setRoutes] = useState([]);
  const [sortingValue, setSortingValue] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        let endpoint = `http://localhost:8080/routes?page=${currentPage - 1}`;

        switch (sortingValue) {
          case 10:
            break;
          case 20:
            endpoint += "&sortBy=routeStart";
            break;
          case 30:
            endpoint += "&sortBy=routeEnd";
            break;
          case 40:
            endpoint += "&sortBy=routeLength";
            break;
          case 50:
            endpoint = `http://localhost:8080/routes/driverPresence?page=${
              currentPage - 1
            }&isPresent=present`;
            break;
          case 60:
            endpoint = `http://localhost:8080/routes/driverPresence?page=${
              currentPage - 1
            }&isPresent=absent`;
            break;
          default:
            break;
        }

        const response = await fetch(endpoint);
        const data = await response.json();

        // Обновите общее количество страниц
        setTotalPages(data.totalPages);

        setRoutes(data.content);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchRoutes();
  }, [sortingValue, currentPage]);

  const handleSortingChange = (event) => {
    setSortingValue(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Card
      id="routes"
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
                <RouteIcon sx={{ color: "#2399EF" }} />
              </Avatar>
              <strong>Список маршрутів</strong>
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
              <MenuItem value={20}>Початковою точкою</MenuItem>
              <MenuItem value={30}>Кінцевою точкою</MenuItem>
              <MenuItem value={40}>Довжиною</MenuItem>
              <MenuItem value={50}>Є водій</MenuItem>
              <MenuItem value={60}>Немає водія</MenuItem>
            </Select>
          </FormControl>
        </div>

        <RouteTable routes={routes} />
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          sx={{
            mt: 2,
            mb: 5,
            textAlign: "center",
            "& .Mui-selected": {
              backgroundColor: "#2399EF",
            },
          }}
        />

        <AssignRoute></AssignRoute>
        <TakeoffRoute></TakeoffRoute>
      </CardContent>
    </Card>
  );
}

export default RoutesBlock;
