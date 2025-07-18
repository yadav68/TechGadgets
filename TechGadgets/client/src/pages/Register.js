import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const Register = ({ user, successMsg, errorMsg, error, errors, onRegister, onLogout }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (onRegister) onRegister({ username, email, password, password2 });
  };

  return (
    <Layout title="Register" user={user} successMsg={successMsg} errorMsg={errorMsg} error={error} onLogout={onLogout}>
      <h2>Register</h2>
      {errors && errors.length > 0 && (
        <ul className="error-list">
          {errors.map((err, idx) => <li key={idx}>{err.msg || err}</li>)}
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