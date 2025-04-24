import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        formData
      );
      const { token, user } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      alert(`Welcome, ${user.username}!`);
      navigate("/dashboard"); // Redirect to the dashboard
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(
        error.response?.data?.error || "Login failed. Please try again."
      );
    }
  };

  return (
    <>
      <div className="login-page bk-img bg-img">
        <div className="form-content">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <div className="mt-4x">Sign in</div>
                <div className="well row pb-3x bk-light">
                  <h2 className="text-center text-bold pb-2x">
                    Blockchain-Based Barangay Information System (3BIS)
                  </h2>
                  <div className="col-md-8 col-md-offset-2">
                    <form onSubmit={handleLogin}>
                      <label
                        htmlFor="username"
                        className="text-uppercase text-sm"
                      >
                        Your Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="form-control mb"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />

                      <label
                        htmlFor="password"
                        className="text-uppercase text-sm"
                      >
                        Password
                      </label>

                      <div style={{ position: "relative" }}>
                        <input
                          type={showPassword ? "text" : "password"} // Toggle input type
                          name="password"
                          placeholder="Password"
                          className="form-control"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="button"
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                        >
                          <i
                            className={`fas ${
                              showPassword ? "fa-eye-slash" : "fa-eye"
                            }`}
                          ></i>
                        </button>
                      </div>

                      {errorMessage && (
                        <div className="alert alert-danger">{errorMessage}</div>
                      )}

                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                      >
                        LOGIN
                      </button>
                    </form>
                  </div>
                </div>
                <div className="text-center text-light">
                  <a href="#" className="text-light">
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
