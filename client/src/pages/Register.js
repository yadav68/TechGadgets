import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Grid, Box, Alert } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register = ({ user, onRegister, onLogout, cartItemCount }) => {
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
    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }
    if (onRegister) {
      const result = await onRegister({ username, email, password, password2 });
      if (result?.success) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
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
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          {success && <Alert severity="success" sx={{ width: '100%', mt: 2 }}>Registration successful! Redirecting to login...</Alert>}
          {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
          {errors.length > 0 && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              <ul>
                {errors.map((err, idx) => <li key={idx}>{err.msg || err}</li>)}
              </ul>
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  value={password2}
                  onChange={e => setPassword2(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Register; 