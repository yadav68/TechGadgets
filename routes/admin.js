import express from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Admin dashboard - requires admin authentication
router.get('/', isAdmin, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(10);
    const users = await User.find().sort({ createdAt: -1 }).limit(10);
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      products,
      users,
      totalProducts,
      totalUsers
    });
  } catch (err) {
    console.error('Admin dashboard error:', err);
    req.flash('error_msg', 'Error loading admin dashboard');
    res.redirect('/');
  }
});

// Product management page
router.get('/products', isAdmin, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('admin/products', {
      title: 'Admin - Product Management',
      products
    });
  } catch (err) {
    console.error('Admin products error:', err);
    req.flash('error_msg', 'Error loading products');
    res.redirect('/admin');
  }
});

// User management page
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.render('admin/users', {
      title: 'Admin - User Management',
      users
    });
  } catch (err) {
    console.error('Admin users error:', err);
    req.flash('error_msg', 'Error loading users');
    res.redirect('/admin');
  }
});

// Toggle user admin status
router.post('/users/:id/toggle-admin', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      req.flash('error_msg', 'User not found');
      return res.redirect('/admin/users');
    }
    
    user.isAdmin = !user.isAdmin;
    await user.save();
    
    req.flash('success_msg', `User ${user.username} admin status updated`);
    res.redirect('/admin/users');
  } catch (err) {
    console.error('Toggle admin error:', err);
    req.flash('error_msg', 'Error updating user');
    res.redirect('/admin/users');
  }
});

// Delete user
router.post('/users/:id/delete', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      req.flash('error_msg', 'User not found');
      return res.redirect('/admin/users');
    }
    
    // Prevent admin from deleting themselves
    if (user._id.toString() === req.session.user._id.toString()) {
      req.flash('error_msg', 'You cannot delete your own account');
      return res.redirect('/admin/users');
    }
    
    await User.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'User deleted successfully');
    res.redirect('/admin/users');
  } catch (err) {
    console.error('Delete user error:', err);
    req.flash('error_msg', 'Error deleting user');
    res.redirect('/admin/users');
  }
});

export default router; 