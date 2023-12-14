import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
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

function RouteTable({ routes }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID маршруту</TableCell>
            <TableCell>Початкова точка</TableCell>
            <TableCell>Кінцева точка</TableCell>
            <TableCell>Довжина маршруту</TableCell>
            <TableCell>Поточний водій</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {routes.map((route) => (
            <TableRow key={route.id}>
              <TableCell>{route.id}</TableCell>
              <TableCell>{route.routeStart}</TableCell>
              <TableCell>{route.routeEnd}</TableCell>
              <TableCell>{route.routeLength} км</TableCell>
              <TableCell>
                {route.driver
                  ? renderText("ID: " + route.driver.id, true)
                  : renderText("Відсутній", false)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RouteTable;
