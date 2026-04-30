import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Orders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/orders");
            setOrders(res.data.data || []);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case "delivered":
                return { backgroundColor: "#d4edda", color: "#155724", padding: "5px 10px", borderRadius: "4px" };
            case "pending":
                return { backgroundColor: "#fff3cd", color: "#856404", padding: "5px 10px", borderRadius: "4px" };
            case "shipped":
                return { backgroundColor: "#d1ecf1", color: "#0c5460", padding: "5px 10px", borderRadius: "4px" };
            case "cancelled":
                return { backgroundColor: "#f8d7da", color: "#721c24", padding: "5px 10px", borderRadius: "4px" };
            default:
                return {};
        }
    };

    const getPaymentStyle = (status) => {
        return status === "paid"
            ? { backgroundColor: "#d4edda", color: "#155724", padding: "5px 10px", borderRadius: "4px" }
            : { backgroundColor: "#fff3cd", color: "#856404", padding: "5px 10px", borderRadius: "4px" };
    };

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="card">
                    <div className="card-body">
                        <h4>Orders Management</h4>

                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Customer</th>
                                        <th>Email</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Payment</th>
                                        <th>Items</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.length > 0 ? (
                                        orders.map((order) => (
                                            <tr key={order.id}>
                                                <td>#{order.id}</td>

                                                <td>
                                                    {order.first_name} {order.last_name}
                                                </td>

                                                <td>{order.email}</td>

                                                <td>Rs {order.total}</td>

                                                <td>
                                                    <span style={getStatusStyle(order.order_status)}>
                                                        {order.order_status}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span style={getPaymentStyle(order.payment_status)}>
                                                        {order.payment_status}
                                                    </span>
                                                </td>

                                                <td>
                                                    {order.items?.length || 0} Items
                                                </td>

                                                <td>
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </td>

                                                <td>
                                                    <button
                                                        className="btn btn-info btn-sm"
                                                        onClick={() => navigate(`/order/${order.id}`)}
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center">
                                                No Orders Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Orders;