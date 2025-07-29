import {
  Delete as DeleteIcon,
  NavigateNext as NavigateNextIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Fade,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { cartAPI } from "../services/api";

const Cart = ({
  user,
  onUpdate,
  onRemove,
  onClear,
  onLogout,
  cartItemCount,
}) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});

  const fetchCart = useCallback(async () => {
    try {
      const data = await cartAPI.getCart();
      setCart(data.cart || []);
      calculateTotal(data.cart || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const calculateTotal = (cartItems) => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map((item) =>
      item._id === productId
        ? { ...item, quantity: parseInt(newQuantity) }
        : item
    );
    setCart(updatedCart);
    calculateTotal(updatedCart);

    setUpdating((prev) => ({ ...prev, [productId]: true }));

    try {
      await onUpdate(productId, parseInt(newQuantity));
    } catch (err) {
      fetchCart();
    } finally {
      setUpdating((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleRemove = async (productId) => {
    await onRemove(productId);
    fetchCart();
  };

  const handleClear = async () => {
    await onClear();
    fetchCart();
  };

  if (loading) {
    return (
      <>
        <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 140px)",
            bgcolor: "background.default",
          }}
        >
          <CircularProgress size={48} />
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "background.default",
          borderBottom: "1px solid",
          borderColor: "divider",
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{ mb: 2 }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "0.875rem",
              }}
            >
              Home
            </Link>
            <Typography variant="body2" color="primary.main" fontWeight="bold">
              Shopping Cart
            </Typography>
          </Breadcrumbs>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <ShoppingCartIcon sx={{ color: "primary.main", fontSize: 32 }} />
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              color="text.primary"
            >
              Shopping Cart
            </Typography>
          </Box>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600 }}
          >
            Review your items and proceed to checkout when ready.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Fade in timeout={600}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Shopping Cart
            </Typography>
            {cart.length === 0 ? (
              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="h6">Your cart is empty.</Typography>
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Continue Shopping
                </Button>
              </Box>
            ) : (
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  {cart.map((item) => (
                    <Card key={item._id} sx={{ display: "flex", mb: 2 }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={
                          item.image ||
                          "https://source.unsplash.com/random?tech,gadget"
                        }
                        alt={item.name}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                        }}
                      >
                        <CardContent>
                          <Typography component="h5" variant="h5">
                            {item.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                          >
                            ${item.price.toFixed(2)}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 1,
                            }}
                          >
                            <TextField
                              type="number"
                              label="Quantity"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(item._id, e.target.value)
                              }
                              inputProps={{ min: 1, max: 99 }}
                              sx={{ width: "80px" }}
                              disabled={updating[item._id]}
                            />
                            {updating[item._id] && (
                              <CircularProgress size={20} sx={{ ml: 1 }} />
                            )}
                          </Box>
                        </CardContent>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                        <Typography variant="h6" sx={{ mr: 2 }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        <IconButton
                          onClick={() => handleRemove(item._id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Card>
                  ))}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        Order Summary
                      </Typography>
                      <Typography variant="h6">
                        Total: ${total.toFixed(2)}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Button
                          component={Link}
                          to="/checkout"
                          variant="contained"
                          fullWidth
                        >
                          Checkout
                        </Button>
                        <Button
                          onClick={handleClear}
                          variant="outlined"
                          fullWidth
                          sx={{ mt: 1 }}
                        >
                          Clear Cart
                        </Button>
                        <Button
                          component={Link}
                          to="/products"
                          fullWidth
                          sx={{ mt: 1 }}
                        >
                          Continue Shopping
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Box>
        </Fade>
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
