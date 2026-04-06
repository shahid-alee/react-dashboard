import React from "react";
import Layout from "../../layout/Layout";

function AddProduct() {

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
                                <h4 className="card-title">Add New Product</h4>

                                <form>
                                    <div className="form-group" style={{ marginBottom: "15px" }}>
                                        <label style={labelStyle}>product Name</label>
                                        <input type="text" className="form-control" style={inputStyle} />
                                    </div>

                                    <div className="form-group" style={{ marginBottom: "15px" }}>
                                        <label style={labelStyle}>product Image</label>
                                        <input type="file" className="form-control" style={inputStyle} />
                                    </div>

                                    <div className="form-group" style={{ marginBottom: "15px" }}>
                                        <label style={labelStyle}>Quantity</label>
                                        <input type="text" className="form-control" style={inputStyle} />
                                    </div>

                                    <div className="form-group" style={{ marginBottom: "15px" }}>
                                        <label htmlFor="role" style={labelStyle}>category</label>
                                        <select name="role" id="role" className="form-control" style={inputStyle} required>
                                            <option value="user">mobile</option>
                                            <option value="admin">laptop</option>
                                            <option value="user">electronics</option>
                                            <option value="admin">fashion</option>

                                        </select>
                                    </div>

                                    <div className="form-group" style={{ marginBottom: "15px" }}>
                                        <label htmlFor="role" style={btnStyle}>Sub-category</label>
                                        <select name="role" id="role" className="form-control" style={inputStyle} required>
                                            <option value="samsung">samsung</option>
                                            <option value="apple">apple</option>
                                            <option value="sony">sony</option>
                                            <option value="LV">LV</option>

                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label style={btnStyle}>Description</label>
                                       <textarea name="description" class="form-control" style={{height:"150px" , backgroundColor:"white" ,border:"1px solid #ccc"}}></textarea>
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

export default AddProduct;
