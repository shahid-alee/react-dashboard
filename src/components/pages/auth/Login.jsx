import React, { useState } from "react";
import API from "../../../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/login", formData); // ✅ FIXED

    console.log(res.data);

    // ✅ store token + user
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert("Login successful!");
    navigate("/dashboard");

  } catch (error) {
    console.log(error.response);

    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else if (error.response?.data?.errors) {
      alert(JSON.stringify(error.response.data.errors));
    } else {
      alert("Login failed");
    }
  }
};

// localStorage.setItem("token", res.data.token);
// localStorage.setItem("user", JSON.stringify(res.data.user));

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-3">Welcome Back</h3>
        <p className="text-center text-muted mb-4">
          Login to your account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don’t have an account?{" "}
          <Link to="/register" className="text-decoration-none fw-bold">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;