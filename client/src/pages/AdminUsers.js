import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { adminAPI } from "../services/api";

const AdminUsers = ({ user, successMsg, errorMsg, error, onToggleAdmin, onDelete, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await adminAPI.getUsers();
      setUsers(data.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAdmin = async (userId) => {
    await onToggleAdmin(userId);
    fetchUsers(); // Refresh the users list
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await onDelete(userId);
      fetchUsers(); // Refresh the users list
    }
  };

  if (loading) {
    return (
      <Layout title="User Management" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout}>
        <div>Loading users...</div>
      </Layout>
    );
  }

  return (
    <Layout title="User Management" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout}>
      <h2>User Management</h2>
      <div className="admin-actions" style={{ marginBottom: "2rem" }}>
        <Link to="/admin" className="btn">Back to Dashboard</Link>
      </div>
      {users.length === 0 ? (
        <div className="cart-empty">
          <p>No users found.</p>
        </div>
      ) : (
        <div className="admin-list">
          {users.map(u => (
            <div className="admin-item" key={u._id}>
              <div className="admin-item-info">
                <h4>{u.username}</h4>
                <p>{u.email}</p>
                <p><strong>Role:</strong> {u.isAdmin ? 'Admin' : 'User'}</p>
                <p><strong>Joined:</strong> {new Date(u.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="admin-item-actions">
                <button className="btn" onClick={() => handleToggleAdmin(u._id)}>
                  {u.isAdmin ? 'Remove Admin' : 'Make Admin'}
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(u._id)}>
                  Delete User
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default AdminUsers; 