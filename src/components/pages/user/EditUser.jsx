import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditUser() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`http://127.0.0.1:8000/api/users/${id}`)
        .then((res) => {
          const user = res.data;
          setFormData({
            name: user.name,
            email: user.email,
            password: "", 
            role: user.role,
          });
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to fetch user data.");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const request = id
      ? axios.put(`http://127.0.0.1:8000/api/users/${id}`, formData)
      : axios.post("http://127.0.0.1:8000/api/users/store", formData);

    request
      .then((res) => {
        alert(id ? "User Updated Successfully" : "User Added Successfully");
        navigate("/users"); // Redirect to user list
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 422) {
            const errors = err.response.data.errors;
            const messages = Object.values(errors).flat();
            alert("Validation Error:\n" + messages.join("\n"));
          } else {
            alert("Error: " + (err.response.data.message || "Something went wrong"));
          }
        } else {
          alert("Network Error: Could not connect to server");
        }
        console.error("Error:", err.response?.data || err);
      });
  };

  if (loading) return <Layout>Loading user data...</Layout>;

  return (
    <Layout>
      <div className="content-wrapper">
        <div className="row">
          <div
            className="col-md-6 grid-margin stretch-card"
            style={{ width: "80%", margin: "0 auto" }}
          >
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">{id ? "Edit User" : "Add New User"}</h4>

                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label>User Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>{id ? "New Password (leave blank to keep current)" : "Password"}</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      {...(!id && { required: true })}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Role</label>
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

                  <div style={{ textAlign: "right" }}>
                    <button type="submit" className="btn btn-primary">
                      {id ? "Update User" : "Add User"}
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

export default EditUser;