import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Product() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
    try {
        const res = await axios.get("http://localhost:8000/api/products");
        setProducts(res.data.data);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

    useEffect(() => {
        fetchProducts();
    }, []);


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.delete(`http://localhost:8000/api/product/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Delete failed:", error);
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

                                    <div className="d-flex justify-content-between mb-3">
                                        <h4>Products Table</h4>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => navigate("/add-product")}
                                        >
                                            Add Product
                                        </button>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Category</th>
                                                    <th>Sub Category</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {products.length > 0 ? (
                                                    products.map((product) => (
                                                        <tr key={product.id}>
                                                            <td>{product.id}</td>

                                                            <td>
                                                                {product.image && product.image.length > 0 && (
                                                                    <img
                                                                        src={`http://localhost:8000/storage/${product.image[0]}`}
                                                                        width="60"
                                                                        alt="product"
                                                                    />
                                                                )}
                                                            </td>

                                                            <td>{product.product_name}</td>
                                                            <td>
                                                                {product.category?.category_name || "N/A"}
                                                            </td>
                                                            <td>
                                                                {product.subcategory?.sub_category_name || "N/A"}
                                                            </td>
                                                            <td>Rs {product.price}</td>
                                                            <td>{product.quantity}</td>

                                                            <td>
                                                                <button className="btn btn-info btn-sm" onClick={() => navigate(`/edit-product/${product.id}`)}>EDIT</button>
                                                                <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/view-product/${product.id}`)}>VIEW</button>

                                                                <button
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() => handleDelete(product.id)}
                                                                >
                                                                    DELETE
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="8" className="text-center">
                                                            No Products Found
                                                        </td>
                                                    </tr>
                                                )}
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

export default Product;