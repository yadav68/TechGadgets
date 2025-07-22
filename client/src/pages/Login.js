import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ user, successMsg, errorMsg, error: globalError, onLogin, onLogout }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (onLogin) {
      const result = await onLogin({ email, password }, () => navigate('/'));
      if (!result?.success) {
        // Try to extract backend error message
        if (result?.error) {
          setError(result.error);
        } else if (result?.errors && result.errors[0] && result.errors[0].msg) {
          setError(result.errors[0].msg);
        } else {
          setError("Invalid email or password");
        }
      }
    }
  };

  return (
    <Layout title="Login" user={user} successMsg={successMsg} errorMsg={errorMsg} error={globalError} onLogout={onLogout}>
      <h2>Login</h2>
      {(error || globalError) && <div className="error-list">{error || globalError}</div>}
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