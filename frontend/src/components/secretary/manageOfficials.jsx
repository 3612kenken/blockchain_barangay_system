import React from "react";
import Header from "../header";
import Navs from "../nav";

import Footer from "../footer";
import { useState, useEffect } from "react";

export default function ManageOfficials() {
  function saveOfficial() {}
  function updateOfficial() {}
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
                <label for="employee_id" className="form-label">
                  Employee ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="employee_id"
                  name="employee_id"
                  required
                />
              </div>
              <div className="mb-3">
                <label for="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  required
                />
              </div>
              <div className="mb-3">
                <label for="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  required
                />
              </div>
              <div className="mb-3">
                <label for="middle" className="form-label">
                  Middle Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="middle"
                  name="middle"
                  required
                />
              </div>
              <div className="mb-3">
                <label for="position" className="form-label">
                  Position
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="position"
                  name="position"
                  required
                />
              </div>
              <div className="mb-3">
                <label for="contact" className="form-label">
                  Contact
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  name="contact"
                />
              </div>
              <div className="mb-3">
                <label for="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
              <div className="mb-3">
                <label for="dateStart" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateStart"
                  name="dateStart"
                  required
                />
              </div>
              <div className="mb-3">
                <label for="dateEnd" className="form-label">
                  End Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateEnd"
                  name="dateEnd"
                  required
                />
              </div>
              <div className="mb-3">
                <label for="isActive" className="form-label">
                  Is Active
                </label>
                <select className="form-control" id="isActive" name="isActive">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onclick="saveOfficial()"
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onclick="updateOfficial()"
              >
                Update
              </button>
            </form>

            <h3 className="mt-5">Officials List</h3>
            <table className="table table-bordered mt-3">
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
                </tr>
              </thead>
              <tbody id="officialsTableBody"></tbody>
            </table>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
