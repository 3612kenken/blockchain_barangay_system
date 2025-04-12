import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/dashboard";
import Login from "./components/login";
import PhysicalChar from "./components/encoder/physicalChar";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/physical-characteristics" element={<PhysicalChar />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
