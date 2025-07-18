import express from 'express';
import { 
  getAllOrders, 
  getUserOrders, 
  getOrderById, 
  createOrder, 
  updateOrderStatus, 
  updatePaymentStatus, 
  cancelOrder 
} from '../controllers/orderController.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// User routes (require authentication)
router.get('/user', isAuthenticated, getUserOrders);
router.get('/user/:id', isAuthenticated, getOrderById);
router.post('/', isAuthenticated, createOrder);
router.put('/:id/cancel', isAuthenticated, cancelOrder);

// Admin routes
router.get('/', isAdmin, getAllOrders);
router.get('/:id', isAuthenticated, getOrderById);
router.put('/:id/status', isAdmin, updateOrderStatus);
router.put('/:id/payment', isAdmin, updatePaymentStatus);

export default router; 