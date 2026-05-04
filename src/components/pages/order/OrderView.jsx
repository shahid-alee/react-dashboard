import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function OrderView() {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchOrderDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            
            if (!token) {
                console.log("No token found, redirecting to login");
                navigate('/login');
                return;
            }

            const res = await axios.get(`http://127.0.0.1:8000/api/order/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            
            console.log("Full API Response:", res.data);
            console.log("Order data:", res.data.data);
            console.log("Order items:", res.data.data.items);
            console.log("Order items length:", res.data.data.items?.length);
            
            setOrder(res.data.data);
        } catch (error) {
            console.log("ERROR STATUS:", error.response?.status);
            console.log("ERROR DATA:", error.response?.data);
            
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            } else if (error.response?.status === 404) {
                alert("Order not found!");
                navigate('/orders');
            } else {
                alert(error.response?.data?.message || "Error fetching order details");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchOrderDetails();
        }
    }, [id]);

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "delivered":
                return { backgroundColor: "#d4edda", color: "#155724", padding: "5px 10px", borderRadius: "4px", display: "inline-block" };
            case "pending":
                return { backgroundColor: "#fff3cd", color: "#856404", padding: "5px 10px", borderRadius: "4px", display: "inline-block" };
            case "processing":
                return { backgroundColor: "#cce5ff", color: "#004085", padding: "5px 10px", borderRadius: "4px", display: "inline-block" };
            case "shipped":
                return { backgroundColor: "#d1ecf1", color: "#0c5460", padding: "5px 10px", borderRadius: "4px", display: "inline-block" };
            case "cancelled":
                return { backgroundColor: "#f8d7da", color: "#721c24", padding: "5px 10px", borderRadius: "4px", display: "inline-block" };
            default:
                return { padding: "5px 10px", borderRadius: "4px", display: "inline-block" };
        }
    };

    const getPaymentStyle = (status) => {
        return status?.toLowerCase() === "paid"
            ? { backgroundColor: "#d4edda", color: "#155724", padding: "5px 10px", borderRadius: "4px", display: "inline-block" }
            : { backgroundColor: "#fff3cd", color: "#856404", padding: "5px 10px", borderRadius: "4px", display: "inline-block" };
    };

    if (loading) {
        return (
            <Layout>
                <div className="content-wrapper">
                    <div className="text-center mt-5">Loading order details...</div>
                </div>
            </Layout>
        );
    }

    if (!order) {
        return (
            <Layout>
                <div className="content-wrapper">
                    <div className="text-center mt-5">Order not found</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-6 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="card-title">Order Details</h4>
                                    <button 
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => navigate('/orders')}
                                    >
                                        Back to Orders
                                    </button>
                                </div>

                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th style={{ width: "40%" }}>Order ID</th>
                                            <td>#{order.id}</td>
                                        </tr>
                                        <tr>
                                            <th>Customer Name</th>
                                            <td>{order.first_name} {order.last_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{order.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Phone</th>
                                            <td>{order.phone}</td>
                                        </tr>
                                        <tr>
                                            <th>Address</th>
                                            <td>{order.address}</td>
                                        </tr>
                                        <tr>
                                            <th>Total</th>
                                            <td><strong>Rs {order.total}</strong></td>
                                        </tr>
                                        <tr>
                                            <th>Order Status</th>
                                            <td>
                                                <span style={getStatusStyle(order.order_status)}>
                                                    {order.order_status ? order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1) : 'N/A'}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Payment Method</th>
                                            <td>{order.payment_method ? order.payment_method.toUpperCase() : 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <th>Payment Status</th>
                                            <td>
                                                <span style={getPaymentStyle(order.payment_status)}>
                                                    {order.payment_status ? order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1) : 'N/A'}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Order Date</th>
                                            <td>{new Date(order.created_at).toLocaleString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Order Items</h4>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.items && order.items.length > 0 ? (
                                                order.items.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.product_name || item.name || item.product?.name || `Product #${item.product_id}` || 'N/A'}</td>
                                                        <td>Rs {item.price}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>Rs {parseFloat(item.price) * parseInt(item.quantity)}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center">
                                                        No items found for this order
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                        <tfoot>
                                            <tr style={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>
                                                <td colSpan="3" className="text-end">Total Amount:</td>
                                                <td>Rs {order.total}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default OrderView;