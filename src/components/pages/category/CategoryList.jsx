import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import API from "../../../api/axios";

function Category() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const fetchCategories = () => {
        API.get("/categories")
            .then((res) => {
                setCategories(res.data.data || res.data);
            })
            .catch((err) => {
                console.error("Fetch Error:", err.response?.data || err.message);
            });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        API.delete(`/categories/${id}`)
            .then(() => {
                alert("Category deleted successfully");
                fetchCategories(); // refresh list
            })
            .catch((err) => {
                console.error("Delete Error:", err.response?.data || err.message);
                alert("Failed to delete category");
            });
    };

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="card">
                    <div className="card-body">

                        <div className="d-flex justify-content-between mb-3">
                            <h4>Categories Table</h4>

                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/add-category")}
                            >
                                Add New Category
                            </button>
                        </div>

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category Name</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {categories.length > 0 ? (
                                    categories.map((cat) => (
                                        <tr key={cat.id}>
                                            <td>{cat.id}</td>
                                            <td>{cat.category_name}</td>
                                            <td>{cat.description}</td>
                                            <td>
                                                <button
                                                    className="btn btn-info btn-sm me-2"
                                                    onClick={() =>
                                                        navigate(`/edit-category/${cat.id}`)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(cat.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            No Categories Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Category;