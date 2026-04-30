import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import API from "../../../api/axios";

function EditSubcategory() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [subCategoryName, setSubCategoryName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load categories
    useEffect(() => {
        API.get("/categories")
            .then((res) => {
                setCategories(res.data.data || res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    // Load subcategory
    useEffect(() => {
        setLoading(true);

        API.get(`/subcategories/${id}`)
            .then((res) => {
                const sub = res.data;

                setSubCategoryName(sub.sub_category_name);
                setCategoryId(sub.category_id);
                setDescription(sub.description || "");
            })
            .catch(() => alert("Failed to load subcategory"))
            .finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        API.put(`/subcategories/${id}`, {
            sub_category_name: subCategoryName,
            category_id: categoryId,
            description: description,
        })
            .then((res) => {
                alert(res.data.message);
                navigate("/subcategory");
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

                        <h4>Edit Subcategory</h4>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Name</label>
                                <input
                                    className="form-control"
                                    value={subCategoryName}
                                    onChange={(e) =>
                                        setSubCategoryName(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Category</label>
                                <select
                                    className="form-control"
                                    value={categoryId}
                                    onChange={(e) =>
                                        setCategoryId(e.target.value)
                                    }
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.category_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label>Description</label>
                                <textarea
                                    className="form-control"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>

                            <button className="btn btn-success">
                                Update Subcategory
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default EditSubcategory;