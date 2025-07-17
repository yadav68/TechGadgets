import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";

const ProductCreate = ({ user, successMsg, errorMsg, error, onCreate, onLogout }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: ""
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (onCreate) onCreate(form, () => navigate('/products'));
  };

  return (
    <Layout title="Add New Product" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout}>
      <h2>Add New Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" required value={form.name} onChange={handleChange} />
        <textarea name="description" placeholder="Description" required value={form.description} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" step="0.01" required value={form.price} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" required value={form.category} onChange={handleChange} />
        <input type="number" name="stock" placeholder="Stock" min="0" value={form.stock} onChange={handleChange} />
        <button type="submit" className="btn">Add Product</button>
      </form>
      <Link to="/products" className="btn">Back to Products</Link>
    </Layout>
  );
};

export default ProductCreate; 