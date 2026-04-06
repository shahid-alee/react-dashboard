import React from "react";
import Layout from "../../layout/Layout";

function User() {
    const users = [
        { id: 1, name: "Zeeshan Khan", email: "zeeshan@example.com", role: "Admin" },
        { id: 2, name: "Ayesha Ahmed", email: "ayesha@example.com", role: "User" },
        { id: 3, name: "Bilal Malik", email: "bilal@example.com", role: "Editor" },
        { id: 4, name: "Sana Gul", email: "sana@example.com", role: "User" },
        { id: 5, name: "Omar Farooq", email: "omar@example.com", role: "Admin" },
        { id: 6, name: "Hina Riaz", email: "hina@example.com", role: "User" },
        { id: 7, name: "Usman Ali", email: "usman@example.com", role: "Moderator" },
        { id: 8, name: "Mariam Jilani", email: "mariam@example.com", role: "User" },
        { id: 9, name: "Hamza Sheikh", email: "hamza@example.com", role: "Admin" },
        { id: 10, name: "Fatima Noor", email: "fatima@example.com", role: "User" },
    ];

    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this user?")) {
            console.log("Deleted");
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
                                        <h4 className="card-title">Users Table</h4>
                                        <a href="#" className="btn btn-primary btn-rounded btn-fw">
                                            Add New User
                                        </a>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {users.map((user) => (
                                                    <tr key={user.id}>
                                                        <td>{user.id}</td>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.role}</td>
                                                        <td>
                                                            <a href={`/edit/${user.id}`} style={{ marginRight: "5px" }}>
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
                                        {/* Placeholder for Pagination */}
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

export default User;
