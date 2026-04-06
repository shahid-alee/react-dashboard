import React from "react";
import Layout from "../../layout/Layout";

function Category() {
    // 5 Dummy Categories
    const categories = [
        { id: 1, name: "Mobile", description: "All types of smartphones and mobile accessories." },
        { id: 2, name: "Laptop", description: "Professional, gaming, and student laptops." },
        { id: 3, name: "Electronics", description: "Home appliances, cameras, and audio gear." },
        { id: 4, name: "Fashion", description: "Clothing, watches, and luxury handbags." },
        { id: 5, name: "Gaming", description: "Consoles, controllers, and video games." }
    ];

    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this category?")) {
            console.log("Category Deleted");
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
                                        <a href="#" className="btn btn-primary btn-rounded btn-fw">
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
                                                        <td>{cat.name}</td>
                                                        <td>{cat.description}</td>
                                                        <td>
                                                            <a href={`/edit-category/${cat.id}`} style={{ marginRight: "5px" }}>
                                                                <button type="button" className="btn btn-info btn-rounded btn-sm">
                                                                    EDIT
                                                                </button>
                                                            </a>

                                                            <form style={{ display: "inline" }} onSubmit={handleDelete}>
                                                                <button type="submit" className="btn btn-danger btn-rounded btn-sm">
                                                                    Delete
                                                                </button>
                                                            </form>
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
