import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { adminAPI } from "../services/api";

const AdminDashboard = ({ user, successMsg, errorMsg, error, onToggleAdmin, onLogout }) => {
  const [dashboardData, setDashboardData] = useState({
    products: [],
    users: [],
    totalProducts: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await adminAPI.getDashboard();
      setDashboardData(data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout title="Admin Dashboard" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout}>
        <div>Loading dashboard...</div>
      </Layout>
    );
  }

  return (
    <Layout title="Admin Dashboard" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout}>
      <h2>Admin Dashboard</h2>
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-number">{dashboardData.totalProducts}</p>
          <Link to="/admin/products" className="btn">Manage Products</Link>
        </div>
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-number">{dashboardData.totalUsers}</p>
          <Link to="/admin/users" className="btn">Manage Users</Link>
        </div>
        <div className="stat-card">
          <h3>Total Categories</h3>
          <p className="stat-number">{dashboardData.totalCategories || 0}</p>
          <Link to="/admin/categories" className="btn">Manage Categories</Link>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-number">{dashboardData.totalOrders || 0}</p>
          <Link to="/admin/orders" className="btn">Manage Orders</Link>
        </div>
      </div>
      <div className="admin-sections">
        <div className="admin-section">
          <h3>Recent Products</h3>
          {dashboardData.products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="admin-list">
              {dashboardData.products.map(product => (
                <div className="admin-item" key={product._id}>
                  <div className="admin-item-info">
                    <h4>{product.name}</h4>
                    <p>${product.price.toFixed(2)} - {product.category?.name || 'No Category'}</p>
                  </div>
                  <div className="admin-item-actions">
                    <Link to={`/products/${product._id}`} className="btn">View</Link>
                    <Link to={`/products/${product._id}/edit`} className="btn">Edit</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="admin-section">
          <h3>Recent Users</h3>
          {dashboardData.users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div className="admin-list">
              {dashboardData.users.map(u => (
                <div className="admin-item" key={u._id}>
                  <div className="admin-item-info">
                    <h4>{u.username}</h4>
                    <p>{u.email} - {u.isAdmin ? 'Admin' : 'User'}</p>
                  </div>
                  <div className="admin-item-actions">
                    <button className="btn" onClick={() => onToggleAdmin(u._id)}>
                      {u.isAdmin ? 'Remove Admin' : 'Make Admin'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="admin-actions">
        <Link to="/products/new" className="btn">Add New Product</Link>
        <Link to="/admin/products" className="btn">View All Products</Link>
        <Link to="/admin/users" className="btn">View All Users</Link>
        <Link to="/admin/categories" className="btn">Manage Categories</Link>
        <Link to="/admin/orders" className="btn">Manage Orders</Link>
      </div>
    </Layout>
  );
};

export default AdminDashboard; 