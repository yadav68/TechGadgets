import {
  NavigateNext as NavigateNextIcon,
  Receipt as ReceiptIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Container,
  Fade,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { orderAPI } from "../services/api";

const UserOrders = ({ user, onLogout, cartItemCount }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await orderAPI.getUserOrders();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await orderAPI.cancel(orderId);
        // showToast('Order cancelled successfully', 'success');
        fetchOrders();
      } catch (err) {
        // showToast('Error cancelling order', 'error');
        console.error("Error cancelling order:", err);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return theme.palette.warning.main;
      case "processing":
        return theme.palette.info.main;
      case "shipped":
        return theme.palette.secondary.main;
      case "delivered":
        return theme.palette.success.main;
      case "cancelled":
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "pending":
        return theme.palette.warning.main;
      case "completed":
        return theme.palette.success.main;
      case "failed":
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
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
              My Orders
            </Typography>
          </Breadcrumbs>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <ReceiptIcon sx={{ color: "primary.main", fontSize: 32 }} />
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              color="text.primary"
            >
              My Orders
            </Typography>
          </Box>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600 }}
          >
            Track and manage your orders. View order details, payment status,
            and order history.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Fade in timeout={600}>
          <Box>
            {/* Action Buttons */}
            <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                component={Link}
                to="/products"
                variant="outlined"
                startIcon={<ShoppingCartIcon />}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  border: "2px solid",
                  borderColor: "primary.main",
                  "&:hover": {
                    borderColor: "primary.dark",
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 12px ${
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(0,0,0,0.15)"
                    }`,
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                Continue Shopping
              </Button>
            </Box>

            {orders.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  textAlign: "center",
                  p: 6,
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <ReceiptIcon
                  sx={{
                    fontSize: 64,
                    color: "text.disabled",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h5"
                  gutterBottom
                  fontWeight="bold"
                  color="text.primary"
                >
                  No Orders Yet
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3, maxWidth: 400, mx: "auto" }}
                >
                  You haven't placed any orders yet. Start shopping to see your
                  orders here.
                </Typography>
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    boxShadow: `0 4px 12px ${
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(0,0,0,0.15)"
                    }`,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 6px 20px ${
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(0,0,0,0.2)"
                      }`,
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  Start Shopping
                </Button>
              </Paper>
            ) : (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                }}
              >
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="user orders table">
                    <TableHead>
                      <TableRow sx={{ bgcolor: "background.default" }}>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "text.primary",
                            py: 2,
                          }}
                        >
                          Order #
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "text.primary",
                            py: 2,
                          }}
                        >
                          Total Amount
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "text.primary",
                            py: 2,
                          }}
                        >
                          Status
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "text.primary",
                            py: 2,
                          }}
                        >
                          Payment Status
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "text.primary",
                            py: 2,
                          }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            fontWeight: "bold",
                            color: "text.primary",
                            py: 2,
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order, index) => (
                        <TableRow
                          key={order._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            "&:hover": {
                              bgcolor: "action.hover",
                              transition: "background-color 0.2s ease-in-out",
                            },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              fontWeight: 600,
                              color: "primary.main",
                              py: 2,
                            }}
                          >
                            #{order.orderNumber}
                          </TableCell>
                          <TableCell sx={{ py: 2, fontWeight: 600 }}>
                            ${order.totalAmount.toFixed(2)}
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Chip
                              label={
                                order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)
                              }
                              size="small"
                              sx={{
                                bgcolor: getStatusColor(order.status),
                                color: "common.white",
                                fontWeight: "bold",
                                borderRadius: 2,
                                textTransform: "capitalize",
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Chip
                              label={
                                order.paymentStatus.charAt(0).toUpperCase() +
                                order.paymentStatus.slice(1)
                              }
                              size="small"
                              variant="outlined"
                              sx={{
                                borderColor: getPaymentStatusColor(
                                  order.paymentStatus
                                ),
                                color: getPaymentStatusColor(
                                  order.paymentStatus
                                ),
                                fontWeight: "bold",
                                borderRadius: 2,
                                textTransform: "capitalize",
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ py: 2, color: "text.secondary" }}>
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </TableCell>
                          <TableCell align="right" sx={{ py: 2 }}>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                justifyContent: "flex-end",
                              }}
                            >
                              <Button
                                component={Link}
                                to={`/orders/${order._id}`}
                                size="small"
                                variant="outlined"
                                sx={{
                                  borderRadius: 2,
                                  textTransform: "none",
                                  fontWeight: 600,
                                  minWidth: 100,
                                  border: "2px solid",
                                  "&:hover": {
                                    transform: "translateY(-1px)",
                                    boxShadow: `0 2px 8px ${
                                      theme.palette.mode === "dark"
                                        ? "rgba(255,255,255,0.15)"
                                        : "rgba(0,0,0,0.15)"
                                    }`,
                                  },
                                  transition: "all 0.2s ease-in-out",
                                }}
                              >
                                View Details
                              </Button>
                              {order.status === "pending" && (
                                <Button
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  onClick={() => handleCancelOrder(order._id)}
                                  sx={{
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    minWidth: 100,
                                    border: "2px solid",
                                    "&:hover": {
                                      transform: "translateY(-1px)",
                                      boxShadow: `0 2px 8px ${
                                        theme.palette.mode === "dark"
                                          ? "rgba(255,255,255,0.15)"
                                          : "rgba(0,0,0,0.15)"
                                      }`,
                                    },
                                    transition: "all 0.2s ease-in-out",
                                  }}
                                >
                                  Cancel Order
                                </Button>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            )}
          </Box>
        </Fade>
      </Container>
      <Footer />
    </>
  );
};

export default UserOrders;
