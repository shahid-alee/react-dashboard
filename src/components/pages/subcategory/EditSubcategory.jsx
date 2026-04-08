import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import axios from "axios";

function EditSubcategory() {
    const { id } = useParams(); // get subcategory id from URL
    const navigate = useNavigate();

    const [subCategoryName, setSubCategoryName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);

    // Fetch all categories to populate dropdown
    useEffect(() => {
        axios.get("http://localhost:8000/api/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.error(err));
    }, []);

    // Fetch subcategory details by ID
    useEffect(() => {
        axios.get(`http://localhost:8000/api/subcategories/${id}`)
            .then(res => {
                setSubCategoryName(res.data.sub_category_name);
                setCategoryId(res.data.category_id);
                setDescription(res.data.description || "");
            })
            .catch(err => console.error(err));
    }, [id]);

    // Handle form submit to update subcategory
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/subcategories/${id}`, {
            sub_category_name: subCategoryName,
            category_id: categoryId,
            description: description
        })
        .then(res => {
            alert(res.data.message);
            navigate("/subcategory"); // redirect back to subcategory table
        })
        .catch(err => {
            console.error(err);
            alert("Failed to update subcategory!");
        });
    };

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card" style={{ width: "80%", margin: "0 auto" }}>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Edit Sub-Category</h4>
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
                                        <button type="submit" className="btn btn-primary">Update Sub Category</button>
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

export default EditSubcategory;