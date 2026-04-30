import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../api/axios";

function Subcategory() {
    const [subcategories, setSubcategories] = useState([]);
    const navigate = useNavigate();

    const fetchSubcategories = () => {
        API.get("/subcategory")
            .then((res) => {
                const data = res.data.data ?? res.data;
                setSubcategories(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error("Fetch Error:", err.response?.data || err.message);
            });
    };

    useEffect(() => {
        fetchSubcategories();
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure?")) return;

        API.delete(`/subcategories/${id}`)
            .then(() => {
                alert("Deleted successfully");
                fetchSubcategories(); // refresh list
            })
            .catch((err) => {
                console.error(err.response?.data || err.message);
            });
    };

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="card">
                    <div className="card-body">

                        <div className="d-flex justify-content-between mb-3">
                            <h4>Subcategories Table</h4>

                            <Link to="/add-subcategory" className="btn btn-primary">
                                Add New Subcategory
                            </Link>
                        </div>

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {subcategories.length > 0 ? (
                                    subcategories.map((sub) => (
                                        <tr key={sub.id}>
                                            <td>{sub.id}</td>
                                            <td>{sub.sub_category_name}</td>
                                            <td>{sub.category?.category_name || "N/A"}</td>
                                            <td>{sub.description}</td>
                                            <td>
                                                <button
                                                    className="btn btn-info btn-sm me-2"
                                                    onClick={() =>
                                                        navigate(`/edit-subcategory/${sub.id}`)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(sub.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No Subcategories Found
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

export default Subcategory;