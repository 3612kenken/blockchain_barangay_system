import React from "react";
import { useState, useEffect } from "react";

export default function ManageUsers() {
  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">Users Form</h2>
        <form id="usersForm">
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
            <label for="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="mb-3">
            <label for="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              required
            />
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              required
            />
          </div>
          <div className="mb-3">
            <label for="user_level" className="form-label">
              User Level
            </label>
            <select
              className="form-control"
              id="user_level"
              name="user_level"
              required
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onclick="saveUser()"
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onclick="updateUser()"
          >
            Update
          </button>
        </form>

        <h3 className="mt-5">Users List</h3>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Email</th>
              <th>Username</th>
              <th>User Level</th>
            </tr>
          </thead>
          <tbody id="usersTableBody"></tbody>
        </table>
      </div>
    </>
  );
}
