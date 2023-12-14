import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Driver from "./components/Driver/Driver";
import Leader from "./components/Leader/Leader";
import Admin from "./components/Admin/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/leader" element={<Leader />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
