import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { cartAPI } from "../services/api";

const Cart = ({ user, successMsg, errorMsg, error, onUpdate, onRemove, onClear, onCheckout, onLogout, cartItemCount }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await cartAPI.getCart();
      setCart(data.cart || []);
      calculateTotal(data.cart || []);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (cartItems) => {
    const newTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    // Update local state immediately for instant UI feedback
    const updatedCart = cart.map(item => 
      item._id === productId ? { ...item, quantity: parseInt(newQuantity) } : item
    );
    setCart(updatedCart);
    calculateTotal(updatedCart);
    
    // Set updating state for this item
    setUpdating(prev => ({ ...prev, [productId]: true }));
    
    try {
      await onUpdate(productId, parseInt(newQuantity));
    } catch (err) {
      // Revert on error
      fetchCart();
    } finally {
      setUpdating(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleRemove = async (productId) => {
    await onRemove(productId);
    fetchCart(); // Refresh cart data
  };

  const handleClear = async () => {
    await onClear();
    fetchCart(); // Refresh cart data
  };

  if (loading) {
    return (
      <Layout title="Cart" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
        <div>Loading cart...</div>
      </Layout>
    );
  }

  return (
    <Layout title="Cart" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/products" className="btn">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cart.map(item => (
              <div className="cart-item" key={item._id}>
                <div className="cart-item-image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  <div className="cart-item-quantity">
                    <label htmlFor={`quantity-${item._id}`}>Quantity:</label>
                    <input
                      type="number"
                      id={`quantity-${item._id}`}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                      min="1"
                      max="99"
                      style={{ width: '60px', margin: '0 10px' }}
                      disabled={updating[item._id]}
                    />
                    {updating[item._id] && <span style={{ color: '#6366f1', fontSize: '0.8rem' }}>Updating...</span>}
                  </div>
                  <p className="cart-item-subtotal">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="cart-item-actions">
                  <button className="btn btn-danger" onClick={() => handleRemove(item._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="cart-total">
              <strong>Total: ${total.toFixed(2)}</strong>
            </div>
            <div className="cart-actions">
              <Link to="/products" className="btn">Continue Shopping</Link>
              <button className="btn btn-danger" onClick={handleClear}>Clear Cart</button>
              <button className="btn" style={{ background: 'linear-gradient(135deg, #28a745, #20c997)' }} onClick={onCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Cart; 