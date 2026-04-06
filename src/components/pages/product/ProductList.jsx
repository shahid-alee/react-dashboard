import React from "react";
import Layout from "../../layout/Layout";

function Product() {
    const Products = [
        { id: 1, name: "Galaxy S24 Ultra", category: "mobile", subCategory: "samsung", qty: 50, desc: "Latest Samsung flagship with AI features." },
        { id: 2, name: "MacBook Pro M3", category: "laptop", subCategory: "apple", qty: 15, desc: "Powerful laptop for professionals." },
        { id: 3, name: "WH-1000XM5", category: "electronics", subCategory: "sony", qty: 30, desc: "Industry leading noise canceling headphones." },
        { id: 4, name: "iPhone 15 Pro", category: "mobile", subCategory: "apple", qty: 25, desc: "Titanium design with A17 Pro chip." },
        { id: 5, name: "Speedy 30 Bag", category: "fashion", subCategory: "LV", qty: 10, desc: "Iconic luxury handbag from Louis Vuitton." }
    ];

    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this product?")) {
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
                                        <h4 className="card-title">Products Table</h4>
                                        <a href="#" className="btn btn-primary btn-rounded btn-fw">
                                            Add New Product
                                        </a>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Product Name</th>
                                                    <th>Category</th>
                                                    <th>Sub-Category</th>
                                                    <th>Quantity</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {Products.map((product) => (
                                                    <tr key={product.id}>
                                                        <td>{product.id}</td>
                                                        <td>{product.name}</td>
                                                        <td>{product.category}</td>
                                                        <td>{product.subCategory}</td>
                                                        <td>{product.qty}</td>
                                                        <td>
                                                            <a href={`/edit/${product.id}`} style={{ marginRight: "5px" }}>
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

export default Product;
