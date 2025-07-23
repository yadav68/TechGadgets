import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { orderAPI } from "../services/api";
import { Container, Typography, Button, Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminOrders = ({ user, onLogout, cartItemCount }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await orderAPI.getAll();
      setOrders(data.orders || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderAPI.updateStatus(orderId, newStatus);
      // showToast('Order status updated successfully', 'success');
      fetchOrders();
    } catch (err) {
      // showToast('Error updating order status', 'error');
      console.error('Error updating order status:', err);
    }
  };

  const handlePaymentStatusUpdate = async (orderId, newPaymentStatus) => {
    try {
      await orderAPI.updatePaymentStatus(orderId, newPaymentStatus);
      // showToast('Payment status updated successfully', 'success');
      fetchOrders();
    } catch (err) {
      // showToast('Error updating payment status', 'error');
      console.error('Error updating payment status:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'processing': return 'blue';
      case 'shipped': return 'purple';
      case 'delivered': return 'green';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'completed': return 'green';
      case 'failed': return 'red';
      default: return 'gray';
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

  return (
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Order Management
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Button component={Link} to="/admin" variant="outlined">
            Back to Dashboard
          </Button>
        </Box>

        {orders.length === 0 ? (
          <Typography>No orders found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="orders table">
              <TableHead>
                <TableRow>
                  <TableCell>Order #</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Payment Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell>{order.user?.username} ({order.user?.email})</TableCell>
                    <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                          sx={{ color: getStatusColor(order.status), fontWeight: 'bold' }}
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="processing">Processing</MenuItem>
                          <MenuItem value="shipped">Shipped</MenuItem>
                          <MenuItem value="delivered">Delivered</MenuItem>
                          <MenuItem value="cancelled">Cancelled</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          value={order.paymentStatus}
                          onChange={(e) => handlePaymentStatusUpdate(order._id, e.target.value)}
                          sx={{ color: getPaymentStatusColor(order.paymentStatus), fontWeight: 'bold' }}
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="completed">Completed</MenuItem>
                          <MenuItem value="failed">Failed</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <Button component={Link} to={`/orders/${order._id}`} size="small" variant="outlined">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default AdminOrders; 