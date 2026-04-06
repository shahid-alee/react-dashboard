import React from "react";
import Layout from "../../layout/Layout";

function Orders() {
    // 5 Dummy Orders
    const orders = [
        { id: "ORD-001", customer: "Zeeshan Khan", date: "2024-03-15", total: "$540.00", status: "Delivered", payment: "Credit Card" },
        { id: "ORD-002", customer: "Ayesha Ahmed", date: "2024-03-16", total: "$1,200.00", status: "Pending", payment: "PayPal" },
        { id: "ORD-003", customer: "Bilal Malik", date: "2024-03-17", total: "$85.00", status: "Shipped", payment: "Cash on Delivery" },
        { id: "ORD-004", customer: "Sana Gul", date: "2024-03-18", total: "$210.00", status: "Cancelled", payment: "Credit Card" },
        { id: "ORD-005", customer: "Omar Farooq", date: "2024-03-19", total: "$450.00", status: "Delivered", payment: "Bank Transfer" }
    ];

    // Function to return color based on order status
    const getStatusStyle = (status) => {
        switch (status) {
            case "Delivered": return { backgroundColor: "#d4edda", color: "#155724", padding: "5px 10px", borderRadius: "4px" };
            case "Pending": return { backgroundColor: "#fff3cd", color: "#856404", padding: "5px 10px", borderRadius: "4px" };
            case "Shipped": return { backgroundColor: "#d1ecf1", color: "#0c5460", padding: "5px 10px", borderRadius: "4px" };
            case "Cancelled": return { backgroundColor: "#f8d7da", color: "#721c24", padding: "5px 10px", borderRadius: "4px" };
            default: return {};
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
                                        <h4 className="card-title">Orders Management</h4>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th>Customer</th>
                                                    <th>Date</th>
                                                    <th>Total</th>
                                                    <th>Status</th>
                                                    <th>Payment</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {orders.map((order) => (
                                                    <tr key={order.id}>
                                                        <td style={{ fontWeight: "bold" }}>{order.id}</td>
                                                        <td>{order.customer}</td>
                                                        <td>{order.date}</td>
                                                        <td>{order.total}</td>
                                                        <td>
                                                            <span style={getStatusStyle(order.status)}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td>{order.payment}</td>
                                                        <td>
                                                            <button className="btn btn-info btn-sm btn-rounded" style={{ marginRight: "5px" }}>
                                                                View
                                                            </button>
                                                            <button className="btn btn-outline-danger btn-sm btn-rounded">
                                                                Cancel
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
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

export default Orders;
