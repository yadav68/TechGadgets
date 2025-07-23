import {
  ArrowBack as ArrowBackIcon,
  CalendarToday as CalendarIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  CreditCard as CreditCardIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Inventory as InventoryIcon,
  LocationOn as LocationIcon,
  Payment as PaymentIcon,
  Print as PrintIcon,
  Schedule as ScheduleIcon,
  LocalShipping as ShippingIcon,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { orderAPI } from "../services/api";

const OrderDetail = ({ user, onLogout, cartItemCount }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchOrder = useCallback(async () => {
    try {
      const data = await orderAPI.getById(id);
      setOrder(data.order);
    } catch (err) {
      console.error("Error fetching order:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleCancelOrder = async () => {
    if (
      window.confirm(
        "Are you sure you want to cancel this order? This action cannot be undone."
      )
    ) {
      try {
        await orderAPI.cancel(id);
        alert("Order cancelled successfully");
        fetchOrder();
      } catch (err) {
        alert("Error cancelling order: " + err.message);
      }
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await orderAPI.updateStatus(id, newStatus);
      fetchOrder();
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  };

  const handlePaymentStatusUpdate = async (newPaymentStatus) => {
    try {
      await orderAPI.updatePaymentStatus(id, newPaymentStatus);
      fetchOrder();
    } catch (err) {
      alert("Error updating payment status: " + err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "shipped":
        return "primary";
      case "delivered":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "completed":
        return "success";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <ScheduleIcon />;
      case "processing":
        return <InventoryIcon />;
      case "shipped":
        return <ShippingIcon />;
      case "delivered":
        return <CheckCircleIcon />;
      case "cancelled":
        return <CancelIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const orderSteps = ["Order Placed", "Processing", "Shipped", "Delivered"];

  const getActiveStep = (status) => {
    switch (status) {
      case "pending":
        return 0;
      case "processing":
        return 1;
      case "shipped":
        return 2;
      case "delivered":
        return 3;
      case "cancelled":
        return -1;
      default:
        return 0;
    }
  };

  if (loading) {
    return (
      <>
        <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Skeleton
                variant="rectangular"
                height={200}
                sx={{ borderRadius: 3, mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Skeleton
                variant="rectangular"
                height={400}
                sx={{ borderRadius: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Skeleton
                variant="rectangular"
                height={400}
                sx={{ borderRadius: 3 }}
              />
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
        <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
          <Paper sx={{ p: 6, borderRadius: 3 }}>
            <ErrorIcon sx={{ fontSize: 64, color: "error.main", mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Order Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              The order you're looking for doesn't exist or you don't have
              permission to view it.
            </Typography>
            <Button
              component={Link}
              to="/orders"
              variant="contained"
              startIcon={<ArrowBackIcon />}
              size="large"
            >
              Back to Orders
            </Button>
          </Paper>
        </Container>
        <Footer />
      </>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />

      {/* Breadcrumbs */}
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
          <Link
            to="/orders"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Orders
          </Link>
          <Typography color="text.primary">
            Order #{order.orderNumber}
          </Typography>
        </Breadcrumbs>
      </Container>

      <Container maxWidth="lg" sx={{ pb: { xs: 4, md: 8 } }}>
        <Fade in timeout={500}>
          <Box>
            {/* Header Section */}
            <Paper
              sx={{
                p: 4,
                mb: 4,
                borderRadius: 3,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
              >
                <Box>
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Order #{order.orderNumber}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ opacity: 0.9 }}
                  >
                    <CalendarIcon fontSize="small" />
                    <Typography variant="body1">
                      {formatDate(order.createdAt)} at{" "}
                      {formatTime(order.createdAt)}
                    </Typography>
                  </Stack>
                </Box>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ gap: { xs: 2, sm: 0 } }}
                >
                  <Button
                    component={Link}
                    to="/orders"
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    sx={{
                      borderColor: "white",
                      color: "white",
                      "&:hover": {
                        borderColor: "white",
                        bgcolor: "rgba(255,255,255,0.1)",
                      },
                      order: { xs: 1, sm: 0 },
                    }}
                  >
                    Back to Orders
                  </Button>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      justifyContent: { xs: "center", sm: "flex-start" },
                      order: { xs: 2, sm: 0 },
                    }}
                  >
                    <IconButton
                      sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}
                    >
                      <PrintIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>

            {/* Order Status Progress */}
            {order.status !== "cancelled" && (
              <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4, borderRadius: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ mb: 3 }}
                >
                  Order Progress
                </Typography>
                <Stepper
                  activeStep={getActiveStep(order.status)}
                  alternativeLabel={!isMobile}
                  orientation={isMobile ? "vertical" : "horizontal"}
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontSize: { xs: "0.875rem", md: "1rem" },
                    },
                  }}
                >
                  {orderSteps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Paper>
            )}

            <Grid container spacing={4}>
              {/* Order Summary */}
              <Grid item xs={12} lg={8}>
                <Stack spacing={4}>
                  {/* Status Cards */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <CardContent>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Avatar
                              sx={{
                                bgcolor: `${getStatusColor(order.status)}.main`,
                              }}
                            >
                              {getStatusIcon(order.status)}
                            </Avatar>
                            <Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Order Status
                              </Typography>
                              <Chip
                                label={
                                  order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)
                                }
                                color={getStatusColor(order.status)}
                                sx={{ fontWeight: "bold" }}
                              />
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <CardContent>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Avatar
                              sx={{
                                bgcolor: `${getPaymentStatusColor(
                                  order.paymentStatus
                                )}.main`,
                              }}
                            >
                              <PaymentIcon />
                            </Avatar>
                            <Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Payment Status
                              </Typography>
                              <Chip
                                label={
                                  order.paymentStatus.charAt(0).toUpperCase() +
                                  order.paymentStatus.slice(1)
                                }
                                color={getPaymentStatusColor(
                                  order.paymentStatus
                                )}
                                sx={{ fontWeight: "bold" }}
                              />
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  {/* Order Items */}
                  <Card sx={{ borderRadius: 3 }}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ mb: 3 }}
                      >
                        Order Items ({order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"})
                      </Typography>
                      <List sx={{ p: 0 }}>
                        {order.items.map((item, index) => (
                          <React.Fragment key={index}>
                            <ListItem
                              sx={{
                                px: 0,
                                py: 2,
                                "&:hover": { bgcolor: "grey.50" },
                                borderRadius: 2,
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  variant="rounded"
                                  src={
                                    item.image ||
                                    `https://source.unsplash.com/100x100/?${
                                      item.name || "product"
                                    }`
                                  }
                                  sx={{ width: 80, height: 80, mr: 2 }}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Typography variant="h6" fontWeight="bold">
                                    {item.name}
                                  </Typography>
                                }
                                secondary={
                                  <Stack spacing={1} sx={{ mt: 1 }}>
                                    <Stack direction="row" spacing={3}>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        <strong>Quantity:</strong>{" "}
                                        {item.quantity}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        <strong>Unit Price:</strong> $
                                        {item.price.toFixed(2)}
                                      </Typography>
                                    </Stack>
                                  </Stack>
                                }
                              />
                              <Box sx={{ textAlign: "right" }}>
                                <Typography
                                  variant="h6"
                                  fontWeight="bold"
                                  color="primary.main"
                                >
                                  ${(item.quantity * item.price).toFixed(2)}
                                </Typography>
                              </Box>
                            </ListItem>
                            {index < order.items.length - 1 && (
                              <Divider sx={{ my: 1 }} />
                            )}
                          </React.Fragment>
                        ))}
                      </List>
                    </CardContent>
                  </Card>

                  {/* Actions */}
                  {order.status === "pending" && (
                    <Alert
                      severity="info"
                      sx={{ borderRadius: 2 }}
                      action={
                        <Button
                          color="error"
                          variant="outlined"
                          startIcon={<CancelIcon />}
                          onClick={handleCancelOrder}
                          size="small"
                        >
                          Cancel Order
                        </Button>
                      }
                    >
                      Your order is pending. You can cancel it if needed.
                    </Alert>
                  )}
                </Stack>
              </Grid>

              {/* Sidebar */}
              <Grid item xs={12} lg={4}>
                <Stack spacing={4}>
                  {/* Order Summary */}
                  <Card
                    sx={{
                      borderRadius: 3,
                      border: "2px solid",
                      borderColor: "primary.main",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ mb: 3 }}
                      >
                        Order Summary
                      </Typography>
                      <Stack spacing={2}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Subtotal
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            ${(order.totalAmount * 0.9).toFixed(2)}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Shipping
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            ${(order.totalAmount * 0.1).toFixed(2)}
                          </Typography>
                        </Box>
                        <Divider />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h6" fontWeight="bold">
                            Total
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="primary.main"
                          >
                            ${order.totalAmount.toFixed(2)}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Payment Information */}
                  <Card sx={{ borderRadius: 3 }}>
                    <CardContent>
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        sx={{ mb: 3 }}
                      >
                        <CreditCardIcon color="primary" />
                        <Typography variant="h6" fontWeight="bold">
                          Payment Information
                        </Typography>
                      </Stack>
                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Payment Method
                          </Typography>
                          <Typography variant="body1" fontWeight="bold">
                            {order.paymentMethod
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Transaction Date
                          </Typography>
                          <Typography variant="body1">
                            {formatDate(order.createdAt)}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Shipping Address */}
                  <Card sx={{ borderRadius: 3 }}>
                    <CardContent>
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        sx={{ mb: 3 }}
                      >
                        <LocationIcon color="primary" />
                        <Typography variant="h6" fontWeight="bold">
                          Shipping Address
                        </Typography>
                      </Stack>
                      <Stack spacing={1}>
                        <Typography variant="body1">
                          {order.shippingAddress.street}
                        </Typography>
                        <Typography variant="body1">
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.state}{" "}
                          {order.shippingAddress.zipCode}
                        </Typography>
                        <Typography variant="body1">
                          {order.shippingAddress.country}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Admin Controls */}
                  {user && user.isAdmin && (
                    <Card
                      sx={{
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "warning.main",
                      }}
                    >
                      <CardContent>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          sx={{ mb: 3 }}
                        >
                          <EditIcon color="warning" />
                          <Typography variant="h6" fontWeight="bold">
                            Admin Controls
                          </Typography>
                        </Stack>
                        <Stack spacing={3}>
                          <FormControl fullWidth size="small">
                            <InputLabel>Update Order Status</InputLabel>
                            <Select
                              value={order.status}
                              label="Update Order Status"
                              onChange={(e) =>
                                handleStatusUpdate(e.target.value)
                              }
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="processing">Processing</MenuItem>
                              <MenuItem value="shipped">Shipped</MenuItem>
                              <MenuItem value="delivered">Delivered</MenuItem>
                              <MenuItem value="cancelled">Cancelled</MenuItem>
                            </Select>
                          </FormControl>

                          <FormControl fullWidth size="small">
                            <InputLabel>Update Payment Status</InputLabel>
                            <Select
                              value={order.paymentStatus}
                              label="Update Payment Status"
                              onChange={(e) =>
                                handlePaymentStatusUpdate(e.target.value)
                              }
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                              <MenuItem value="failed">Failed</MenuItem>
                            </Select>
                          </FormControl>
                        </Stack>
                      </CardContent>
                    </Card>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>

      <Footer />
    </>
  );
};

export default OrderDetail;
