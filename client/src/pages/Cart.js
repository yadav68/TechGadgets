import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartAPI } from "../services/api";
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent, IconButton, TextField, Box, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cart = ({ user, onUpdate, onRemove, onClear, onLogout, cartItemCount }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await cartAPI.getCart();
      setCart(data.cart || []);
      calculateTotal(data.cart || []);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (cartItems) => {
    const newTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item._id === productId ? { ...item, quantity: parseInt(newQuantity) } : item
    );
    setCart(updatedCart);
    calculateTotal(updatedCart);
    
    setUpdating(prev => ({ ...prev, [productId]: true }));
    
    try {
      await onUpdate(productId, parseInt(newQuantity));
    } catch (err) {
      fetchCart();
    } finally {
      setUpdating(prev => ({ ...prev, [productId]: false }));
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Shopping Cart
        </Typography>
        {cart.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6">Your cart is empty.</Typography>
            <Button component={Link} to="/products" variant="contained" sx={{ mt: 2 }}>
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              {cart.map(item => (
                <Card key={item._id} sx={{ display: 'flex', mb: 2 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={item.image || 'https://source.unsplash.com/random?tech,gadget'}
                    alt={item.name}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent>
                      <Typography component="h5" variant="h5">
                        {item.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        ${item.price.toFixed(2)}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <TextField
                          type="number"
                          label="Quantity"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                          inputProps={{ min: 1, max: 99 }}
                          sx={{ width: '80px' }}
                          disabled={updating[item._id]}
                        />
                        {updating[item._id] && <CircularProgress size={20} sx={{ ml: 1 }} />}
                      </Box>
                    </CardContent>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                    <Typography variant="h6" sx={{ mr: 2 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    <IconButton onClick={() => handleRemove(item._id)} color="error">
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
                    <Button component={Link} to="/checkout" variant="contained" fullWidth>
                      Checkout
                    </Button>
                    <Button onClick={handleClear} variant="outlined" fullWidth sx={{ mt: 1 }}>
                      Clear Cart
                    </Button>
                    <Button component={Link} to="/products" fullWidth sx={{ mt: 1 }}>
                      Continue Shopping
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Cart; 