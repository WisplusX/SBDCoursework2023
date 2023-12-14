import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Tabs, Tab, Divider, Typography } from "@mui/material";
import DriverList from "../Leader/DriverList";
import AppHeader from "../AppHeader";
import RoutesBlock from "../Leader/RoutesBlock";
import VehicleList from "../Leader/VehicleList";
import AddDriverForm from "../Leader/AddForms/AddDriverForm";
import AddRouteForm from "../Leader/AddForms/AddRouteForm";
import AddVehicleForm from "../Leader/AddForms/AddVehicleForm";
import EditDriverForm from "../Leader/EditForms/EditDriverForm";
import EditRouteForm from "../Leader/EditForms/EditRouteForm";
import EditVehicleForm from "../Leader/EditForms/EditVehicleForm";
import DeleteDriverForm from "./DeleteForms/DeleteDriverForm";
import DeleteRouteForm from "./DeleteForms/DeleteRouteForm";
import DeleteVehicleForm from "./DeleteForms/DeleteVehicleForm";
import AuthLogsCard from "../AuthLogs/AuthLogsCard";
import SnapshotCard from "../Snapshot/SnapshotCard";

function Admin() {
  const location = useLocation();
  const { user } = location.state || {};

  const [tabValueForAdd, setTabValueForAdd] = useState(0);
  const [tabValueForEdit, setTabValueForEdit] = useState(0);
  const [tabValueForDelete, setTabValueForDelete] = useState(0);

  const handleTabChangeForDelete = (event, newValue) => {
    setTabValueForDelete(newValue);
  };

  const handleTabChangeForAdd = (event, newValue) => {
    setTabValueForAdd(newValue);
  };

  const handleTabChangeForEdit = (event, newValue) => {
    setTabValueForEdit(newValue);
  };

  const handleDeleteDriver = (driverId) => {
    console.log(`Удаляем водителя с ID: ${driverId}`);
  };

  const handleDeleteRoute = (routeId) => {
    console.log(`Удаляем маршрут с ID: ${routeId}`);
  };

  const handleDeleteVehicle = (vehicleId) => {
    console.log(`Удаляем транспорт с ID: ${vehicleId}`);
  };

  return (
    <>
      <AppHeader userName={user.userInfo.name} role={user.role}></AppHeader>
      <Container>
        <DriverList />
        <RoutesBlock />
        <VehicleList />
        <SnapshotCard />
        <AuthLogsCard />

        <Divider
          id="adddata"
          variant="middle"
          sx={{ margin: "auto", mt: 5, maxWidth: 800 }}
        />

        <Typography variant="h4" align="center" sx={{ mt: 7 }}>
          Додати дані
        </Typography>

        <Tabs
          value={tabValueForAdd}
          onChange={handleTabChangeForAdd}
          centered
          sx={{ mt: 2 }}
        >
          <Tab label="Додати маршрут" />
          <Tab label="Додати транспорт" />
          <Tab label="Додати водія" />
        </Tabs>

        {tabValueForAdd === 2 && <AddDriverForm />}
        {tabValueForAdd === 0 && <AddRouteForm />}
        {tabValueForAdd === 1 && <AddVehicleForm />}

        <Divider
          id="changedata"
          variant="middle"
          sx={{ margin: "auto", mt: 5, maxWidth: 800 }}
        />

        <Typography variant="h4" align="center" sx={{ mt: 7 }}>
          Змінити інформацію
        </Typography>

        <Tabs
          value={tabValueForEdit}
          onChange={handleTabChangeForEdit}
          centered
          sx={{ mt: 2 }}
        >
          <Tab label="Змінити дані маршруту" />
          <Tab label="Змінити дані транспорту" />
          <Tab label="Змінити дані водія" />
        </Tabs>

        {tabValueForEdit === 0 && <EditRouteForm />}
        {tabValueForEdit === 1 && <EditVehicleForm />}
        {tabValueForEdit === 2 && <EditDriverForm />}

        <Divider
          id="deletedata"
          variant="middle"
          sx={{ margin: "auto", mt: 5, maxWidth: 800 }}
        />

        <Typography variant="h4" align="center" sx={{ mt: 7 }}>
          Видалити дані
        </Typography>

        <Tabs
          value={tabValueForDelete}
          onChange={handleTabChangeForDelete}
          centered
          sx={{ mt: 2 }}
        >
          <Tab label="Видалити маршрут" />
          <Tab label="Видалити транспорт" />
          <Tab label="Видалити водія" />
        </Tabs>

        {tabValueForDelete === 0 && (
          <DeleteRouteForm onDeleteRoute={handleDeleteRoute} />
        )}
        {tabValueForDelete === 1 && (
          <DeleteVehicleForm onDeleteVehicle={handleDeleteVehicle} />
        )}
        {tabValueForDelete === 2 && (
          <DeleteDriverForm onDeleteDriver={handleDeleteDriver} />
        )}
      </Container>
    </>
  );
}

export default Admin;
