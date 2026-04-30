import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import API from "../../../api/axios";

function EditCategory() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch category
    useEffect(() => {
        setLoading(true);

        API.get(`/categories/${id}`)
            .then((res) => {
                setCategoryName(res.data.category_name);
                setDescription(res.data.description || "");
            })
            .catch(() => {
                alert("Failed to fetch category");
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        API.put(`/categories/${id}`, {
            category_name: categoryName,
            description: description,
        })
            .then((res) => {
                alert(res.data.message);
                navigate("/category");
            })
            .catch((err) => {
                console.error(err.response?.data || err.message);
                alert("Update failed");
            });
    };

    if (loading) return <Layout>Loading...</Layout>;

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="card">
                    <div className="card-body">

                        <h4>Edit Category</h4>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Category Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Description</label>
                                <textarea
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <button className="btn btn-success">
                                Update Category
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default EditCategory;