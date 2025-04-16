import React, { useState, useEffect } from "react";
import Header from "../header";
import Navs from "../nav";
import Footer from "../footer";
import axios from "axios";

export default function ManageOfficials() {
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

  const deleteOfficial = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/officials/${id}`
      );
      alert("Official deleted successfully!");
      console.log(response.data);
      fetchOfficials(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting official:", error);
      alert("Failed to delete official.");
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
            <h2 className="mb-4">Officials Form</h2>
            <form id="officialsForm">
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
              <div className="mb-3">
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
              <div className="mb-3">
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
              <div className="mb-3">
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
              <div className="mb-3">
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
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                />
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
            </form>

            <h3 className="mt-5">Officials List</h3>
            <table
              id="zctb"
              className="table table-striped table-bordered table-hover"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Position</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Is Active</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {officialsList.map((official) => (
                  <tr key={official.employee_id}>
                    <td>{official.employee_id}</td>
                    <td>{official.firstName}</td>
                    <td>{official.lastName}</td>
                    <td>{official.position}</td>
                    <td>{official.contact}</td>
                    <td>{official.email}</td>
                    <td>{official.dateStart}</td>
                    <td>{official.dateEnd}</td>
                    <td>{official.isActive ? "Yes" : "No"}</td>
                    <td>
                      {official.image && (
                        <img
                          src={`http://localhost:3000${official.image}`}
                          alt="Official"
                          style={{ width: "50px", height: "50px" }}
                        />
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => editOfficial(official)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteOfficial(official._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
