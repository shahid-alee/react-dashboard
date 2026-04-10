import React, { useState } from "react";
import API from "../../../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
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
            await API.post("/register", formData);

            alert("Registration successful!");
            navigate("/");
        } catch (error) {
            console.log(error.response);

            if (error.response && error.response.data.errors) {
                alert(JSON.stringify(error.response.data.errors));
            } else {
                alert("Registration failed");
            }
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>

                <h3 className="text-center mb-3">Create Account</h3>
                <p className="text-center text-muted mb-4">
                    Register to get started
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter Name"
                            onChange={handleChange}
                            required
                        />
                    </div>

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

                    <div className="mb-3">
                        <input
                            type="password"
                            name="password_confirmation"
                            className="form-control"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Register
                    </button>
                </form>

                <p className="text-center mt-3 mb-0">
                    Already have an account?{" "}
                    <Link to="/" className="text-decoration-none fw-bold">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register;