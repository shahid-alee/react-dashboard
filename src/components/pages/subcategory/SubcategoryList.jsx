import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";

function Subcategory() {
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/subcategory")
            .then(res => setSubcategories(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this subcategory?")) {
            axios.delete(`http://localhost:8000/api/subcategories/${id}`)
                .then(() => {
                    alert("Subcategory deleted successfully!");
                    setSubcategories(subcategories.filter(sub => sub.id !== id));
                })
                .catch(err => console.error(err));
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
                                        <h4 className="card-title">Subcategories Table</h4>
                                        <Link to="/add-subcategory" className="btn btn-primary btn-rounded btn-fw">
                                            Add New Subcategory
                                        </Link>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Subcategory Name</th>
                                                    <th>Category</th>
                                                    <th>Description</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subcategories.map(sub => (
                                                    <tr key={sub.id}>
                                                        <td>{sub.id}</td>
                                                        <td>{sub.sub_category_name}</td>
                                                        <td>
                                                            {sub.category?.category_name || "N/A"}
                                                        </td>
                                                        <td>{sub.description}</td>
                                                        <td>
                                                            <Link to={`/edit-subcategory/${sub.id}`} style={{ marginRight: "5px" }}>
                                                                <button className="btn btn-info btn-rounded btn-sm">EDIT</button>
                                                            </Link>
                                                            <button
                                                                className="btn btn-danger btn-rounded btn-sm"
                                                                onClick={() => handleDelete(sub.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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

export default Subcategory;