import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ user, successMsg, errorMsg, error, onLogin, onLogout }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (onLogin) onLogin({ email, password }, () => navigate('/'));
  };

  return (
    <Layout title="Login" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout}>
      <h2>Login</h2>
      {error && <div className="error-list">{error}</div>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" name="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="btn">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </Layout>
  );
};

export default Login; 