// import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import StateSelection from "./Components/StateSelection.js";
import EnsembleSelection from "./Components/EnsembleSelection.js";
import DistMeasPage from "./Components/DistMeasSelected.js";
import ClusterScatter from "./Components/ClusterScatter.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<StateSelection />} />
        <Route path="/EnsembleSelection" exact element={<EnsembleSelection />} />
        <Route path="/ClusterScatter" exact element={<ClusterScatter />} />
        <Route path="/Distances" exact element={<DistMeasPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
