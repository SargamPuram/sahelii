import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import './App.css'
import Home from "./pages/Home";
import Predict from "./pages/Predict";

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
