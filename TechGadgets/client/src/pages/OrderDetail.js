import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useParams } from "react-router-dom";
import { orderAPI } from "../services/api";

const OrderDetail = ({ user, successMsg, errorMsg, error, onLogout, cartItemCount }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const data = await orderAPI.getById(id);
      setOrder(data.order);
    } catch (err) {
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await orderAPI.cancel(id);
        alert('Order cancelled successfully');
        fetchOrder();
      } catch (err) {
        alert('Error cancelling order: ' + err.message);
      }
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

  if (loading) {
    return (
      <Layout title="Order Details" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
        <div>Loading order details...</div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout title="Order Not Found" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
        <div className="cart-empty">
          <h2>Order Not Found</h2>
          <p>The order you're looking for doesn't exist or you don't have permission to view it.</p>
          <Link to="/orders" className="btn">Back to Orders</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Order #${order.orderNumber}`} user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
      <h2>Order #{order.orderNumber}</h2>
      
      <div className="admin-actions" style={{ marginBottom: "2rem" }}>
        <Link to="/orders" className="btn">Back to Orders</Link>
        {order.status === 'pending' && (
          <button className="btn btn-danger" onClick={handleCancelOrder}>
            Cancel Order
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Order Information */}
        <div style={{ background: 'rgba(15, 15, 35, 0.8)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
          <h3>Order Information</h3>
          <div style={{ marginTop: '1rem' }}>
            <p><strong>Order Number:</strong> {order.orderNumber}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {new Date(order.createdAt).toLocaleTimeString()}</p>
            <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
            
            <div style={{ marginTop: '1rem' }}>
              <p style={{ 
                color: getStatusColor(order.status), 
                fontWeight: 'bold',
                textTransform: 'capitalize'
              }}>
                <strong>Status:</strong> {order.status}
              </p>
              <p style={{ 
                color: getPaymentStatusColor(order.paymentStatus), 
                fontWeight: 'bold',
                textTransform: 'capitalize'
              }}>
                <strong>Payment Status:</strong> {order.paymentStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div style={{ background: 'rgba(15, 15, 35, 0.8)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
          <h3>Shipping Address</h3>
          <div style={{ marginTop: '1rem' }}>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div style={{ background: 'rgba(15, 15, 35, 0.8)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)', marginTop: '2rem' }}>
        <h3>Order Items</h3>
        <div style={{ marginTop: '1rem' }}>
          {order.items.map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center',
              padding: '1rem',
              marginBottom: '1rem',
              background: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '8px'
            }}>
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    marginRight: '1rem'
                  }} 
                />
              )}
              <div style={{ flex: 1 }}>
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p><strong>Subtotal: ${(item.quantity * item.price).toFixed(2)}</strong></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Actions (if admin) */}
      {user && user.isAdmin && (
        <div style={{ background: 'rgba(15, 15, 35, 0.8)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)', marginTop: '2rem' }}>
          <h3>Admin Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Update Order Status:</label>
              <select 
                value={order.status} 
                onChange={async (e) => {
                  try {
                    await orderAPI.updateStatus(id, e.target.value);
                    fetchOrder();
                  } catch (err) {
                    alert('Error updating status: ' + err.message);
                  }
                }}
                style={{ 
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
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
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Update Payment Status:</label>
              <select 
                value={order.paymentStatus} 
                onChange={async (e) => {
                  try {
                    await orderAPI.updatePaymentStatus(id, e.target.value);
                    fetchOrder();
                  } catch (err) {
                    alert('Error updating payment status: ' + err.message);
                  }
                }}
                style={{ 
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
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
          </div>
        </div>
      )}
    </Layout>
  );
};

export default OrderDetail; 