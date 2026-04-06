import React from "react";
import Layout from "../../layout/Layout";

function AddUser() {
    // Style for the labels to align them to the right
    const labelStyle = {
        display: "block",
        textAlign: "left",
        marginBottom: "5px",
        fontWeight: "500"
    };

    // Style for the inputs to ensure they remain white
    const inputStyle = {
        backgroundColor: "white",
        color: "black",
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px"
    };

    const btnStyle = {
        display: "block",
        textAlign: "left",
    }

    return (
        <Layout>
           
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-md-6 grid-margin stretch-card" style={{ width: "80%", margin: "0 auto" }}>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Add New User</h4>

                                    <form>
                                        <div className="form-group" style={{ marginBottom: "15px" }}>
                                            <label style={labelStyle}>User Name</label>
                                            <input type="text" className="form-control" style={inputStyle} />
                                        </div>

                                        <div className="form-group" style={{ marginBottom: "15px" }}>
                                            <label style={labelStyle}>Email</label>
                                            <input type="email" className="form-control" style={inputStyle} />
                                        </div>

                                        <div className="form-group" style={{ marginBottom: "15px" }}>
                                            <label style={labelStyle}>Password</label>
                                            <input type="password" className="form-control" style={inputStyle} />
                                        </div>

                                        <div className="form-group" style={{ marginBottom: "15px" }}>
                                            <label htmlFor="role" style={labelStyle}>Role</label>
                                            <select name="role" id="role" className="form-control" style={inputStyle} required>
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>

                                        <div style={{ textAlign: "right" }}>
                                            <button type="submit" className="btn btn-primary" style={btnStyle} >
                                                Add User
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           

        </Layout>
    );
}

export default AddUser;
