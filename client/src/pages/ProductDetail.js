import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { productsAPI } from "../services/api";

const ProductDetail = ({ user, successMsg, errorMsg, error, onAddToCart, onDelete, onLogout, cartItemCount }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await productsAPI.getById(id);
      setProduct(data.product);
      // Fetch related products from the same category
      if (data.product && data.product.category) {
        fetchRelatedProducts(data.product.category, data.product._id);
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (category, currentProductId) => {
    try {
      const data = await productsAPI.getAll();
      const related = data.products.filter(p => 
        p.category?._id === category?._id && p._id !== currentProductId
      );
      setRelatedProducts(related.slice(0, 4)); // Show max 4 related products
    } catch (err) {
      console.error('Error fetching related products:', err);
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
      <Layout title="Product Detail" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
        <div>Loading product...</div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout title="Product Not Found" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
        <div>Product not found.</div>
      </Layout>
    );
  }

  return (
    <Layout title={product.name} user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
      <div className="product-detail">
        <h2>{product.name}</h2>
        {product.image && <img src={product.image} alt={product.name} className="product-img-large" />}
        <p>{product.description}</p>
        <p><strong>Category:</strong> {product.category?.name || 'Uncategorized'}</p>
        <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
        <div className="product-detail-actions">
          <button className="btn" onClick={() => onAddToCart(product._id)}>Add to Cart</button>
          {user && user.isAdmin && (
            <>
              <Link to={`/products/${product._id}/edit`} className="btn">Edit</Link>
              <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </>
          )}
          <Link to="/products" className="btn">Back to Products</Link>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section" style={{ marginTop: '3rem' }}>
          <h3 style={{ 
            marginBottom: '1.5rem', 
            color: '#8b5cf6', 
            fontSize: '1.8rem', 
            fontWeight: '600',
            textAlign: 'center'
          }}>
            More from {product.category?.name || 'Uncategorized'}
          </h3>
          <div className="products-list">
            {relatedProducts.map(relatedProduct => (
              <div className="product-card" key={relatedProduct._id}>
                <span className="price-badge">${relatedProduct.price.toFixed(2)}</span>
                <Link to={`/products/${relatedProduct._id}`}>
                  {relatedProduct.image && <img src={relatedProduct.image} alt={relatedProduct.name} className="product-img" />}
                  <h3>{relatedProduct.name}</h3>
                </Link>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  {relatedProduct.description && relatedProduct.description.length > 60 
                    ? `${relatedProduct.description.substring(0, 60)}...` 
                    : relatedProduct.description}
                </p>
                <div className="product-actions">
                  <Link to={`/products/${relatedProduct._id}`} className="btn" style={{ flex: 1, marginRight: '0.5rem' }}>
                    View Details
                  </Link>
                  <button 
                    className="btn" 
                    style={{ flex: 1, background: 'linear-gradient(135deg, #10b981, #059669)' }}
                    onClick={() => onAddToCart(relatedProduct._id)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDetail; 