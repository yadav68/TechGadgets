import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ user, successMsg, errorMsg, error: globalError, errors: globalErrors, onRegister, onLogout }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setErrors([]);
    setSuccess(false);
    if (onRegister) {
      const result = await onRegister({ username, email, password, password2 });
      if (result?.success) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
      } else if (result?.error) {
        setError(result.error);
      } else if (result?.errors && Array.isArray(result.errors)) {
        setErrors(result.errors);
      } else {
        setError("Registration failed. Please check your input.");
      }
    }
  };

  return (
    <Layout title="Register" user={user} successMsg={successMsg} errorMsg={errorMsg} error={globalError} onLogout={onLogout}>
      <h2>Register</h2>
      {success && <div className="flash-message success">Registration successful! Redirecting to login...</div>}
      {(error || globalError) && <div className="error-list">{error || globalError}</div>}
      {((errors && errors.length > 0) || (globalErrors && globalErrors.length > 0)) && (
        <ul className="error-list">
          {(errors.length > 0 ? errors : globalErrors).map((err, idx) => <li key={idx}>{err.msg || err}</li>)}
        </ul>
      )}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} />
        <input type="email" name="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" name="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
        <input type="password" name="password2" placeholder="Confirm Password" required value={password2} onChange={e => setPassword2(e.target.value)} />
        <button type="submit" className="btn">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </Layout>
  );
};

export default Register; 