import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SortingReports = ({ sortingField, onSortingChange }) => {
  const handleSortingChange = (event) => {
    onSortingChange(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ mb: 1, minWidth: 120 }}>
      <InputLabel>Сортування за:</InputLabel>
      <Select
        label="sorting"
        value={sortingField}
        onChange={handleSortingChange}
      >
        <MenuItem value="createdAt">Дата</MenuItem>
        <MenuItem value="driverId">ID водія</MenuItem>
        <MenuItem value="driverName">Імʼя водія</MenuItem>
        <MenuItem value="routeId">ID маршруту</MenuItem>
        <MenuItem value="routeStart">Початкова точка</MenuItem>
        <MenuItem value="routeEnd">Кінцева точка</MenuItem>
        <MenuItem value="routeLength">Довжина</MenuItem>
        <MenuItem value="usedFuel">Витрачене пальне</MenuItem>
        <MenuItem value="transportId">ID транспорту</MenuItem>
        <MenuItem value="licensePlate">Номер транспорту</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortingReports;
