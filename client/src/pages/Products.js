import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { productsAPI } from "../services/api";

const Products = ({ user, successMsg, errorMsg, error, onDelete, onLogout, cartItemCount }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productsAPI.getAll();
      setProducts(data.products || []);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await onDelete(productId);
      // Refresh the products list
      fetchProducts();
    }
  };

  // Group products by category for admin view
  const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});
  };

  if (loading) {
    return (
      <Layout title="Products" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
        <div>Loading products...</div>
      </Layout>
    );
  }

  return (
    <Layout title="Products" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
      <h2>All Products</h2>
      {user && user.isAdmin && (
        <Link to="/products/new" className="btn" style={{ marginBottom: "1.5rem" }}>+ Add Product</Link>
      )}
      {user && user.isAdmin ? (
        // Admin: Grouped by category
        Object.entries(groupByCategory(products)).map(([category, catProducts]) => (
          <div className="category-section" key={category} style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ marginBottom: '1.2rem', color: '#8b5cf6' }}>{category}</h3>
            <div className="products-list">
              {catProducts.map(product => (
                <div className="product-card" key={product._id}>
                  <span className="price-badge">${product.price.toFixed(2)}</span>
                  <Link to={`/products/${product._id}`}>
                    {product.image && <img src={product.image} alt={product.name} className="product-img" />}
                    <h3>{product.name}</h3>
                  </Link>
                  {user && user.isAdmin && (
                    <div className="product-actions">
                      <Link to={`/products/${product._id}/edit`} className="btn">Edit</Link>
                      <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        // Non-admin: Flat list
        <div className="products-list">
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            products.map(product => (
              <div className="product-card" key={product._id}>
                <span className="price-badge">${product.price.toFixed(2)}</span>
                <Link to={`/products/${product._id}`}>
                  {product.image && <img src={product.image} alt={product.name} className="product-img" />}
                  <h3>{product.name}</h3>
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </Layout>
  );
};

export default Products; 