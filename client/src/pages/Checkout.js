import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { cartAPI, orderAPI } from "../services/api";

const Checkout = ({ user, successMsg, errorMsg, error, onLogout, cartItemCount, onClearCart }) => {
  const [cart, setCart] = useState({ cart: [], total: 0 });

  const getTotal = () => {
    return typeof cart.total === 'string' ? parseFloat(cart.total) : cart.total;
  };
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await cartAPI.getCart();
      setCart(data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // Validate shipping address
    const requiredFields = ['street', 'city', 'state', 'zipCode', 'country'];
    for (const field of requiredFields) {
      if (!shippingAddress[field].trim()) {
        alert(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }

    setProcessing(true);

    try {
      // Convert cart items to order format
      const orderItems = cart.cart.map(item => ({
        productId: item._id,
        quantity: item.quantity
      }));

      const orderData = {
        items: orderItems,
        shippingAddress,
        paymentMethod
      };

      await orderAPI.create(orderData);
      
      // Clear cart after successful order
      if (onClearCart) {
        await onClearCart();
      }
      
      // Redirect to orders page
      navigate('/orders');
    } catch (err) {
      console.error('Error creating order:', err);
      alert(err.message || 'Error creating order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Layout title="Checkout" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
        <div>Loading checkout...</div>
      </Layout>
    );
  }

  if (cart.cart.length === 0) {
    return (
      <Layout title="Checkout" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart before checkout.</p>
          <Link to="/products" className="btn">Continue Shopping</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Checkout" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout} cartItemCount={cartItemCount}>
      <h2>Checkout</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Order Summary */}
        <div style={{ background: 'rgba(15, 15, 35, 0.8)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
          <h3>Order Summary</h3>
          <div style={{ marginTop: '1rem' }}>
            {cart.cart.map((item, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1rem 0',
                borderBottom: '1px solid rgba(99, 102, 241, 0.2)'
              }}>
                <div>
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '1rem 0',
              borderTop: '2px solid rgba(99, 102, 241, 0.3)',
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}>
              <span>Total:</span>
                             <span>${getTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div style={{ background: 'rgba(15, 15, 35, 0.8)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
          <h3>Shipping Information</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Street Address:</label>
              <input
                type="text"
                name="street"
                value={shippingAddress.street}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  background: '#1a1a2e',
                  color: '#fff',
                  border: '1px solid rgba(99, 102, 241, 0.3)'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>City:</label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: '#1a1a2e',
                    color: '#fff',
                    border: '1px solid rgba(99, 102, 241, 0.3)'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>State:</label>
                <input
                  type="text"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: '#1a1a2e',
                    color: '#fff',
                    border: '1px solid rgba(99, 102, 241, 0.3)'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>ZIP Code:</label>
                <input
                  type="text"
                  name="zipCode"
                  value={shippingAddress.zipCode}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: '#1a1a2e',
                    color: '#fff',
                    border: '1px solid rgba(99, 102, 241, 0.3)'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Country:</label>
                <input
                  type="text"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: '#1a1a2e',
                    color: '#fff',
                    border: '1px solid rgba(99, 102, 241, 0.3)'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Payment Method:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  background: '#1a1a2e',
                  color: '#fff',
                  border: '1px solid rgba(99, 102, 241, 0.3)'
                }}
              >
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cash_on_delivery">Cash on Delivery</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/cart" className="btn" style={{ flex: 1 }}>
                Back to Cart
              </Link>
              <button
                type="submit"
                className="btn"
                disabled={processing}
                style={{ 
                  flex: 1, 
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  opacity: processing ? 0.7 : 1
                }}
              >
                                 {processing ? 'Processing...' : `Place Order - $${getTotal().toFixed(2)}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout; 