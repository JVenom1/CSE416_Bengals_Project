// import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import StateSelection from "./Components/StateSelection.js";
import EnsembleSelection from "./Components/EnsembleSelection.js";
import DistrictAnalysis from "./Components/DistrictAnalysis.js"
import ClusterAnalysis from "./Components/ClusterAnalysis.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<StateSelection />} />
        <Route path="/EnsembleSelection" exact element={<EnsembleSelection />} />
        <Route path="/ClusterAnalysis" exact element={<ClusterAnalysis />} />
        <Route path="/DistrictAnalysis" exact element={<DistrictAnalysis />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
