import React from "react";
import Layout from "../../layout/Layout";

function Subcategory() {
    // 5 Dummy Subcategories with Parent Category info
    const subcategories = [
        { id: 1, name: "Samsung", parentCategory: "Mobile", description: "Android smartphones and tablets." },
        { id: 2, name: "Apple", parentCategory: "Mobile/Laptop", description: "iPhones, MacBooks, and iPads." },
        { id: 3, name: "Dell", parentCategory: "Laptop", description: "Inspiration, XPS, and Alienware series." },
        { id: 4, name: "Sony", parentCategory: "Electronics", description: "Smart TVs and Audio systems." },
        { id: 5, name: "Louis Vuitton", parentCategory: "Fashion", description: "Luxury bags and accessories." }
    ];

    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this subcategory?")) {
            console.log("Subcategory Deleted");
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
                                        <a href="#" className="btn btn-primary btn-rounded btn-fw">
                                            Add New Subcategory
                                        </a>
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
                                                {subcategories.map((sub) => (
                                                    <tr key={sub.id}>
                                                        <td>{sub.id}</td>
                                                        <td>{sub.name}</td>
                                                        <td>
                                                            <label className="badge badge-info" style={{color: "black"}}>{sub.parentCategory}</label>
                                                        </td>
                                                        <td>{sub.description}</td>
                                                        <td>
                                                            <a href={`/edit-subcategory/${sub.id}`} style={{ marginRight: "5px" }}>
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

export default Subcategory;
