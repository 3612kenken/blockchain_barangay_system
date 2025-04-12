import React, { useState } from "react";
import "../style.css";
import Header from "../header";
import Navs from "../nav";
import Footer from "../footer";
import axios from "axios";

export default function FiscalInfo() {
  const [formData, setFormData] = useState({
    barangayCode: "",
    internalRevenueAllotment: "",
    donationGrant: "",
    shareFromNationalWealth: "",
    othersExternalSubsidy: "",
    rptShare: "",
    feesAndCharges: "",
    othersLocal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/fiscal-info/add", formData);
      alert("Fiscal Info added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding fiscal info:", error);
      alert("Failed to add fiscal info.");
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
              <h1 className="h3 display">Fiscal Information</h1>
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
                      <label>Internal Revenue Allotment</label>
                      <input
                        type="number"
                        name="internalRevenueAllotment"
                        value={formData.internalRevenueAllotment}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Donation Grant</label>
                      <input
                        type="number"
                        name="donationGrant"
                        value={formData.donationGrant}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Share from National Wealth</label>
                      <input
                        type="number"
                        name="shareFromNationalWealth"
                        value={formData.shareFromNationalWealth}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Others External Subsidy</label>
                      <input
                        type="number"
                        name="othersExternalSubsidy"
                        value={formData.othersExternalSubsidy}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>RPT Share</label>
                      <input
                        type="number"
                        name="rptShare"
                        value={formData.rptShare}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Fees and Charges</label>
                      <input
                        type="number"
                        name="feesAndCharges"
                        value={formData.feesAndCharges}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Others Local</label>
                      <input
                        type="number"
                        name="othersLocal"
                        value={formData.othersLocal}
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
