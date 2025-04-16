import React, { useState } from "react";
import "../style.css";
import Header from "../header";
import Navs from "../nav";
import Footer from "../footer";
import axios from "axios";

export default function PhysicalInfo() {
  const [formData, setFormData] = useState({
    physicalID: "",
    barangayCode: "",
    totalLandArea: "",
    barangayCategory: "",
    landClassification: "",
    barangayLocation: "",
    economicSource: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/physical-info/add",
        formData
      );
      alert("Physical Info added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding physical info:", error);
      alert("Failed to add physical info.");
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
              <h1 className="h3 display">Physical Information</h1>
            </header>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="form-group">
                      <label>Physical ID</label>
                      <input
                        type="text"
                        name="physicalID"
                        value={formData.physicalID}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
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
                      <label>Total Land Area</label>
                      <input
                        type="number"
                        name="totalLandArea"
                        value={formData.totalLandArea}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Barangay Category</label>
                      <select
                        name="barangayCategory"
                        value={formData.barangayCategory}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="">Select</option>
                        <option value="Urban">Urban</option>
                        <option value="Rural">Rural</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Land Classification</label>
                      <select
                        name="landClassification"
                        value={formData.landClassification}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="">Select</option>
                        <option value="Upland">Upland</option>
                        <option value="Lowland">Lowland</option>
                        <option value="Coastal">Coastal</option>
                        <option value="Landlocked">Landlocked</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Barangay Location</label>
                      <select
                        name="barangayLocation"
                        value={formData.barangayLocation}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="">Select</option>
                        <option value="Tabing-ilog">Tabing-ilog</option>
                        <option value="Tabing-dagat">Tabing-dagat</option>
                        <option value="Tabing-bundok">Tabing-bundok</option>
                        <option value="Poblacion">Poblacion</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Economic Source</label>
                      <select
                        name="economicSource"
                        value={formData.economicSource}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="">Select</option>
                        <option value="Agricultural">Agricultural</option>
                        <option value="Fishing">Fishing</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Industrial">Industrial</option>
                      </select>
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
