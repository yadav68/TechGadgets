import {
  Login as LoginIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
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

const Login = ({ user, onLogin, onLogout, cartItemCount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (onLogin) {
      const result = await onLogin({ email, password }, () => navigate("/"));
      if (!result?.success) {
        if (result?.error) {
          setError(result.error);
        } else {
          setError("Invalid email or password");
        }
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
                <LoginIcon
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
                  Welcome Back
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Sign in to your TechGadgets account
                </Typography>
              </Box>

              {error && (
                <Alert
                  severity="error"
                  sx={{ mb: 3, borderRadius: 1 }}
                  variant="outlined"
                >
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    autoComplete="email"
                    autoFocus
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
                    autoComplete="current-password"
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
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                </Stack>

                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?
                  </Typography>
                </Divider>

                <Box sx={{ textAlign: "center" }}>
                  <Button
                    component={Link}
                    to="/register"
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
                    Create Account
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

export default Login;
