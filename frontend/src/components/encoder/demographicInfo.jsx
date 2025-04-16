import React, { useState } from "react";
import "../style.css";
import Header from "../header";
import Navs from "../nav";
import Footer from "../footer";
import axios from "axios";

export default function DemographicInfo() {
  const [formData, setFormData] = useState({
    barangayCode: "",
    registeredVoters: "",
    RBIs: false,
    numberOfInhabitants: "",
    firstSem: "",
    secondSem: "",
    numberOfHouseholds: "",
    numberOfFamilies: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/demographic-info/add",
        formData
      );
      alert("Demographic Info added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding demographic info:", error);
      alert("Failed to add demographic info.");
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
              <h1 className="h3 display">Demographic Information</h1>
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
                      <label>Registered Voters</label>
                      <input
                        type="number"
                        name="registeredVoters"
                        value={formData.registeredVoters}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>RBIs</label>
                      <input
                        type="checkbox"
                        name="RBIs"
                        checked={formData.RBIs}
                        onChange={handleChange}
                        className="form-check-input"
                      />
                    </div>
                    {formData.RBIs && (
                      <>
                        <div className="form-group">
                          <label>Number of Inhabitants</label>
                          <input
                            type="number"
                            name="numberOfInhabitants"
                            value={formData.numberOfInhabitants}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label>First Semester</label>
                          <input
                            type="number"
                            name="firstSem"
                            value={formData.firstSem}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label>Second Semester</label>
                          <input
                            type="number"
                            name="secondSem"
                            value={formData.secondSem}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </>
                    )}
                    <div className="form-group">
                      <label>Number of Households</label>
                      <input
                        type="number"
                        name="numberOfHouseholds"
                        value={formData.numberOfHouseholds}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Number of Families</label>
                      <input
                        type="number"
                        name="numberOfFamilies"
                        value={formData.numberOfFamilies}
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
