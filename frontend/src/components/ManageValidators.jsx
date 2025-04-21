import React, { useState, useEffect } from "react";
import Header from "./header";
import Navs from "./nav";
import Footer from "./footer";
import axios from "axios";

export default function ManageValidators() {
  const [validatorIndex, setValidatorIndex] = useState("");
  const [validatorCode, setValidatorCode] = useState("");
  const [message, setMessage] = useState("");
  const [validators, setValidators] = useState([]);

  // Fetch validators on component mount
  useEffect(() => {
    fetchValidators();
  }, []);

  const fetchValidators = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/blockchain/validators`
      );
      setValidators(response.data.validators);
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to fetch validators");
    }
  };

  const handleAddValidator = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/blockchain/addValidator`,
        {
          validator: validatorCode.trim(), // Ensure the validator code is trimmed
        }
      );
      setMessage(response.data.message);
      setValidatorCode(""); // Clear the input field
      fetchValidators(); // Refresh the list
    } catch (error) {
      console.error("Error adding validator:", error); // Log the error for debugging
      setMessage(error.response?.data?.error || "Failed to add validator");
    }
  };

  const handleRemoveValidator = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/blockchain/removeValidator/${validatorIndex}`
      ); // Corrected API endpoint
      setMessage(response.data.message);
      setValidatorIndex(""); // Clear the input field
      fetchValidators(); // Refresh the list
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to remove validator");
    }
  };

  const handleRemoveValidatorByIndex = async (index) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/blockchain/removeValidator/${index}`
      );
      setMessage(response.data.message);
      fetchValidators(); // Refresh the list
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to remove validator");
    }
  };

  const handleRemoveAllValidators = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/blockchain/removeAllValidators`
      ); // Corrected API endpoint
      setMessage(response.data.message);
      fetchValidators(); // Refresh the list
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to remove all validators"
      );
    }
  };

  return (
    <>
      <div className="ts-main-content">
        <Header />
        <Navs />
        <div className="content-wrapper">
          <div className="container mt-5">
            <h2 className="mb-4">Validators Management</h2>
            {message && <p className="alert alert-info">{message}</p>}

            <form onSubmit={handleAddValidator} className="mb-4">
              <div className="mb-3">
                <label htmlFor="validatorCode" className="form-label">
                  Validator Code
                </label>
                <textarea
                  className="form-control"
                  id="validatorCode"
                  name="validatorCode"
                  value={validatorCode}
                  onChange={(e) => setValidatorCode(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Validator
              </button>
            </form>

            <h3>Validators List</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Code</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {validators.map((validator) => (
                  <tr key={validator.index}>
                    <td>{validator.index}</td>
                    <td>
                      <pre>{validator.code}</pre>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleRemoveValidatorByIndex(validator.index)
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <button
                className="btn btn-warning mb-4"
                onClick={handleRemoveAllValidators}
              >
                Remove All Validators
              </button>
            </table>
          </div>
          <br />
          <br />
          <Footer />
        </div>
      </div>
    </>
  );
}
