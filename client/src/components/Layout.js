import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ title, user, successMsg, errorMsg, error, children, onLogout, cartItemCount = 0 }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
      navigate('/');
    }
  };

  return (
    <>
      <header>
        <h1>Tech Gadgets & Accessories</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart" className="cart-link">
            Cart
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </Link>
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textDecoration: 'underline' }}>Logout</button>
              {user.isAdmin && <Link to="/admin">Admin</Link>}
            </>
          )}
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Tech Gadgets. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout; 