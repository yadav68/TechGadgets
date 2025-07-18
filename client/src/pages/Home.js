import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { getHomeData } from "../services/api";

const Home = ({ user, successMsg, errorMsg, error, onLogout, cartItemCount, onAddToCart }) => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getHomeData();
      setProductsByCategory(data.productsByCategory || {});
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = (productId) => {
    if (onAddToCart) {
      onAddToCart(productId);
    }
  };

  if (loading) {
    return (
      <Layout title="Home" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
        <div>Loading products...</div>
      </Layout>
    );
  }

  return (
    <Layout title="Home" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
      <section className="hero" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', background: 'linear-gradient(90deg, #e0eafc 0%, #cfdef3 100%)', borderRadius: '16px', margin: '2rem auto', maxWidth: '700px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', padding: '3rem 2rem'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#222' }}>Welcome to Tech Gadgets!</h2>
        <p style={{ fontSize: '1.3rem', color: '#444', marginBottom: '2rem' }}>
          Your one-stop shop for the latest gadgets and accessories.<br />
          Discover, shop, and enjoy the best in tech.
        </p>
        <Link to="/products" className="btn" style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }}>Shop Now</Link>
      </section>
      
      <section style={{ marginTop: '2rem' }}>
        {Object.keys(productsByCategory).length > 0 ? (
          Object.entries(productsByCategory).map(([category, products]) => (
            <div className="category-section" key={category}>
              <h3>{category}</h3>
              <div className="products-list">
                {products.map(product => (
                  <div className="product-card" key={product._id}>
                    <span className="price-badge">${product.price.toFixed(2)}</span>
                    <Link to={`/products/${product._id}`}>
                      {product.image && (
                        <img src={product.image} alt={product.name} className="product-img" />
                      )}
                      <h3>{product.name}</h3>
                    </Link>
                    <p>
                      {product.description && product.description.length > 60 
                        ? `${product.description.substring(0, 60)}...` 
                        : product.description}
                    </p>
                    <div className="product-actions">
                      <Link to={`/products/${product._id}`} className="btn">
                        View Details
                      </Link>
                      <button 
                        className="btn" 
                        style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                        onClick={() => handleBuyNow(product._id)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#cbd5e1' }}>
            <h3>No products available.</h3>
            <p>Check back soon for new arrivals!</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Home; 