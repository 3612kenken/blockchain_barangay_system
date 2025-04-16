import React, { useState } from "react";
import "../style.css";
import Header from "../header";
import Navs from "../nav";
import Footer from "../footer";
import axios from "axios";

export default function PoliticalInfo() {
  const [formData, setFormData] = useState({
    barangayCode: "",
    legalBasisOfCreation: "",
    dateOfPlebiscite: "",
    numberOfPrecincts: "",
    luponMember: "",
    barangayTanod: "",
    barangayHealthWorker: "",
    barangayNutritionScholar: "",
    dayCareWorker: "",
    vawDeskOfficer: "",
    badacClusterLeaders: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/political-info/add",
        formData
      );
      alert("Political Info added successfully!");
      console.log(response.data);
      // Reset form after successful submission
      setFormData({
        barangayCode: "",
        legalBasisOfCreation: "",
        dateOfPlebiscite: "",
        numberOfPrecincts: "",
        luponMember: "",
        barangayTanod: "",
        barangayHealthWorker: "",
        barangayNutritionScholar: "",
        dayCareWorker: "",
        vawDeskOfficer: "",
        badacClusterLeaders: "",
      });
    } catch (error) {
      console.error("Error adding political info:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Failed to add political info: ${error.response.data.message}`);
      } else {
        alert("Failed to add political info. Please try again later.");
      }
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
              <h1 className="h3 display">Political Information</h1>
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
                      <label>Legal Basis of Creation</label>
                      <input
                        type="text"
                        name="legalBasisOfCreation"
                        value={formData.legalBasisOfCreation}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Date of Plebiscite</label>
                      <input
                        type="date"
                        name="dateOfPlebiscite"
                        value={formData.dateOfPlebiscite}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Number of Precincts</label>
                      <input
                        type="number"
                        name="numberOfPrecincts"
                        value={formData.numberOfPrecincts}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Lupon Members</label>
                      <input
                        type="number"
                        name="luponMember"
                        value={formData.luponMember}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Barangay Tanod</label>
                      <input
                        type="number"
                        name="barangayTanod"
                        value={formData.barangayTanod}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Barangay Health Worker</label>
                      <input
                        type="number"
                        name="barangayHealthWorker"
                        value={formData.barangayHealthWorker}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Barangay Nutrition Scholar</label>
                      <input
                        type="number"
                        name="barangayNutritionScholar"
                        value={formData.barangayNutritionScholar}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Day Care Worker</label>
                      <input
                        type="number"
                        name="dayCareWorker"
                        value={formData.dayCareWorker}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>VAW Desk Officer</label>
                      <input
                        type="number"
                        name="vawDeskOfficer"
                        value={formData.vawDeskOfficer}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>BADAC Cluster Leaders</label>
                      <input
                        type="number"
                        name="badacClusterLeaders"
                        value={formData.badacClusterLeaders}
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
