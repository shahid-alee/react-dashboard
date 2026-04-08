import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom"; // import at the top
import axios from "axios";

function Category() {
    const [categories, setCategories] = useState([]);



    // Fetch categories from API
    useEffect(() => {
        axios.get("http://localhost:8000/api/categories")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            axios.delete(`http://localhost:8000/api/categories/${id}`)
                .then((res) => {
                    alert("Category deleted successfully!");
                    setCategories(categories.filter(cat => cat.id !== id)); // Remove from state
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <Layout>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="card-title">Categories Table</h4>
                                        <a href="/add-category" className="btn btn-primary btn-rounded btn-fw">
                                            Add New Category
                                        </a>
                                    </div>

                                    <div className="table-responsive">
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
                                                {categories.map((cat) => (
                                                    <tr key={cat.id}>
                                                        <td>{cat.id}</td>
                                                        <td>{cat.category_name}</td>
                                                        <td>{cat.description}</td>
                                                        <td>
                                                            <Link to={`/edit-category/${cat.id}`} style={{ marginRight: "5px" }}>
                                                                <button type="button" className="btn btn-info btn-rounded btn-sm">EDIT</button>
                                                            </Link>

                                                            <button
                                                                type="button"
                                                                className="btn btn-danger btn-rounded btn-sm"
                                                                onClick={() => handleDelete(cat.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-4 d-flex justify-content-end">
                                        <nav>
                                            <ul className="pagination">
                                                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Category;