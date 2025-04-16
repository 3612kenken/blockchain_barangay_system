import React, { useState } from "react";
import "../style.css";
import Header from "../header";
import Navs from "../nav";
import Footer from "../footer";
import axios from "axios";

export default function SocioEconomicInfo() {
  const [formData, setFormData] = useState({
    barangayCode: "",
    largestPowerSupplyDistributor: "",
    majorWaterSupplyLevel: "",
    existingMeansOfTransportation: "",
    existingMeansOfCommunication: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/socio-economic-info/add",
        formData
      );
      alert("Socio-Economic Info added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding socio-economic info:", error);
      alert("Failed to add socio-economic info.");
    }
  };

  return (
    <>
      <div className="ts-main-content">
        <Header />
        <Navs />
        <div className="content-wrapper">
          <div className="container-fluid">
            <header>
              <h1 className="h3 display">Socio-Economic Information</h1>
            </header>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="form-group">
                      <label>Barangay Code</label>
                      <input
                        type="text"
                        name="barangayCode"
                        value={formData.barangayCode}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Largest Power Supply Distributor</label>
                      <input
                        type="text"
                        name="largestPowerSupplyDistributor"
                        value={formData.largestPowerSupplyDistributor}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Major Water Supply Level</label>
                      <input
                        type="text"
                        name="majorWaterSupplyLevel"
                        value={formData.majorWaterSupplyLevel}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Existing Means of Transportation</label>
                      <input
                        type="text"
                        name="existingMeansOfTransportation"
                        value={formData.existingMeansOfTransportation}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Existing Means of Communication</label>
                      <input
                        type="text"
                        name="existingMeansOfCommunication"
                        value={formData.existingMeansOfCommunication}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group text-right">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
