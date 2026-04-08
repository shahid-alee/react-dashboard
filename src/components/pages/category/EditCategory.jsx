import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import axios from "axios";

function EditCategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/categories/${id}`)
            .then(res => {
                setCategoryName(res.data.category_name);
                setDescription(res.data.description);
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/categories/${id}`, {
            category_name: categoryName,
            description: description
        })
        .then(res => {
            alert(res.data.message);
            navigate("/category"); // redirect to category table
        })
        .catch(err => {
            console.error(err);
            alert("Failed to update category!");
        });
    };

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card" style={{ width: "80%", margin: "0 auto" }}>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Edit Category</h4>
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
                                            Update Category
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

export default EditCategory;