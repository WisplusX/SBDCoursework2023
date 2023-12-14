import React from "react";
import { useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import AppHeader from "../AppHeader";
import DriverInfoCard from "./DriverInfoCard";
import "./Driver.css";
import VehicleInfoCard from "./VehicleInfoCard";
import CurrentRouteInfoCard from "./CurrentRouteInfoCard";

function Driver() {
  const location = useLocation();
  const { user } = location.state || {};

  return (
    <>
      <AppHeader userName={user.userInfo.name} role={user.role}></AppHeader>
      <Container>
        <DriverInfoCard user={user}></DriverInfoCard>
        <VehicleInfoCard userId={user.id}></VehicleInfoCard>
        <CurrentRouteInfoCard userId={user.id}></CurrentRouteInfoCard>
      </Container>
    </>
  );
}

export default Driver;
