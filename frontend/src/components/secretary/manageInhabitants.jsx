import React, { useState, useEffect } from "react";
import Header from "../header";
import Navs from "../nav";
import Footer from "../footer";
import axios from "axios";

export default function ManageInhabitants() {
  const [formData, setFormData] = useState({
    hPhilSysNo: "",
    barangayID: "",
    householdId: "",
    headOfHousehold: "",
    householdAddress: "",
    contactNumber: "",
    members: [],
  });

  const [memberData, setMemberData] = useState({
    headID: "",
    philSysNo: "",
    lastName: "",
    firstName: "",
    middleName: "",
    ext: "",
    placeBirth: "",
    dateBirth: "",
    sex: "",
    civilStatus: "",
    citizenship: "",
    religion: "",
    education: "",
    educationStatus: "",
    voter: "",
    citizenStatus: "",
    occupation: "",
    relationshipToHead: "",
  });

  const [inhabitantsList, setInhabitantsList] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null); // For modal
  const [showModal, setShowModal] = useState(false); // Modal visibility

  const fetchInhabitants = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/inhabitants");
      setInhabitantsList(response.data);
    } catch (error) {
      console.error("Error fetching inhabitants:", error);
      alert("Failed to fetch inhabitants.");
    }
  };

  useEffect(() => {
    fetchInhabitants();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMemberChange = (e) => {
    const { name, value } = e.target;
    setMemberData({ ...memberData, [name]: value });
  };

  const addMember = () => {
    setFormData({
      ...formData,
      members: [...formData.members, memberData],
    });
    setMemberData({
      headID: "",
      philSysNo: "",
      lastName: "",
      firstName: "",
      middleName: "",
      ext: "",
      placeBirth: "",
      dateBirth: "",
      sex: "",
      civilStatus: "",
      citizenship: "",
      religion: "",
      education: "",
      educationStatus: "",
      voter: "",
      citizenStatus: "",
      occupation: "",
      relationshipToHead: "",
    });
  };

  const saveInhabitant = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/inhabitants",
        formData
      );
      alert("Inhabitant saved successfully!");
      fetchInhabitants(); // Refresh the list after saving
    } catch (error) {
      console.error("Error saving inhabitant:", error);
      alert("Failed to save inhabitant.");
    }
  };

  const updateInhabitant = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/inhabitants/${formData.id}`,
        formData
      );
      alert("Inhabitant updated successfully!");
      fetchInhabitants(); // Refresh the list after updating
    } catch (error) {
      console.error("Error updating inhabitant:", error);
      alert("Failed to update inhabitant.");
    }
  };

  const deleteInhabitant = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/inhabitants/${id}`
      );
      alert("Inhabitant deleted successfully!");
      fetchInhabitants(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting inhabitant:", error);
      alert("Failed to delete inhabitant.");
    }
  };

  const openMemberModal = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const closeMemberModal = () => {
    setSelectedMember(null);
    setShowModal(false);
  };

  return (
    <>
      <div className={`ts-main-content ${showModal ? "modal-open" : ""}`}>
        <Header />
        <Navs />
        <div className="content-wrapper">
          <div className="container mt-5">
            <h2 className="mb-4">Manage Inhabitants</h2>
            <div className="panel-body">
              <ul className="nav nav-tabs">
                <li className="active">
                  <a href="#head" data-toggle="tab" aria-expanded="true">
                    Head of Household
                  </a>
                </li>
                <li>
                  <a href="#members" data-toggle="tab" aria-expanded="false">
                    Members
                  </a>
                </li>
              </ul>
              <br />
              <div id="myTabContent" className="tab-content">
                <div className="tab-pane fade active in" id="head">
                  <h4>Head of Household</h4>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="hPhilSysNo" className="form-label">
                        PhilSys Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="hPhilSysNo"
                        name="hPhilSysNo"
                        value={formData.hPhilSysNo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="barangayID" className="form-label">
                        Barangay ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="barangayID"
                        name="barangayID"
                        value={formData.barangayID}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="householdId" className="form-label">
                        Household ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="householdId"
                        name="householdId"
                        value={formData.householdId}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="headOfHousehold" className="form-label">
                        Head of Household
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="headOfHousehold"
                        name="headOfHousehold"
                        value={formData.headOfHousehold}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="householdAddress" className="form-label">
                        Household Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="householdAddress"
                        name="householdAddress"
                        value={formData.householdAddress}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="contactNumber" className="form-label">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={saveInhabitant}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={updateInhabitant}
                    >
                      Update
                    </button>
                  </form>

                  <h5 className="mt-4">Head of Household List</h5>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>PhilSys Number</th>
                        <th>Barangay ID</th>
                        <th>Household ID</th>
                        <th>Head of Household</th>
                        <th>Household Address</th>
                        <th>Contact Number</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inhabitantsList.map((inhabitant) => (
                        <tr key={inhabitant._id}>
                          <td>{inhabitant.hPhilSysNo}</td>
                          <td>{inhabitant.barangayID}</td>
                          <td>{inhabitant.householdId}</td>
                          <td>{inhabitant.headOfHousehold}</td>
                          <td>{inhabitant.householdAddress}</td>
                          <td>{inhabitant.contactNumber}</td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => {
                                setFormData({
                                  id: inhabitant._id,
                                  ...inhabitant,
                                });
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteInhabitant(inhabitant._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="tab-pane fade" id="members">
                  <h4>Members</h4>
                  <form>
                    <div className="col-md-6 mb-3">
                      <div className="mb-3">
                        <label htmlFor="headID" className="form-label">
                          Head ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="headID"
                          name="headID"
                          value={memberData.headID}
                          onChange={handleMemberChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="philSysNo" className="form-label">
                          PhilSys Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="philSysNo"
                          name="philSysNo"
                          value={memberData.philSysNo}
                          onChange={handleMemberChange}
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
                          value={memberData.lastName}
                          onChange={handleMemberChange}
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
                          value={memberData.firstName}
                          onChange={handleMemberChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="middleName" className="form-label">
                          Middle Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="middleName"
                          name="middleName"
                          value={memberData.middleName}
                          onChange={handleMemberChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="ext" className="form-label">
                          Extension (e.g., Jr., Sr.)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="ext"
                          name="ext"
                          value={memberData.ext}
                          onChange={handleMemberChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="placeBirth" className="form-label">
                          Place of Birth
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="placeBirth"
                          name="placeBirth"
                          value={memberData.placeBirth}
                          onChange={handleMemberChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="dateBirth" className="form-label">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="dateBirth"
                          name="dateBirth"
                          value={memberData.dateBirth}
                          onChange={handleMemberChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="sex" className="form-label">
                          Sex
                        </label>
                        <select
                          className="form-control"
                          id="sex"
                          name="sex"
                          value={memberData.sex}
                          onChange={handleMemberChange}
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="civilStatus" className="form-label">
                          Civil Status
                        </label>
                        <select
                          className="form-control"
                          id="civilStatus"
                          name="civilStatus"
                          value={memberData.civilStatus}
                          onChange={handleMemberChange}
                        >
                          <option value="">Select</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Widowed">Widowed</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Separated">Separated</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="mb-3">
                        <label htmlFor="citizenship" className="form-label">
                          Citizenship
                        </label>
                        <select
                          className="form-control"
                          id="citizenship"
                          name="citizenship"
                          value={memberData.citizenship}
                          onChange={handleMemberChange}
                        >
                          <option value="">Select</option>
                          <option value="Filipino">Filipino</option>
                          <option value="Dual">Dual</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="religion" className="form-label">
                          Religion
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="religion"
                          name="religion"
                          value={memberData.religion}
                          onChange={handleMemberChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="education" className="form-label">
                          Education
                        </label>
                        <select
                          className="form-control"
                          id="education"
                          name="education"
                          value={memberData.education}
                          onChange={handleMemberChange}
                        >
                          <option value="">Select</option>
                          <option value="No Formal Education">
                            No Formal Education
                          </option>
                          <option value="Elementary">Elementary</option>
                          <option value="High School">High School</option>
                          <option value="College">College</option>
                          <option value="Postgraduate">Postgraduate</option>
                          <option value="Vocational">Vocational</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="educationStatus" className="form-label">
                          Education Status
                        </label>
                        <select
                          className="form-control"
                          id="educationStatus"
                          name="educationStatus"
                          value={memberData.educationStatus}
                          onChange={handleMemberChange}
                        >
                          <option value="">Select</option>
                          <option value="Graduated">Graduated</option>
                          <option value="Undergraduate">Undergraduate</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="voter" className="form-label">
                          Voter
                        </label>
                        <select
                          className="form-control"
                          id="voter"
                          name="voter"
                          value={memberData.voter}
                          onChange={handleMemberChange}
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="citizenStatus" className="form-label">
                          Citizen Status
                        </label>
                        <select
                          className="form-control"
                          id="citizenStatus"
                          name="citizenStatus"
                          value={memberData.citizenStatus}
                          onChange={handleMemberChange}
                        >
                          <option value="">Select</option>
                          <option value="Labor/Employed">Labor/Employed</option>
                          <option value="Unemployed">Unemployed</option>
                          <option value="PWD">PWD</option>
                          <option value="OFW">OFW</option>
                          <option value="Senior Citizen">Senior Citizen</option>
                          <option value="Solo Parent">Solo Parent</option>
                          <option value="Out of School Youth">
                            Out of School Youth
                          </option>
                          <option value="Out of School Children">
                            Out of School Children
                          </option>
                          <option value="Student">Student</option>
                          <option value="Housewife">Housewife</option>
                          <option value="Retired">Retired</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="occupation" className="form-label">
                          Occupation
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="occupation"
                          name="occupation"
                          value={memberData.occupation}
                          onChange={handleMemberChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="relationshipToHead"
                          className="form-label"
                        >
                          Relationship to Head
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="relationshipToHead"
                          name="relationshipToHead"
                          value={memberData.relationshipToHead}
                          onChange={handleMemberChange}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={addMember}
                      >
                        Add Member
                      </button>
                    </div>
                  </form>
                  <div className="col-md-12 mb-3">
                    <h5 className="mt-4">Members List</h5>
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>PhilSys Number</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Relationship to Head</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.members.map((member, index) => (
                          <tr key={index}>
                            <td>{member.philSysNo}</td>
                            <td>{member.firstName}</td>
                            <td>{member.lastName}</td>
                            <td>{member.relationshipToHead}</td>
                            <td>
                              <button
                                className="btn btn-info btn-sm"
                                onClick={() => openMemberModal(member)}
                              >
                                View
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    members: formData.members.filter(
                                      (_, i) => i !== index
                                    ),
                                  })
                                }
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for displaying member details */}
        {showModal && selectedMember && (
          <>
            <div className="modal-backdrop fade show"></div>
            <div
              className="modal"
              tabIndex="-1"
              role="dialog"
              style={{ display: "block" }}
            >
              <div
                className="modal-dialog modal-dialog-scrollable"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Member Details</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={closeMemberModal}
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="col-md-6">
                      <p>
                        <strong>PhilSys Number:</strong>{" "}
                        {selectedMember.philSysNo}
                      </p>
                      <p>
                        <strong>First Name:</strong> {selectedMember.firstName}
                      </p>
                      <p>
                        <strong>Last Name:</strong> {selectedMember.lastName}
                      </p>
                      <p>
                        <strong>Middle Name:</strong>{" "}
                        {selectedMember.middleName}
                      </p>
                      <p>
                        <strong>Extension:</strong> {selectedMember.ext}
                      </p>
                      <p>
                        <strong>Place of Birth:</strong>{" "}
                        {selectedMember.placeBirth}
                      </p>
                      <p>
                        <strong>Date of Birth:</strong>{" "}
                        {selectedMember.dateBirth}
                      </p>
                      <p>
                        <strong>Sex:</strong> {selectedMember.sex}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Civil Status:</strong>{" "}
                        {selectedMember.civilStatus}
                      </p>
                      <p>
                        <strong>Citizenship:</strong>{" "}
                        {selectedMember.citizenship}
                      </p>
                      <p>
                        <strong>Religion:</strong> {selectedMember.religion}
                      </p>
                      <p>
                        <strong>Education:</strong> {selectedMember.education}
                      </p>
                      <p>
                        <strong>Education Status:</strong>{" "}
                        {selectedMember.educationStatus}
                      </p>
                      <p>
                        <strong>Voter:</strong> {selectedMember.voter}
                      </p>
                      <p>
                        <strong>Citizen Status:</strong>{" "}
                        {selectedMember.citizenStatus}
                      </p>
                      <p>
                        <strong>Occupation:</strong> {selectedMember.occupation}
                      </p>
                      <p>
                        <strong>Relationship to Head:</strong>{" "}
                        {selectedMember.relationshipToHead}
                      </p>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setMemberData(selectedMember);
                        closeMemberModal();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeMemberModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  );
}
