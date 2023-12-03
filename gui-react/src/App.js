// import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./Components/HomePage.js";
import EnsembleList from "./Components/EnsembleList.js";
import DistMeasPage from "./Components/DistMeasSelected.js";
import StateOverview from "./Components/StateOverview.js";
import ClusterAnalysis from "./Components/ClusterAnalysis.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/EnsembleList" exact element={<EnsembleList />} />
        <Route path="/Distances" exact element={<DistMeasPage />} />
        <Route path="/StateOverview" exact element={<StateOverview />} />
        <Route path="/ClusterAnalysis" exact element={<ClusterAnalysis />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
