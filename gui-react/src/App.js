// import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage.js";
import React from "react";
import StateClicked from "./Components/StateClicked";
import EnsembleList from "./Components/EnsembleList.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/State" exact element={<StateClicked />} />
        <Route path="/EnsembleList" exact element={<EnsembleList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
