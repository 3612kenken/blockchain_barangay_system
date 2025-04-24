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
  const [pendingBlocks, setPendingBlocks] = useState([]); // Track pending blocks

  const sampleBlocks = [
    '{"name": "John Doe", "age": 30, "occupation": "Engineer"}',
    '{"name": "Jane Smith", "age": 25, "occupation": "Designer"}',
    '{"name": "Alice Johnson", "age": 40, "occupation": "Manager"}',
  ];

  useEffect(() => {
    fetchBlockchain();
    fetchValidators();
    fetchPendingBlocks();
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
    } catch (error) {
      console.error("Error fetching validators:", error);
      alert("Failed to fetch validators.");
    }
  };

  const fetchPendingBlocks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/blockchain/pending"
      );
      setPendingBlocks(response.data.pendingBlocks); // Ensure the response contains `pendingBlocks`
    } catch (error) {
      console.error("Error fetching pending blocks:", error);
      alert("Failed to fetch pending blocks.");
    }
  };

  const approvePendingBlock = async (blockIndex, validatorIndex) => {
    try {
      await axios.post(
        `http://localhost:3000/api/blockchain/approve/${blockIndex}/${validatorIndex}`
      );
      alert(`Block approved by Validator ${validatorIndex}`);
      fetchPendingBlocks(); // Refresh pending blocks
      fetchBlockchain(); // Refresh the blockchain
    } catch (error) {
      console.error("Error approving block:", error);
      alert("Failed to approve block.");
    }
  };

  const addBlock = async () => {
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
      fetchPendingBlocks(); // Refresh pending blocks
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
                Add Block to Pending
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

            <h3 className="mt-5">Pending Blocks</h3>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Data</th>
                  <th>Timestamp</th>
                  <th>Approval Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingBlocks.length > 0 ? (
                  pendingBlocks.map((pending, blockIndex) => (
                    <tr key={blockIndex}>
                      <td>{blockIndex}</td>
                      <td>{JSON.stringify(pending.block.data)}</td>
                      <td>
                        {new Date(pending.block.timestamp).toLocaleString()}
                      </td>
                      <td>
                        {pending.approvalStatus.map(
                          (status, validatorIndex) => (
                            <div key={validatorIndex}>
                              Validator {validatorIndex}:{" "}
                              {status ? "Approved" : "Pending"}
                            </div>
                          )
                        )}
                      </td>
                      <td>
                        {pending.approvalStatus.map(
                          (status, validatorIndex) => (
                            <button
                              key={validatorIndex}
                              className={`btn ${
                                status ? "btn-primary" : "btn-success"
                              } btn-sm`}
                              onClick={() =>
                                approvePendingBlock(blockIndex, validatorIndex)
                              }
                              disabled={status} // Disable button if already approved
                            >
                              {status
                                ? "Approved"
                                : `Approve Validator ${validatorIndex}`}
                            </button>
                          )
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No pending blocks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <h3 className="mt-5">Approved Blocks</h3>
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
