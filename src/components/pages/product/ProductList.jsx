import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Product() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

   const fetchProducts = async () => {
    try {
        const token = localStorage.getItem("token");
        
        const res = await axios.get(
            "http://127.0.0.1:8000/api/products",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        
        setProducts(res.data.data);
        
    } catch (error) {
        console.log("ERROR STATUS:", error.response?.status);
        console.log("ERROR DATA:", error.response?.data);
        console.log("ERROR MESSAGE:", error.response?.data?.message);
        console.log("FULL ERROR:", error.response?.data);
        
        // Show error to user
        alert(`Error: ${error.response?.data?.message || error.message}`);
    }
};


    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete product?")) return;

        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://127.0.0.1:8000/api/product/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchProducts();
        } catch (error) {
            console.log("DELETE ERROR:", error.response?.data || error.message);
        }
    };

    return (
        <Layout>
            <div className="content-wrapper">
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
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.length > 0 ? (
                                    products.map((p) => (
                                        <tr key={p.id}>
                                            <td>{p.id}</td>

                                            <td>
                                                {p.image && p.image.length > 0 ? (
                                                    <img
                                                        src={`http://127.0.0.1:8000/storage/${p.image[0]}`}
                                                        alt={p.product_name}
                                                        width="50"
                                                        height="50"
                                                        style={{
                                                            objectFit: "cover",
                                                            borderRadius: "5px"
                                                        }}
                                                    />
                                                ) : (
                                                    "No Image"
                                                )}
                                            </td>

                                            <td>{p.product_name}</td>

                                            <td>
                                                {p.category
                                                    ? p.category.category_name
                                                    : "N/A"}
                                            </td>

                                            <td>
                                                {p.subcategory
                                                    ? p.subcategory.sub_category_name
                                                    : "N/A"}
                                            </td>

                                            <td>Rs {p.price}</td>
                                            <td>{p.quantity}</td>

                                            <td>
                                                <button
                                                    className="btn btn-info btn-sm me-2"
                                                    onClick={() =>
                                                        navigate(`/edit-product/${p.id}`)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(p.id)}
                                                >
                                                    Delete
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
        </Layout>
    );
}

export default Product;