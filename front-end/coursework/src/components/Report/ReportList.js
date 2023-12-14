import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";

const ReportList = ({ selectedDate, sortingField }) => {
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    fetch(
      `http://localhost:8080/reports?date=${formattedDate}&page=${
        page - 1
      }&size=10&sortField=${sortingField}&sortDirection=DESC`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.content && data.content.length > 0) {
          const formattedReports = data.content.map((report) => ({
            ...report,
            createdAt: new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: false,
            }).format(new Date(report.createdAt)),
          }));
          setReports(formattedReports);
          setTotalPages(data.totalPages);
        } else {
          console.error(
            "Ошибка при получении отчетов: Некорректный формат данных или отчетов нет"
          );
          setReports([]);
        }
      })
      .catch((error) => {
        console.error("Ошибка при получении отчетов:", error);
        setReports([]);
      });
  }, [page, selectedDate, sortingField]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };

    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell>ID водія</TableCell>
              <TableCell>Імʼя водія</TableCell>
              <TableCell>ID маршруту</TableCell>
              <TableCell>Початкова точка</TableCell>
              <TableCell>Кінцева точка</TableCell>
              <TableCell>Довжина</TableCell>
              <TableCell>Витрачене пальне</TableCell>
              <TableCell>ID транспорту</TableCell>
              <TableCell>Номер транспорту</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{formatDate(report.createdAt)}</TableCell>
                <TableCell>{report.driverId}</TableCell>
                <TableCell>{report.driverName}</TableCell>
                <TableCell>{report.routeId}</TableCell>
                <TableCell>{report.routeStart}</TableCell>
                <TableCell>{report.routeEnd}</TableCell>
                <TableCell>{report.routeLength} км</TableCell>
                <TableCell>{report.usedFuel.toFixed(1)} л</TableCell>
                <TableCell>{report.transportId}</TableCell>
                <TableCell>{report.licensePlate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        color="primary"
        size="large"
        sx={{ mt: 2, textAlign: "center" }}
      />
    </div>
  );
};

export default ReportList;
