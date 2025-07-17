import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// View cart
router.get('/', (req, res) => {
  const cart = req.session.cart || [];
  let total = 0;
  
  // Calculate total
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  
  res.render('cart/index', { 
    title: 'Shopping Cart', 
    cart, 
    total: total.toFixed(2) 
  });
});

// Add item to cart
router.post('/add/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash('error_msg', 'Product not found');
      return res.redirect('/products');
    }
    
    // Initialize cart if it doesn't exist
    if (!req.session.cart) {
      req.session.cart = [];
    }
    
    // Check if item already exists in cart
    const existingItem = req.session.cart.find(item => item._id.toString() === product._id.toString());
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      req.session.cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    req.flash('success_msg', 'Item added to cart');
    res.redirect('/cart');
  } catch (err) {
    console.error('Add to cart error:', err);
    req.flash('error_msg', 'Error adding item to cart');
    res.redirect('/products');
  }
});

// Remove item from cart
router.post('/remove/:id', (req, res) => {
  if (!req.session.cart) {
    req.flash('error_msg', 'Cart is empty');
    return res.redirect('/cart');
  }
  
  const itemId = req.params.id;
  req.session.cart = req.session.cart.filter(item => item._id.toString() !== itemId);
  
  req.flash('success_msg', 'Item removed from cart');
  res.redirect('/cart');
});

// Update item quantity
router.post('/update/:id', (req, res) => {
  const { quantity } = req.body;
  const itemId = req.params.id;
  
  if (!req.session.cart) {
    req.flash('error_msg', 'Cart is empty');
    return res.redirect('/cart');
  }
  
  const item = req.session.cart.find(item => item._id.toString() === itemId);
  if (item) {
    if (quantity > 0) {
      item.quantity = parseInt(quantity);
    } else {
      req.session.cart = req.session.cart.filter(item => item._id.toString() !== itemId);
    }
  }
  
  req.flash('success_msg', 'Cart updated');
  res.redirect('/cart');
});

// Clear cart
router.post('/clear', (req, res) => {
  req.session.cart = [];
  req.flash('success_msg', 'Cart cleared');
  res.redirect('/cart');
});

export default router; 