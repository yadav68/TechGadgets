import {
  ArrowBack,
  CreditCard,
  LocalShipping,
  Lock,
  Payment,
  ShoppingBag,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { cartAPI, orderAPI } from "../services/api";

const Checkout = ({ user, onLogout, cartItemCount, onClearCart }) => {
  const [cart, setCart] = useState({ cart: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const steps = [
    { label: "Shipping", icon: <LocalShipping /> },
    { label: "Payment", icon: <Payment /> },
    { label: "Review", icon: <Lock /> },
  ];

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await cartAPI.getCart();
      setCart(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (activeStep === 0) {
      // Validate shipping information
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "street",
        "city",
        "state",
        "zipCode",
        "country",
      ];

      requiredFields.forEach((field) => {
        if (!shippingAddress[field].trim()) {
          newErrors[field] = "This field is required";
        }
      });

      // Email validation
      if (
        shippingAddress.email &&
        !/\S+@\S+\.\S+/.test(shippingAddress.email)
      ) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Render step content
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Card elevation={0} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 3 }}
              >
                Shipping Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="given-name"
                    value={shippingAddress.firstName}
                    onChange={handleInputChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={shippingAddress.lastName}
                    onChange={handleInputChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={shippingAddress.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="phone"
                    label="Phone Number (Optional)"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="street"
                    label="Street Address"
                    name="street"
                    autoComplete="street-address"
                    value={shippingAddress.street}
                    onChange={handleInputChange}
                    error={!!errors.street}
                    helperText={errors.street}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="address-level2"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    error={!!errors.city}
                    helperText={errors.city}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="state"
                    label="State/Province"
                    name="state"
                    autoComplete="address-level1"
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    error={!!errors.state}
                    helperText={errors.state}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="zipCode"
                    label="ZIP/Postal Code"
                    name="zipCode"
                    autoComplete="postal-code"
                    value={shippingAddress.zipCode}
                    onChange={handleInputChange}
                    error={!!errors.zipCode}
                    helperText={errors.zipCode}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="country"
                    label="Country"
                    name="country"
                    autoComplete="country"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    error={!!errors.country}
                    helperText={errors.country}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card elevation={0} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 3 }}
              >
                Payment Method
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="payment-method-label">
                      Payment Method
                    </InputLabel>
                    <Select
                      labelId="payment-method-label"
                      id="paymentMethod"
                      value={paymentMethod}
                      label="Payment Method"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      sx={{
                        borderRadius: 1.5,
                      }}
                    >
                      <MenuItem value="credit_card">
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <CreditCard />
                          Credit Card
                        </Box>
                      </MenuItem>
                      <MenuItem value="debit_card">
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Payment />
                          Debit Card
                        </Box>
                      </MenuItem>
                      <MenuItem value="paypal">PayPal</MenuItem>
                      <MenuItem value="cash_on_delivery">
                        Cash on Delivery
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card elevation={0} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 3 }}
              >
                Review Your Order
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Shipping Information
                  </Typography>
                  <Box sx={{ bgcolor: "grey.50", p: 2, borderRadius: 1.5 }}>
                    <Typography variant="body2">
                      {shippingAddress.firstName} {shippingAddress.lastName}
                      <br />
                      {shippingAddress.email}
                      <br />
                      {shippingAddress.phone && `${shippingAddress.phone}`}
                      <br />
                      {shippingAddress.street}
                      <br />
                      {shippingAddress.city}, {shippingAddress.state}{" "}
                      {shippingAddress.zipCode}
                      <br />
                      {shippingAddress.country}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Payment Method
                  </Typography>
                  <Box sx={{ bgcolor: "grey.50", p: 2, borderRadius: 1.5 }}>
                    <Typography variant="body2">
                      {paymentMethod
                        .replace("_", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.cart.length === 0) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setProcessing(true);

    try {
      const orderItems = cart.cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));

      const orderData = {
        items: orderItems,
        shippingAddress,
        paymentMethod,
      };

      await orderAPI.create(orderData);

      if (onClearCart) {
        await onClearCart();
      }

      navigate("/orders");
    } catch (err) {
      console.error("Error creating order:", err);
      setErrors({
        submit: err.message || "Error creating order. Please try again.",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <CircularProgress size={48} />
            <Typography variant="h6" color="text.secondary">
              Loading checkout...
            </Typography>
          </Box>
        </Container>
        <Footer />
      </>
    );
  }

  if (cart.cart.length === 0) {
    return (
      <>
        <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Paper sx={{ p: 6, textAlign: "center", borderRadius: 3 }}>
            <ShoppingBag
              sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
            />
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              Your cart is empty
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Add some products to your cart before checkout.
            </Typography>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              size="large"
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontSize: "1.1rem",
              }}
            >
              Continue Shopping
            </Button>
          </Paper>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />

      {/* Hero Section */}
      <Box sx={{ bgcolor: "grey.50", py: 4 }}>
        <Container maxWidth="lg">
          <Breadcrumbs sx={{ mb: 2 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Home
            </Link>
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Cart
            </Link>
            <Typography color="text.primary">Checkout</Typography>
          </Breadcrumbs>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
            <Lock sx={{ fontSize: 32, color: "success.main" }} />
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                Secure Checkout
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Your payment information is safe and secure
              </Typography>
            </Box>
          </Box>

          {/* Custom Stepper */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {steps.map((step, index) => (
                <React.Fragment key={step.label}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor:
                          index <= activeStep ? "primary.main" : "grey.300",
                        color: index <= activeStep ? "white" : "grey.600",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Typography
                      variant="body2"
                      fontWeight={index === activeStep ? "bold" : "normal"}
                      color={
                        index <= activeStep ? "primary.main" : "text.secondary"
                      }
                    >
                      {step.label}
                    </Typography>
                  </Box>
                  {index < steps.length - 1 && (
                    <Box
                      sx={{
                        width: 40,
                        height: 2,
                        bgcolor:
                          index < activeStep ? "primary.main" : "grey.300",
                        transition: "all 0.3s ease",
                        mt: -2,
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {errors.submit && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {errors.submit}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            <Paper elevation={1} sx={{ borderRadius: 3, overflow: "hidden" }}>
              {renderStepContent()}

              {/* Navigation Buttons */}
              <Box
                sx={{
                  p: 4,
                  bgcolor: "grey.50",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={
                    activeStep === 0 ? () => navigate("/cart") : handleBack
                  }
                  variant="outlined"
                  size="large"
                  startIcon={<ArrowBack />}
                  sx={{
                    borderRadius: 1.5,
                    px: 3,
                    textTransform: "none",
                  }}
                >
                  {activeStep === 0 ? "Back to Cart" : "Back"}
                </Button>

                {activeStep < steps.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    size="large"
                    sx={{
                      borderRadius: 1.5,
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      textTransform: "none",
                    }}
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    size="large"
                    disabled={processing}
                    sx={{
                      borderRadius: 1.5,
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      textTransform: "none",
                      minWidth: 200,
                    }}
                  >
                    {processing ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      `Place Order • $${cart.total.toFixed(2)}`
                    )}
                  </Button>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Order Summary Sidebar */}
          <Grid item xs={12} lg={4}>
            <Card
              elevation={1}
              sx={{ borderRadius: 3, position: "sticky", top: 24 }}
            >
              <Box sx={{ bgcolor: "primary.main", color: "white", p: 3 }}>
                <Typography variant="h5" fontWeight="bold">
                  Order Summary
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {cart.cart.length} {cart.cart.length === 1 ? "item" : "items"}
                </Typography>
              </Box>

              <CardContent sx={{ p: 0 }}>
                <List disablePadding>
                  {cart.cart.map((item, index) => (
                    <React.Fragment key={item._id}>
                      <ListItem sx={{ py: 2, px: 3 }}>
                        <ListItemAvatar>
                          <Box
                            component="img"
                            src={
                              item.image ||
                              `https://placeholder.com/60x60/0066CC/FFFFFF?text=${encodeURIComponent(
                                item.name.slice(0, 2)
                              )}`
                            }
                            alt={item.name}
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: 1.5,
                              objectFit: "cover",
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="body1" fontWeight="medium">
                              {item.name}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </Typography>
                          }
                          sx={{ ml: 2 }}
                        />
                        <Typography variant="body1" fontWeight="bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </ListItem>
                      {index < cart.cart.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}

                  <Divider />

                  <ListItem sx={{ py: 3, px: 3, bgcolor: "grey.50" }}>
                    <ListItemText
                      primary={
                        <Typography variant="h6" fontWeight="bold">
                          Total
                        </Typography>
                      }
                    />
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      ${cart.total.toFixed(2)}
                    </Typography>
                  </ListItem>
                </List>

                {/* Security Badge */}
                <Box sx={{ p: 3, textAlign: "center", bgcolor: "success.50" }}>
                  <Lock sx={{ color: "success.main", mb: 1 }} />
                  <Typography
                    variant="body2"
                    color="success.main"
                    fontWeight="medium"
                  >
                    SSL encrypted • Your data is secure
                  </Typography>
                </Box>
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
