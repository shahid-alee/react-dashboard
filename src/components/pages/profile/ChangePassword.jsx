import React, { useState } from "react";
import Layout from "../../layout/Layout";
import API from "../../../api/axios";

function ChangePassword() {
    const [formData, setFormData] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ FRONTEND VALIDATION
        if (formData.new_password !== formData.confirm_password) {
            alert("New password and confirm password do not match");
            return;
        }

        try {
            await API.post("/change-password", {
                current_password: formData.current_password,
                new_password: formData.new_password,
            });

            alert("Password updated!");

            setFormData({
                current_password: "",
                new_password: "",
                confirm_password: "",
            });

        } catch (error) {
            console.log(error);
            alert(error.response?.data?.error || "Password update failed");
        }
    };

    return (
        <Layout>
            <div className="container m-4">
                <div className="card p-4 shadow" style={{ maxWidth: "900px" }}>
                    <h4 className="mb-2">Change Password</h4>

                    <form onSubmit={handleSubmit}>

                        {/* CURRENT PASSWORD */}
                        <div className="row mb-3 align-items-center">
                            <div className="col-md-4 text-end">
                                <label className="form-label mb-0">Current Password</label>
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="password"
                                    name="current_password"
                                    className="form-control"
                                    placeholder="Enter current password"
                                    onChange={handleChange}
                                    value={formData.current_password}
                                    required
                                />
                            </div>
                        </div>

                        {/* NEW PASSWORD */}
                        <div className="row mb-3 align-items-center">
                            <div className="col-md-4 text-end">
                                <label className="form-label mb-0">New Password</label>
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="password"
                                    name="new_password"
                                    className="form-control"
                                    placeholder="Enter new password"
                                    onChange={handleChange}
                                    value={formData.new_password}
                                    required
                                />
                            </div>
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div className="row mb-3 align-items-center">
                            <div className="col-md-4 text-end">
                                <label className="form-label mb-0">Confirm Password</label>
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="password"
                                    name="confirm_password"
                                    className="form-control"
                                    placeholder="Confirm new password"
                                    onChange={handleChange}
                                    value={formData.confirm_password}
                                    required
                                />
                            </div>
                        </div>

                        {/* BUTTON */}
                        <div className="row">
                            <div className="col-md-12">
                                <button className="btn btn-warning w-100">
                                    Update Password
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default ChangePassword;