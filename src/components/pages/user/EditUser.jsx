import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../api/axios";

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

      API.get(`/users/${id}`)
        .then((res) => {
          const user = res.data;

          setFormData({
            name: user.name,
            email: user.email,
            password: "",
            role: user.role,
          });
        })
        .catch(() => alert("Failed to fetch user"))
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

    const dataToSend = { ...formData };

    if (!dataToSend.password) {
      delete dataToSend.password;
    }

    const request = id
      ? API.put(`/users/${id}`, dataToSend)
      : API.post(`/users/store`, dataToSend);

    request
      .then(() => {
        alert(id ? "User Updated Successfully" : "User Added Successfully");
        navigate("/users");
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Error occurred");
      });
  };

  if (loading) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body">

            <h4>{id ? "Edit User" : "Add User"}</h4>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                className="form-control mb-2"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />

              <input
                type="email"
                name="email"
                className="form-control mb-2"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />

              <input
                type="password"
                name="password"
                className="form-control mb-2"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />

              <select
                name="role"
                className="form-control mb-2"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <button className="btn btn-success">
                {id ? "Update User" : "Add User"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default EditUser;