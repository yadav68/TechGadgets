import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartAPI, orderAPI } from "../services/api";
import { Container, Typography, Button, Grid, Card, CardContent, TextField, Select, MenuItem, FormControl, InputLabel, Box, CircularProgress, List, ListItem, ListItemText, Divider } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Checkout = ({ user, onLogout, cartItemCount, onClearCart }) => {
  const [cart, setCart] = useState({ cart: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await cartAPI.getCart();
      setCart(data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const requiredFields = ['street', 'city', 'state', 'zipCode', 'country'];
    for (const field of requiredFields) {
      if (!shippingAddress[field].trim()) {
        alert(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }

    setProcessing(true);

    try {
      const orderItems = cart.cart.map(item => ({
        productId: item._id,
        quantity: item.quantity
      }));

      const orderData = {
        items: orderItems,
        shippingAddress,
        paymentMethod
      };

      await orderAPI.create(orderData);
      
      if (onClearCart) {
        await onClearCart();
      }
      
      navigate('/orders');
    } catch (err) {
      console.error('Error creating order:', err);
      alert(err.message || 'Error creating order. Please try again.');
    } finally {
      setProcessing(false);
    }
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

  if (cart.cart.length === 0) {
    return (
      <>
        <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
        <Container sx={{ py: 8, textAlign: 'center' }} maxWidth="md">
          <Typography variant="h4" component="h1" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography>Add some products to your cart before checkout.</Typography>
          <Button component={Link} to="/products" variant="contained" sx={{ mt: 2 }}>
            Continue Shopping
          </Button>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography component="h1" variant="h4" gutterBottom>
          Checkout
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Shipping Information
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField required fullWidth id="street" label="Street Address" name="street" value={shippingAddress.street} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField required fullWidth id="city" label="City" name="city" value={shippingAddress.city} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField required fullWidth id="state" label="State" name="state" value={shippingAddress.state} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField required fullWidth id="zipCode" label="ZIP Code" name="zipCode" value={shippingAddress.zipCode} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField required fullWidth id="country" label="Country" name="country" value={shippingAddress.country} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="payment-method-label">Payment Method</InputLabel>
                        <Select
                          labelId="payment-method-label"
                          id="paymentMethod"
                          value={paymentMethod}
                          label="Payment Method"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                          <MenuItem value="credit_card">Credit Card</MenuItem>
                          <MenuItem value="debit_card">Debit Card</MenuItem>
                          <MenuItem value="paypal">PayPal</MenuItem>
                          <MenuItem value="cash_on_delivery">Cash on Delivery</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                    <Button component={Link} to="/cart" variant="outlined">
                      Back to Cart
                    </Button>
                    <Button type="submit" variant="contained" disabled={processing}>
                      {processing ? <CircularProgress size={24} /> : `Place Order - ${cart.total.toFixed(2)}`}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <List disablePadding>
                  {cart.cart.map((item) => (
                    <ListItem key={item._id} sx={{ py: 1, px: 0 }}>
                      <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
                      <Typography variant="body2">${(item.price * item.quantity).toFixed(2)}</Typography>
                    </ListItem>
                  ))}
                  <Divider />
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      ${cart.total.toFixed(2)}
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Checkout; 