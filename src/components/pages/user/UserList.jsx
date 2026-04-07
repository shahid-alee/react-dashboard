import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";

function User() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);


  const fetchUsers = (page = 1) => {
    setCurrentPage(page);

    axios
      .get(`http://127.0.0.1:8000/api/users?page=${page}`)
      .then((res) => {
        setUsers(res.data.data);      // Users array
        setPagination(res.data);      // Pagination info
      })
      .catch((err) => console.error("Error fetching users:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/users/${id}`)
        .then(() => {
          alert("User deleted successfully");
          fetchUsers(currentPage); // Refresh table after delete
        })
        .catch((err) => console.error(err));
    }
  };

  // Load users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
              <h4>Users Table</h4>
              <a href="/add-user" className="btn btn-primary">
                Add User
              </a>
            </div>

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Profile & Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                          {user.profile_image && (
                            <img
                              src={`http://127.0.0.1:8000/images/users/${user.profile_image}`}
                              alt={user.name}
                              width="40"
                              height="40"
                              style={{ borderRadius: "50%", marginRight: "10px" }}
                            />
                          )}
                          {user.name}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <a
                            href={`/users/${user.id}`}
                            className="btn btn-info btn-sm me-2"
                          >
                            Edit
                          </a>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        No Users Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-3 d-flex justify-content-between align-items-center">
              <button
                className="btn btn-secondary"
                disabled={!pagination.prev_page_url}
                onClick={() => fetchUsers(currentPage - 1)}
              >
                Previous
              </button>

              <span>
                Page {pagination.current_page || 1} of {pagination.last_page || 1}
              </span>

              <button
                className="btn btn-secondary"
                disabled={!pagination.next_page_url}
                onClick={() => fetchUsers(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default User;