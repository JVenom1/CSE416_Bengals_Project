// import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage.js";
import React from "react";
import StateClicked from "./Components/StateSelected";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/state" exact element={<StateClicked />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
