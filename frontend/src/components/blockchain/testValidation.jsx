import React, { useState, useEffect } from "react";
import Header from "../header";
import Navs from "../nav";
import Footer from "../footer";
import axios from "axios";

export default function TestValidation() {
  const [blockData, setBlockData] = useState("");
  const [validationResult, setValidationResult] = useState(null);
  const [blockchain, setBlockchain] = useState([]);
  const [validators, setValidators] = useState([]);
  const [approvedValidators, setApprovedValidators] = useState({}); // Track approved validators

  const sampleBlocks = [
    '{"name": "John Doe", "age": 30, "occupation": "Engineer"}',
    '{"name": "Jane Smith", "age": 25, "occupation": "Designer"}',
    '{"name": "Alice Johnson", "age": 40, "occupation": "Manager"}',
  ];

  useEffect(() => {
    fetchBlockchain();
    fetchValidators();
  }, []);

  const handleChange = (e) => {
    setBlockData(e.target.value);
  };

  const fetchBlockchain = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/blockchain");
      setBlockchain(response.data.blockchain);
    } catch (error) {
      console.error("Error fetching blockchain:", error);
      alert("Failed to fetch blockchain.");
    }
  };

  const fetchValidators = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/blockchain/validators"
      );
      setValidators(response.data.validators);

      // Initialize approvedValidators state
      const initialApprovals = {};
      response.data.validators.forEach((_, index) => {
        initialApprovals[index] = false;
      });
      setApprovedValidators(initialApprovals);
    } catch (error) {
      console.error("Error fetching validators:", error);
      alert("Failed to fetch validators.");
    }
  };

  const approveValidator = (index) => {
    setApprovedValidators((prev) => ({
      ...prev,
      [index]: true, // Mark this validator as approved
    }));
  };

  const approveBlockWithValidator = async (validatorCode, index) => {
    try {
      // Simulate approval for the validator
      alert(`Validator ${index} approved!`);
      setApprovedValidators((prev) => ({
        ...prev,
        [index]: true, // Mark this validator as approved
      }));
    } catch (error) {
      console.error("Error approving validator:", error.message);
    }
  };

  const addBlock = async () => {
    // Ensure all validators are approved before adding the block
    const allApproved = Object.values(approvedValidators).every(
      (approved) => approved
    );
    if (!allApproved) {
      alert("Please approve all validators before adding the block.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/blockchain/add",
        {
          data: JSON.parse(blockData),
        }
      );
      alert("Block added successfully!");
      setValidationResult({
        success: true,
        message: "Block added successfully!",
      });
      fetchBlockchain(); // Refresh the blockchain
    } catch (error) {
      console.error("Error adding block:", error);
      setValidationResult({
        success: false,
        message: error.response?.data?.error || "Failed to add block",
      });
    }
  };

  return (
    <>
      <div className="ts-main-content">
        <Header />
        <Navs />
        <div className="content-wrapper">
          <div className="container mt-5">
            <h2 className="mb-4">Test Blockchain Validation</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="blockData" className="form-label">
                  Block Data (JSON format)
                </label>
                <textarea
                  className="form-control"
                  id="blockData"
                  rows="5"
                  value={blockData}
                  onChange={handleChange}
                  placeholder='{"key": "value"}'
                ></textarea>
                <div className="mt-2">
                  <strong>Sample Blocks:</strong>
                  <ul>
                    {sampleBlocks.map((sample, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          className="btn btn-link p-0"
                          onClick={() => setBlockData(sample)}
                        >
                          {sample}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={addBlock}
              >
                Add Block
              </button>
            </form>

            {validationResult && (
              <div
                className={`alert mt-3 ${
                  validationResult.success ? "alert-success" : "alert-danger"
                }`}
              >
                {validationResult.message}
              </div>
            )}

            <h3 className="mt-5">Blockchain</h3>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Timestamp</th>
                  <th>Data</th>
                  <th>Hash</th>
                  <th>Previous Hash</th>
                </tr>
              </thead>
              <tbody>
                {blockchain.map((block, index) => (
                  <tr key={index}>
                    <td>{block.index}</td>
                    <td>{new Date(block.timestamp).toLocaleString()}</td>
                    <td>{JSON.stringify(block.data)}</td>
                    <td>{block.hash}</td>
                    <td>{block.previousHash}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="mt-5">Validators</h3>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Validator Code</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {validators.map((validator, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>
                      <pre>{validator.code}</pre>
                    </td>
                    <td>
                      <button
                        className={`btn ${
                          approvedValidators[index]
                            ? "btn-primary"
                            : "btn-success"
                        } btn-sm`}
                        onClick={() =>
                          approveBlockWithValidator(validator.code, index)
                        }
                        disabled={approvedValidators[index]} // Disable button if already approved
                      >
                        {approvedValidators[index]
                          ? "Approved"
                          : `Approve Block with Validator ${index}`}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
