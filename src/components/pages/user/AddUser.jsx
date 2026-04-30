import React, { useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";

function AddUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    axios.post(
      "http://127.0.0.1:8000/api/users/store",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      alert("User Added Successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      console.log(res.data);
    })
    .catch((err) => {
      console.log("ERROR:", err.response?.data);

      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        const messages = Object.values(errors).flat();
        alert(messages.join("\n"));
      } else {
        alert(err.response?.data?.message || "Error adding user");
      }
    });
  };

  return (
    <Layout>
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card" style={{ width: "80%", margin: "0 auto" }}>
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add New User</h4>

                <form onSubmit={handleSubmit}>

                  {/* Name */}
                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">User Name</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">Email</label>
                    <div className="col-md-9">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">Password</label>
                    <div className="col-md-9">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">Role</label>
                    <div className="col-md-9">
                      <select
                        name="role"
                        className="form-control"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <button type="submit" className="btn btn-primary">
                      Add User
                    </button>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddUser;