import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { orderAPI } from "../services/api";

const AdminOrders = ({ user, successMsg, errorMsg, error, onLogout, cartItemCount }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await orderAPI.getAll();
      setOrders(data.orders || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderAPI.updateStatus(orderId, newStatus);
      showToast('Order status updated successfully', 'success');
      fetchOrders();
    } catch (err) {
      showToast('Error updating order status', 'error');
    }
  };

  const handlePaymentStatusUpdate = async (orderId, newPaymentStatus) => {
    try {
      await orderAPI.updatePaymentStatus(orderId, newPaymentStatus);
      showToast('Payment status updated successfully', 'success');
      fetchOrders();
    } catch (err) {
      showToast('Error updating payment status', 'error');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'processing': return '#3b82f6';
      case 'shipped': return '#8b5cf6';
      case 'delivered': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'completed': return '#10b981';
      case 'failed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const showToast = (message, type) => {
    // This will be handled by the parent component
    console.log(`${type}: ${message}`);
  };

  if (loading) {
    return (
      <Layout title="Order Management" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
        <div>Loading orders...</div>
      </Layout>
    );
  }

  return (
    <Layout title="Order Management" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
      <h2>Order Management</h2>
      <div className="admin-actions" style={{ marginBottom: "2rem" }}>
        <Link to="/admin" className="btn">Back to Dashboard</Link>
      </div>

      {orders.length === 0 ? (
        <div className="cart-empty">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="admin-list">
          {orders.map(order => (
            <div className="admin-item" key={order._id} style={{ 
              background: 'rgba(15, 15, 35, 0.8)', 
              padding: '1.5rem', 
              borderRadius: '12px', 
              marginBottom: '1rem',
              border: '1px solid rgba(99, 102, 241, 0.2)'
            }}>
              <div className="admin-item-info">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h4>Order #{order.orderNumber}</h4>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ 
                      color: getStatusColor(order.status), 
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }}>
                      {order.status}
                    </p>
                    <p style={{ 
                      color: getPaymentStatusColor(order.paymentStatus), 
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }}>
                      Payment: {order.paymentStatus}
                    </p>
                  </div>
                </div>
                
                <p><strong>Customer:</strong> {order.user?.username} ({order.user?.email})</p>
                <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                
                <div style={{ marginTop: '1rem' }}>
                  <h5>Items:</h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {order.items.map((item, index) => (
                      <div key={index} style={{ 
                        background: 'rgba(99, 102, 241, 0.1)', 
                        padding: '0.5rem', 
                        borderRadius: '8px',
                        minWidth: '200px'
                      }}>
                        <p><strong>{item.name}</strong></p>
                        <p>Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                        <p>Subtotal: ${(item.quantity * item.price).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h5>Shipping Address:</h5>
                  <p>
                    {order.shippingAddress.street}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                    {order.shippingAddress.country}
                  </p>
                </div>
              </div>
              
              <div className="admin-item-actions" style={{ marginTop: '1rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ marginRight: '0.5rem' }}>Order Status:</label>
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    style={{ 
                      padding: '0.5rem', 
                      borderRadius: '6px', 
                      background: '#1a1a2e', 
                      color: '#fff',
                      border: '1px solid rgba(99, 102, 241, 0.3)'
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ marginRight: '0.5rem' }}>Payment Status:</label>
                  <select 
                    value={order.paymentStatus} 
                    onChange={(e) => handlePaymentStatusUpdate(order._id, e.target.value)}
                    style={{ 
                      padding: '0.5rem', 
                      borderRadius: '6px', 
                      background: '#1a1a2e', 
                      color: '#fff',
                      border: '1px solid rgba(99, 102, 241, 0.3)'
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                
                <Link to={`/orders/${order._id}`} className="btn">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default AdminOrders; 