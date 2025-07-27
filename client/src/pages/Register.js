import { PersonAdd, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Register = ({ user, onRegister, onLogout, cartItemCount }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrors([]);
    setSuccess(false);
    setLoading(true);

    if (password !== password2) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (onRegister) {
      const result = await onRegister({ username, email, password, password2 });
      if (result?.success) {
        setSuccess(true);
        // Auto-signin after successful registration
        setTimeout(() => navigate("/"), 1500);
      } else if (result?.error) {
        setError(result.error);
      } else if (result?.errors && Array.isArray(result.errors)) {
        setErrors(result.errors);
      } else {
        setError("Registration failed. Please check your input.");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: "calc(100vh - 64px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 4,
          }}
        >
          <Card
            elevation={3}
            sx={{
              width: "100%",
              maxWidth: 480,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <PersonAdd
                  sx={{
                    fontSize: 48,
                    color: "primary.main",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h4"
                  component="h1"
                  fontWeight="bold"
                  gutterBottom
                >
                  Create Account
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Join TechGadgets and discover amazing products
                </Typography>
              </Box>

              {success && (
                <Alert
                  severity="success"
                  sx={{ mb: 3, borderRadius: 1 }}
                  variant="filled"
                >
                  Registration successful! Redirecting to home...
                </Alert>
              )}

              {error && (
                <Alert
                  severity="error"
                  sx={{ mb: 3, borderRadius: 1 }}
                  variant="outlined"
                >
                  {error}
                </Alert>
              )}

              {errors.length > 0 && (
                <Alert
                  severity="error"
                  sx={{ mb: 3, borderRadius: 1 }}
                  variant="outlined"
                >
                  <Box component="ul" sx={{ m: 0, pl: 2 }}>
                    {errors.map((err, idx) => (
                      <li key={idx}>{err.msg || err}</li>
                    ))}
                  </Box>
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    autoComplete="username"
                    autoFocus
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    variant="outlined"
                    size="medium"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    size="medium"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    size="medium"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    id="password2"
                    name="password2"
                    label="Confirm Password"
                    type={showPassword2 ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    variant="outlined"
                    size="medium"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword2(!showPassword2)}
                            edge="end"
                          >
                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      mt: 2,
                      py: 1.5,
                      borderRadius: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      textTransform: "none",
                      boxShadow: 2,
                      "&:hover": {
                        boxShadow: 4,
                      },
                    }}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                </Stack>

                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?
                  </Typography>
                </Divider>

                <Box sx={{ textAlign: "center" }}>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderRadius: 1.5,
                      textTransform: "none",
                      fontWeight: "medium",
                    }}
                  >
                    Sign In Instead
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
