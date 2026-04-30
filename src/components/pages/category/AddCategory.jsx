import React, { useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";

function AddCategory() {
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    axios.post(
        "http://127.0.0.1:8000/api/categories",
        {
            category_name: categoryName,
            description: description,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    .then((res) => {
        alert(res.data.message || "Category added successfully");

        setCategoryName("");
        setDescription("");
    })
    .catch((err) => {
        console.log("ERROR:", err.response?.data);

        alert(
            err.response?.data?.message ||
            "Failed to add category (unauthorized or validation error)"
        );
    });
};

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card" style={{ width: "80%", margin: "0 auto" }}>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Add New Category</h4>

                                <form onSubmit={handleSubmit}>
                                    <div className="form-group" style={{ marginBottom: "15px" }}>
                                        <label>Category Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={categoryName}
                                            onChange={(e) => setCategoryName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            className="form-control"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            style={{ height: "150px" }}
                                        ></textarea>
                                    </div>

                                    <div style={{ textAlign: "right" }}>
                                        <button type="submit" className="btn btn-primary">
                                            Add Category
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

export default AddCategory;