import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddSubcategory() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [subCategoryName, setSubCategoryName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");

    // Fetch categories from API
    useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:8000/api/categories", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then(res => {
        setCategories(res.data);
    })
    .catch(err => {
        console.log("CATEGORY ERROR:", err.response?.data || err.message);
    });
}, []);

    const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    axios.post(
        "http://localhost:8000/api/subcategories",
        {
            sub_category_name: subCategoryName,
            category_id: categoryId,
            description: description,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    .then(res => {
        alert(res.data.message || "Subcategory added successfully");

        navigate("/subcategory");
    })
    .catch(err => {
        console.log("ERROR:", err.response?.data);

        alert(
            err.response?.data?.message ||
            "Failed to add subcategory (unauthorized or validation error)"
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
                                <h4 className="card-title">Add New Sub-Category</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group" style={{ marginBottom: "15px" }}>
                                        <label>Sub-Category Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={subCategoryName}
                                            onChange={(e) => setSubCategoryName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-group" style={{ marginBottom: "15px" }}>
                                        <label>Category</label>
                                        <select
                                            className="form-control"
                                            value={categoryId}
                                            onChange={(e) => setCategoryId(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.category_name}
                                                </option>
                                            ))}
                                        </select>
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

                                    <div style={{ textAlign: "right", marginTop: "10px" }}>
                                        <button type="submit" className="btn btn-primary">Add Sub Category</button>
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

export default AddSubcategory;