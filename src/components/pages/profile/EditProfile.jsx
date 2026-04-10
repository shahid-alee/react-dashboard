import React, { useState, useEffect } from "react";
import API from "../../../api/axios";
import Layout from "../../layout/Layout";

function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profile_image: null,
  });

  const [preview, setPreview] = useState(null);

  // Load current profile
  useEffect(() => {
    API.get("/profile")
      .then((res) => {
        setFormData({
          name: res.data.name,
          email: res.data.email,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setFormData({
      ...formData,
      profile_image: e.target.files[0],
    });

    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email); // ✅ added email

    if (formData.profile_image) {
      data.append("profile_image", formData.profile_image);
    }

    try {
      const res = await API.post("/profile/update", data);

      alert("Profile updated!");

      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  return (
    <Layout>
    <div className="container m-4">
      <div className="card p-4 shadow" style={{ maxWidth: "900px" }}>
        <h4>Edit Profile</h4>

        <form onSubmit={handleSubmit}>

  {/* NAME */}
  <div className="row mb-3 align-items-center">
    <div className="col-md-4 text-end">
      <label className="form-label mb-0">Name</label>
    </div>
    <div className="col-md-8">
      <input
        type="text"
        name="name"
        className="form-control"
        value={formData.name}
        onChange={handleChange}
      />
    </div>
  </div>

  {/* EMAIL */}
  <div className="row mb-3 align-items-center">
    <div className="col-md-4 text-end">
      <label className="form-label mb-0">Email</label>
    </div>
    <div className="col-md-8">
      <input
        type="email"
        name="email"
        className="form-control"
        value={formData.email}
        onChange={handleChange}
      />
    </div>
  </div>

  {/* IMAGE */}
  <div className="row mb-3 align-items-center">
    <div className="col-md-4 text-end">
      <label className="form-label mb-0">Profile Image</label>
    </div>
    <div className="col-md-8">
      <input
        type="file"
        className="form-control"
        onChange={handleImage}
      />
    </div>
  </div>

  {/* PREVIEW */}
  {preview && (
    <div className="row mb-3">
      <div className="col-md-4"></div>
      <div className="col-md-8">
        <img
          src={preview}
          width="80"
          height="80"
          className="rounded-circle"
        />
      </div>
    </div>
  )}

  {/* BUTTON */}
  <div className="row">
    <div className="col-md-4"></div>
    <div className="col-md-8">
      <button className="btn btn-primary w-100">
        Update Profile
      </button>
    </div>
  </div>

</form>
      </div>
    </div>
    </Layout>
  );
}

export default EditProfile;