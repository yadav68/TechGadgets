import express from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Order from '../models/Order.js';
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Admin dashboard - requires admin authentication
router.get('/', isAdmin, async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name').sort({ createdAt: -1 }).limit(10);
    const users = await User.find().sort({ createdAt: -1 }).limit(10);
    const orders = await Order.find().populate('user', 'username email').sort({ createdAt: -1 }).limit(10);
    const categories = await Category.find().sort({ name: 1 }).limit(10);
    
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalCategories = await Category.countDocuments();
    
    res.json({
      products,
      users,
      orders,
      categories,
      totalProducts,
      totalUsers,
      totalOrders,
      totalCategories
    });
  } catch (err) {
    console.error('Admin dashboard error:', err);
    res.status(500).json({ error: 'Error loading admin dashboard' });
  }
});

// Product management page
router.get('/products', isAdmin, async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name').sort({ createdAt: -1 });
    res.json({ products });
  } catch (err) {
    console.error('Admin products error:', err);
    res.status(500).json({ error: 'Error loading products' });
  }
});

// User management page
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ users });
  } catch (err) {
    console.error('Admin users error:', err);
    res.status(500).json({ error: 'Error loading users' });
  }
});

// Toggle user admin status
router.put('/users/:id/toggle-admin', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    user.isAdmin = !user.isAdmin;
    await user.save();
    
    res.json({ 
      message: `User ${user.username} admin status updated`,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    console.error('Toggle admin error:', err);
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete user
router.delete('/users/:id', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Prevent admin from deleting themselves
    if (user._id.toString() === req.session.user._id.toString()) {
      return res.status(400).json({ error: 'You cannot delete your own account' });
    }
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ error: 'Error deleting user' });
  }
});

// Category management page
router.get('/categories', isAdmin, async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ categories });
  } catch (err) {
    console.error('Admin categories error:', err);
    res.status(500).json({ error: 'Error loading categories' });
  }
});

// Order management page
router.get('/orders', isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'username email')
      .populate('items.product', 'name image')
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    console.error('Admin orders error:', err);
    res.status(500).json({ error: 'Error loading orders' });
  }
});

export default router; 