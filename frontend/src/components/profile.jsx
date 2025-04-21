import React, { useState, useEffect } from "react";
import Header from "./header";
import Navs from "./nav";
import Footer from "./footer";
import axios from "axios";

export default function Profile() {
  const [formData, setFormData] = useState({
    employee_id: "",
    firstName: "",
    lastName: "",
    middle: "",
    position: "",
    contact: "",
    email: "",
    dateStart: "",
    dateEnd: "",
    isActive: "true",
    image: null, // Add image field
  });

  const [officialsList, setOfficialsList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    const output = document.getElementById("output");
    output.src = URL.createObjectURL(e.target.files[0]);
  };

  const fetchOfficials = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/officials");
      setOfficialsList(response.data);
    } catch (error) {
      console.error("Error fetching officials:", error);
      alert("Failed to fetch officials.");
    }
  };

  useEffect(() => {
    fetchOfficials();
  }, []);

  const saveOfficial = async () => {
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios.post(
        "http://localhost:3000/api/officials",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Official saved successfully!");
      console.log(response.data);
      fetchOfficials(); // Refresh the list after saving
    } catch (error) {
      console.error("Error saving official:", error);
      alert("Failed to save official.");
    }
  };

  const updateOfficial = async () => {
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios.put(
        `http://localhost:3000/api/officials/${formData.id}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Official updated successfully!");
      console.log(response.data);
      fetchOfficials(); // Refresh the list after updating
    } catch (error) {
      console.error("Error updating official:", error);
      alert("Failed to update official.");
    }
  };

  const editOfficial = (official) => {
    setFormData({
      id: official._id,
      employee_id: official.employee_id,
      firstName: official.firstName,
      lastName: official.lastName,
      middle: official.middle,
      position: official.position,
      contact: official.contact,
      email: official.email,
      dateStart: official.dateStart,
      dateEnd: official.dateEnd,
      isActive: official.isActive ? "true" : "false",
      image: null, // Reset image field for editing
    });
  };

  return (
    <>
      <div className="ts-main-content">
        <Header />
        <Navs />
        <div className="content-wrapper">
          <div className="container mt-5">
            <h2 className="mb-4">Profile Form</h2>
            <form id="profileForm">
              <div className="col-md-4 mb-3 text-center">
                <h4>Profile Picture</h4>

                <img
                  class="border-gray"
                  width="100%"
                  src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
                  id="output"
                  alt="..."
                  style={{
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                  }}
                />
                <hr />
                <h5>
                  Change User
                  <br />
                  <small>Profile Picture</small>
                </h5>

                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <label for="image" class="btn btn-info">
                  <span class="fa fa-upload"></span> Browse File
                </label>
              </div>
              <div className="col-md-8 mb-3">
                <div className="mb-3">
                  <label htmlFor="employee_id" className="form-label">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="employee_id"
                    name="employee_id"
                    value={formData.employee_id}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="middle" className="form-label">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="middle"
                    name="middle"
                    value={formData.middle}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 hidden">
                  <label htmlFor="position" className="form-label">
                    Position
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">
                    Contact
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 hidden">
                  <label htmlFor="dateStart" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateStart"
                    name="dateStart"
                    value={formData.dateStart}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 hidden">
                  <label htmlFor="dateEnd" className="form-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateEnd"
                    name="dateEnd"
                    value={formData.dateEnd}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 hidden">
                  <label htmlFor="isActive" className="form-label">
                    Is Active
                  </label>
                  <select
                    className="form-control"
                    id="isActive"
                    name="isActive"
                    value={formData.isActive}
                    onChange={handleChange}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveOfficial}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={updateOfficial}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
