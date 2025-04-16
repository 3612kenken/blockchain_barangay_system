import React, { useState } from "react";
import "../style.css";
import Header from "../header";
import Navs from "../nav";
import Footer from "../footer";
import axios from "axios";

export default function AwardsAndRecognition() {
  const [formData, setFormData] = useState({
    barangayCode: "",
    nationalLevel: "",
    regionalLevel: "",
    localLevel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/awards-and-recognition/add",
        formData
      );
      alert("Awards and Recognition added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding awards and recognition:", error);
      alert("Failed to add awards and recognition.");
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
              <h1 className="h3 display">Awards and Recognition</h1>
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
                      <label>National Level</label>
                      <input
                        type="text"
                        name="nationalLevel"
                        value={formData.nationalLevel}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Regional Level</label>
                      <input
                        type="text"
                        name="regionalLevel"
                        value={formData.regionalLevel}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Local Level</label>
                      <input
                        type="text"
                        name="localLevel"
                        value={formData.localLevel}
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
