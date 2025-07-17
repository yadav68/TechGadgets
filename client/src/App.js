import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ProductCreate from './pages/ProductCreate';
import ProductEdit from './pages/ProductEdit';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminUsers from './pages/AdminUsers';
import Toast from './components/Toast';
import { authAPI, productsAPI, cartAPI, adminAPI, getHomeData } from './services/api';
import './App.css';

// Wrapper components to handle route parameters
const ProductDetailWrapper = ({ user, successMsg, errorMsg, error, onAddToCart, onDelete, onLogout, cartItemCount }) => {
  const { id } = useParams();
  return <ProductDetail id={id} user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onAddToCart={onAddToCart} onDelete={onDelete} onLogout={onLogout} cartItemCount={cartItemCount} />;
};

const ProductEditWrapper = ({ user, successMsg, errorMsg, error, onEdit, onDelete, onLogout, cartItemCount }) => {
  const { id } = useParams();
  return <ProductEdit id={id} user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onEdit={onEdit} onDelete={onDelete} onLogout={onLogout} cartItemCount={cartItemCount} />;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  const [toast, setToast] = useState(null);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Hide toast notification
  const hideToast = () => {
    setToast(null);
  };

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch cart data when user changes
  useEffect(() => {
    if (user) {
      fetchCartData();
    } else {
      setCartItemCount(0);
    }
  }, [user]);

  const checkAuth = async () => {
    try {
      const data = await authAPI.getCurrentUser();
      setUser(data.user);
    } catch (err) {
      // User not authenticated, which is fine
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartData = async () => {
    try {
      const data = await cartAPI.getCart();
      console.log('Cart data:', data); // Debug log
      const totalItems = data.cart ? data.cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
      console.log('Total items:', totalItems); // Debug log
      setCartItemCount(totalItems);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCartItemCount(0);
    }
  };

  const handleLogin = async (credentials, callback) => {
    try {
      setError('');
      const data = await authAPI.login(credentials);
      setUser(data.user);
      setSuccessMsg(data.message);
      if (callback) callback(); // Redirect after successful login
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const handleRegister = async (userData) => {
    try {
      setError('');
      const data = await authAPI.register(userData);
      setSuccessMsg(data.message);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      showToast('Logged out successfully', 'success');
    } catch (err) {
      showToast('Error logging out', 'error');
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await cartAPI.addToCart(productId);
      showToast('Item added to cart', 'success');
      fetchCartData(); // Refresh cart count
    } catch (err) {
      showToast('Error adding item to cart', 'error');
    }
  };

  const handleUpdateCart = async (productId, quantity) => {
    try {
      await cartAPI.updateQuantity(productId, quantity);
      showToast('Cart updated', 'success');
      fetchCartData(); // Refresh cart count
    } catch (err) {
      showToast('Error updating cart', 'error');
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await cartAPI.removeFromCart(productId);
      showToast('Item removed from cart', 'success');
      fetchCartData(); // Refresh cart count
    } catch (err) {
      showToast('Error removing item from cart', 'error');
    }
  };

  const handleClearCart = async () => {
    try {
      await cartAPI.clearCart();
      showToast('Cart cleared', 'success');
      fetchCartData(); // Refresh cart count
    } catch (err) {
      showToast('Error clearing cart', 'error');
    }
  };

  const handleCheckout = () => {
    showToast('Checkout functionality coming soon!', 'warning');
  };

  const handleCreateProduct = async (productData, callback) => {
    try {
      await productsAPI.create(productData);
      showToast('Product created successfully', 'success');
      if (callback) callback(); // Redirect after successful creation
      return { success: true };
    } catch (err) {
      showToast('Error creating product', 'error');
      return { success: false, error: err.message };
    }
  };

  const handleEditProduct = async (productData) => {
    try {
      await productsAPI.update(productData._id, productData);
      showToast('Product updated successfully', 'success');
      return { success: true };
    } catch (err) {
      showToast('Error updating product', 'error');
      return { success: false, error: err.message };
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await productsAPI.delete(productId);
      showToast('Product deleted successfully', 'success');
    } catch (err) {
      showToast('Error deleting product', 'error');
    }
  };

  const handleToggleAdmin = async (userId) => {
    try {
      await adminAPI.toggleUserAdmin(userId);
      showToast('User admin status updated', 'success');
    } catch (err) {
      showToast('Error updating user admin status', 'error');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await adminAPI.deleteUser(userId);
      showToast('User deleted successfully', 'success');
    } catch (err) {
      showToast('Error deleting user', 'error');
    }
  };

  // Clear messages after 5 seconds
  useEffect(() => {
    if (successMsg || error) {
      const timer = setTimeout(() => {
        setSuccessMsg('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <Home 
              user={user}
              successMsg={successMsg}
              errorMsg={error}
              error=""
              onLogout={handleLogout}
              cartItemCount={cartItemCount}
              onAddToCart={handleAddToCart}
            />
          } />
          
          <Route path="/login" element={
            <Login 
              user={user}
              successMsg={successMsg}
              errorMsg={error}
              error=""
              onLogin={handleLogin}
              onLogout={handleLogout}
              cartItemCount={cartItemCount}
            />
          } />
          
          <Route path="/register" element={
            <Register 
              user={user}
              successMsg={successMsg}
              errorMsg={error}
              error=""
              onRegister={handleRegister}
              onLogout={handleLogout}
              cartItemCount={cartItemCount}
            />
          } />
          
          <Route path="/products" element={
            <Products 
              user={user}
              successMsg={successMsg}
              errorMsg={error}
              error=""
              onDelete={handleDeleteProduct}
              onLogout={handleLogout}
              cartItemCount={cartItemCount}
            />
          } />
          
          <Route path="/products/:id" element={<ProductDetailWrapper user={user} successMsg={successMsg} errorMsg={error} error="" onAddToCart={handleAddToCart} onDelete={handleDeleteProduct} onLogout={handleLogout} cartItemCount={cartItemCount} />} />
          
          <Route path="/products/new" element={
            <ProductCreate 
              user={user}
              successMsg={successMsg}
              errorMsg={error}
              error=""
              onCreate={handleCreateProduct}
              onLogout={handleLogout}
              cartItemCount={cartItemCount}
            />
          } />
          
          <Route path="/products/:id/edit" element={<ProductEditWrapper user={user} successMsg={successMsg} errorMsg={error} error="" onEdit={handleEditProduct} onDelete={handleDeleteProduct} onLogout={handleLogout} cartItemCount={cartItemCount} />} />
          
          <Route path="/cart" element={
            <Cart 
              user={user}
              successMsg={successMsg}
              errorMsg={error}
              error=""
              onUpdate={handleUpdateCart}
              onRemove={handleRemoveFromCart}
              onClear={handleClearCart}
              onCheckout={handleCheckout}
              onLogout={handleLogout}
              cartItemCount={cartItemCount}
            />
          } />
          
          <Route path="/admin" element={
            <AdminDashboard 
              user={user}
              successMsg={successMsg}
              errorMsg={error}
              error=""
              onToggleAdmin={handleToggleAdmin}
              onLogout={handleLogout}
              cartItemCount={cartItemCount}
            />
          } />
          
          <Route path="/admin/products" element={
            <AdminProducts 
              user={user}
              successMsg={successMsg}
              errorMsg={error}
              error=""
              onDelete={handleDeleteProduct}
              onLogout={handleLogout}
              cartItemCount={cartItemCount}
            />
          } />
          
          <Route path="/admin/users" element={
            <AdminUsers 
              user={user}
              successMsg={successMsg}
              errorMsg={error}
              error=""
              onToggleAdmin={handleToggleAdmin}
              onDelete={handleDeleteUser}
              onLogout={handleLogout}
              cartItemCount={cartItemCount}
            />
          } />
        </Routes>
        {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      </div>
    </Router>
  );
}

export default App;
