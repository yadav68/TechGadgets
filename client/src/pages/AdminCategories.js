import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { categoryAPI } from "../services/api";

const AdminCategories = ({ user, successMsg, errorMsg, error, onLogout, cartItemCount }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    isActive: true
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryAPI.getAll();
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await categoryAPI.update(editingCategory._id, form);
        showToast('Category updated successfully', 'success');
      } else {
        await categoryAPI.create(form);
        showToast('Category created successfully', 'success');
      }
      setForm({ name: "", description: "", isActive: true });
      setEditingCategory(null);
      setShowForm(false);
      fetchCategories();
    } catch (err) {
      showToast('Error saving category', 'error');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setForm({
      name: category.name,
      description: category.description || "",
      isActive: category.isActive
    });
    setShowForm(true);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryAPI.delete(categoryId);
        showToast('Category deleted successfully', 'success');
        fetchCategories();
      } catch (err) {
        showToast('Error deleting category', 'error');
      }
    }
  };

  const showToast = (message, type) => {
    // This will be handled by the parent component
    console.log(`${type}: ${message}`);
  };

  if (loading) {
    return (
      <Layout title="Category Management" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
        <div>Loading categories...</div>
      </Layout>
    );
  }

  return (
    <Layout title="Category Management" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
      <h2>Category Management</h2>
      <div className="admin-actions" style={{ marginBottom: "2rem" }}>
        <Link to="/admin" className="btn">Back to Dashboard</Link>
        <button className="btn" onClick={() => setShowForm(true)}>Add New Category</button>
      </div>

      {showForm && (
        <div className="category-form" style={{ 
          background: 'rgba(15, 15, 35, 0.8)', 
          padding: '2rem', 
          borderRadius: '12px', 
          marginBottom: '2rem',
          border: '1px solid rgba(99, 102, 241, 0.2)'
        }}>
          <h3>{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
          <form onSubmit={handleSubmit} className="product-form">
            <input
              type="text"
              name="name"
              placeholder="Category Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <textarea
              name="description"
              placeholder="Description (optional)"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label>
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                />
                Active
              </label>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn">
                {editingCategory ? 'Update Category' : 'Create Category'}
              </button>
              <button 
                type="button" 
                className="btn btn-danger" 
                onClick={() => {
                  setShowForm(false);
                  setEditingCategory(null);
                  setForm({ name: "", description: "", isActive: true });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {categories.length === 0 ? (
        <div className="cart-empty">
          <p>No categories found.</p>
          <button className="btn" onClick={() => setShowForm(true)}>Add Your First Category</button>
        </div>
      ) : (
        <div className="admin-list">
          {categories.map(category => (
            <div className="admin-item" key={category._id}>
              <div className="admin-item-info">
                <h4>{category.name}</h4>
                <p>{category.description || 'No description'}</p>
                <p><strong>Status:</strong> {category.isActive ? 'Active' : 'Inactive'}</p>
                <p><strong>Created:</strong> {new Date(category.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="admin-item-actions">
                <button className="btn" onClick={() => handleEdit(category)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(category._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default AdminCategories; 