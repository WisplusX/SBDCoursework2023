import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const AuthLogList = () => {
  const [authLogs, setAuthLogs] = useState([]);

  useEffect(() => {
    const fetchAuthLogs = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/logs");
        if (response.ok) {
          const data = await response.json();
          setAuthLogs(data);
        } else {
          console.error("Failed to fetch auth logs:", response.statusText);
        }
      } catch (error) {
        console.error("Error during auth logs fetch:", error);
      }
    };

    fetchAuthLogs();
  }, []);

  const formatTimestamp = (timestamp) => {
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
      new Date(timestamp)
    );
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>User ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authLogs.map((log) => (
              <TableRow key={log.userId}>
                <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
                <TableCell>{log.userId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AuthLogList;
