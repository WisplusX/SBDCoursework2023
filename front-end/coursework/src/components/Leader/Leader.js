import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Tabs, Tab, Divider, Typography } from "@mui/material";
import DriverList from "./DriverList";
import AppHeader from "../AppHeader";
import RoutesBlock from "./RoutesBlock";
import VehicleList from "./VehicleList";
import AddDriverForm from "./AddForms/AddDriverForm";
import AddRouteForm from "./AddForms/AddRouteForm";
import AddVehicleForm from "./AddForms/AddVehicleForm";
import EditDriverForm from "./EditForms/EditDriverForm";
import EditRouteForm from "./EditForms/EditRouteForm";
import EditVheicleForm from "./EditForms/EditVehicleForm";
import ReportCard from "../Report/ReportCard";

function Leader() {
  const location = useLocation();
  const { user } = location.state || {};

  const [tabValueForAdd, setTabValueForAdd] = useState(0);
  const [tabValueForEdit, setTabValueForEdit] = useState(0);

  const handleTabChangeForAdd = (event, newValue) => {
    setTabValueForAdd(newValue);
  };

  const handleTabChangeForEdit = (event, newValue) => {
    setTabValueForEdit(newValue);
  };

  return (
    <>
      <AppHeader userName={user.userInfo.name} role={user.role}></AppHeader>
      <Container>
        <DriverList></DriverList>
        <RoutesBlock></RoutesBlock>
        <VehicleList></VehicleList>
        <ReportCard></ReportCard>

        <Divider
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

        {tabValueForEdit === 2 && <EditDriverForm />}
        {tabValueForEdit === 0 && <EditRouteForm id={3} />}
        {tabValueForEdit === 1 && <EditVheicleForm />}
      </Container>
    </>
  );
}

export default Leader;
