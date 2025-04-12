import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/dashboard";
import Login from "./components/login";
import PhysicalChar from "./components/encoder/physicalChar";
import ManageUsers from "./components/admin/manageUsers";
import ManageOfficials from "./components/secretary/manageOfficials";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/physical-information" element={<PhysicalChar />} />
          <Route path="/political-information" element={<PhysicalChar />} />
          <Route path="/fiscal-information" element={<PhysicalChar />} />
          <Route path="/demographic-information" element={<PhysicalChar />} />
          <Route path="/socioeconomic-information" element={<PhysicalChar />} />
          <Route path="/recognition" element={<PhysicalChar />} />
          <Route path="/manage-officials" element={<ManageOfficials />} />
          <Route path="/manage-users" element={<ManageUsers />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
