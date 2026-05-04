import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function OrderEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    order_status: "",
  });

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      
      const token = localStorage.getItem("token");
      
      // Fixed: Changed from `/api/orders/${id}` to `/api/order/${id}` for consistency
      axios
        .get(`http://127.0.0.1:8000/api/order/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json',
          },
        })
        .then((res) => {
          const orderData = res.data.data;
          setOrder(orderData);
          setFormData({
            order_status: orderData.order_status,
          });
        })
        .catch((err) => {
          console.error(err);
          const errorMessage = err.response?.data?.message || "Failed to fetch order";
          alert(errorMessage);
          navigate("/orders");
        })
        .finally(() => setLoading(false));
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdating(true);

    const token = localStorage.getItem("token");
    
    // Fixed: Changed from `/api/order/${id}/status` to `/api/orders/${id}/status` 
    // to match typical REST conventions, or update your backend route
    const request = axios.put(
      `http://127.0.0.1:8000/api/orders/${id}/status`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    request
      .then(() => {
        alert("Order Status Updated Successfully");
        navigate("/orders");
      })
      .catch((err) => {
        console.error(err);
        const errorMessage = err.response?.data?.message || "Error occurred while updating order";
        alert(errorMessage);
      })
      .finally(() => setUpdating(false));
  };

  if (loading) {
    return (
      <Layout>
        <div className="content-wrapper">
          <div className="text-center mt-5">Loading...</div>
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
        <div className="card">
          <div className="card-body">
            <h4>Edit Order Status - #{order.id}</h4>

            <form onSubmit={handleSubmit}>
              {/* Customer Information - Readonly */}
              <div className="mb-3">
                <label className="form-label">Customer</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={`${order.first_name || ''} ${order.last_name || ''}`}
                  readOnly
                  style={{ backgroundColor: '#e9ecef' }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={order.email || ''}
                  readOnly
                  style={{ backgroundColor: '#e9ecef' }}
                />
              </div>

              {/* <div className="mb-3">
                <label className="form-label">Total Amount</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={`Rs ${order.total || 0}`}
                  readOnly
                  style={{ backgroundColor: '#e9ecef' }}
                />
              </div> */}

              <div className="mb-3">
                <label className="form-label">Current Status</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={order.order_status ? order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1) : 'N/A'}
                  readOnly
                  style={{ backgroundColor: '#e9ecef' }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Change Status</label>
                <select 
                  name="order_status" 
                  className="form-control" 
                  value={formData.order_status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="btn btn-success"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update Status"}
              </button>
              
              <button 
                type="button" 
                className="btn btn-secondary ms-2"
                onClick={() => navigate('/orders')}
              >
                Back
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default OrderEdit;