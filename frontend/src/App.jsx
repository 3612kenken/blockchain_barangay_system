import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/dashboard";
import Login from "./components/login";
import PhysicalInfo from "./components/encoder/physicalInfo";
import ManageUsers from "./components/admin/manageUsers";
import ManageOfficials from "./components/secretary/manageOfficials";
// Import all encoder components
import PoliticalInfo from "./components/encoder/politicalInfo";
import FiscalInfo from "./components/encoder/fiscalInfo";
import DemographicInfo from "./components/encoder/demographicInfo";
import SocioEconomicInfo from "./components/encoder/socioEconomicInfo";
import RecognitionInfo from "./components/encoder/recognitionInfo";
import AwardsAndRecognition from "./components/encoder/awardsAndRecognition";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Encoder routes */}
          <Route path="/physical-information" element={<PhysicalInfo />} />
          <Route path="/political-information" element={<PoliticalInfo />} />
          <Route path="/fiscal-information" element={<FiscalInfo />} />
          <Route
            path="/demographic-information"
            element={<DemographicInfo />}
          />
          <Route
            path="/socioeconomic-information"
            element={<SocioEconomicInfo />}
          />
          <Route path="/recognition" element={<AwardsAndRecognition />} />
          {/* Admin and Secretary routes */}
          <Route path="/manage-officials" element={<ManageOfficials />} />
          <Route path="/manage-users" element={<ManageUsers />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
