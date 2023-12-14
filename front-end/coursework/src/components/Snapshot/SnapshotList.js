import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Pagination,
} from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

const SnapshotList = () => {
  const [snapshots, setSnapshots] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:8080/snapshots?page=${page - 1}&size=5`)
      .then((response) => response.json())
      .then((data) => {
        const formattedSnapshots = data.content.map((snapshot) => ({
          ...snapshot,
          createdAt: formatDate(snapshot.createdAt),
        }));
        setSnapshots(formattedSnapshots);
        setTotalPages(data.totalPages);
      })
      .catch((error) =>
        console.error("Ошибка при получении снапшотов:", error)
      );
  }, [page]);

  const downloadSnapshot = (id) => {
    fetch(`http://localhost:8080/snapshots/${id}/download`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `snapshot_${id}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) =>
        console.error("Ошибка при скачивании снапшота:", error)
      );
  };

  const openSnapshotInNewTab = (id) => {
    fetch(`http://localhost:8080/snapshots/${id}/download`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(
          new Blob([blob], { type: "application/json;charset=utf-8" })
        );
        const newTab = window.open(url, "_blank");
        if (newTab) {
          newTab.focus();
        } else {
          console.error("Невозможно открыть новую вкладку");
        }
      })
      .catch((error) =>
        console.error("Ошибка при открытии снапшота в новой вкладке:", error)
      );
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID снапшоту</TableCell>
            <TableCell>Дата снапшоту</TableCell>
            <TableCell>Дії</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {snapshots.map((snapshot) => (
            <TableRow key={snapshot.id}>
              <TableCell>{snapshot.id}</TableCell>
              <TableCell>{snapshot.createdAt}</TableCell>
              <TableCell>
                <Tooltip title="Завантажити" placement="top" arrow>
                  <IconButton
                    onClick={() => downloadSnapshot(snapshot.id)}
                    sx={{
                      boxShadow: "none",
                      backgroundColor: "#D7EBFC",
                      color: "#2399EF",
                      borderRadius: 1,
                      height: "45px",
                      mr: 2,
                      "&:hover": {
                        backgroundColor: "#2399EF",
                        color: "white",
                        boxShadow: "none",
                      },
                    }}
                  >
                    <DownloadRoundedIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Відкрити у новому вікні" placement="top" arrow>
                  <IconButton
                    onClick={() => openSnapshotInNewTab(snapshot.id)}
                    sx={{
                      boxShadow: "none",
                      backgroundColor: "#D7EBFC",
                      color: "#2399EF",
                      borderRadius: 1,
                      height: "45px",
                      "&:hover": {
                        backgroundColor: "#2399EF",
                        color: "white",
                        boxShadow: "none",
                      },
                    }}
                  >
                    <OpenInNewRoundedIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        size="large"
        sx={{ mt: 2, textAlign: "center" }}
      />
    </TableContainer>
  );
};

export default SnapshotList;
