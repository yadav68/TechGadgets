import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { categoryAPI } from "../services/api";

const ProductCreate = ({ user, successMsg, errorMsg, error, onCreate, onLogout }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: ""
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (onCreate) onCreate(form, () => navigate('/products'));
  };

  if (loading) {
    return (
      <Layout title="Add New Product" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout}>
        <div>Loading categories...</div>
      </Layout>
    );
  }

  return (
    <Layout title="Add New Product" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout}>
      <h2>Add New Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" required value={form.name} onChange={handleChange} />
        <textarea name="description" placeholder="Description" required value={form.description} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" step="0.01" required value={form.price} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <select name="category" required value={form.category} onChange={handleChange} style={{ 
          padding: '1rem', 
          borderRadius: '8px', 
          background: '#1a1a2e', 
          color: '#fff',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          fontSize: '1rem'
        }}>
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <input type="number" name="stock" placeholder="Stock" min="0" value={form.stock} onChange={handleChange} />
        <button type="submit" className="btn">Add Product</button>
      </form>
      <Link to="/products" className="btn">Back to Products</Link>
    </Layout>
  );
};

export default ProductCreate; 