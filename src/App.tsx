import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FlightDetailPage from "./pages/FlightDetailPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flight/:id" element={<FlightDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
