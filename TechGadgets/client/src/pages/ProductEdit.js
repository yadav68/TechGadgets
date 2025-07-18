import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { productsAPI, categoryAPI } from "../services/api";

const ProductEdit = ({ user, successMsg, errorMsg, error, onEdit, onDelete, onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: ""
  });

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await productsAPI.getById(id);
      setProduct(data.product);
      setForm({
        name: data.product.name || "",
        description: data.product.description || "",
        price: data.product.price || "",
        image: data.product.image || "",
        category: data.product.category?._id || data.product.category || "",
        stock: data.product.stock || ""
      });
    } catch (err) {
      console.error('Error fetching product:', err);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoryAPI.getAll();
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await onEdit({ ...form, _id: id });
    if (result.success) {
      navigate(`/products/${id}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await onDelete(id);
      navigate('/products');
    }
  };

  if (loading) {
    return (
      <Layout title="Edit Product" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout}>
        <div>Loading product...</div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout title="Product Not Found" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout}>
        <div>Product not found.</div>
      </Layout>
    );
  }

  return (
    <Layout title="Edit Product" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout}>
      <h2>Edit Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <input type="text" name="name" required value={form.name} onChange={handleChange} />
        <textarea name="description" required value={form.description} onChange={handleChange} />
        <input type="number" name="price" step="0.01" required value={form.price} onChange={handleChange} />
        <input type="text" name="image" value={form.image} onChange={handleChange} />
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
        <input type="number" name="stock" min="0" value={form.stock} onChange={handleChange} />
        <button type="submit" className="btn">Update Product</button>
      </form>
      <button className="btn btn-danger" style={{ marginTop: "1rem" }} onClick={handleDelete}>Delete Product</button>
      <Link to={`/products/${product._id}`} className="btn">Back to Product</Link>
    </Layout>
  );
};

export default ProductEdit; 