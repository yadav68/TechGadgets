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
  
  res.json({ 
    cart, 
    total: total 
  });
});

// Add item to cart
router.post('/add/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
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
    
    res.json({ 
      message: 'Item added to cart',
      cart: req.session.cart
    });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ error: 'Error adding item to cart' });
  }
});

// Remove item from cart
router.delete('/remove/:id', (req, res) => {
  if (!req.session.cart) {
    return res.status(400).json({ error: 'Cart is empty' });
  }
  
  const itemId = req.params.id;
  req.session.cart = req.session.cart.filter(item => item._id.toString() !== itemId);
  
  res.json({ 
    message: 'Item removed from cart',
    cart: req.session.cart
  });
});

// Update item quantity
router.put('/update/:id', (req, res) => {
  const { quantity } = req.body;
  const itemId = req.params.id;
  
  if (!req.session.cart) {
    return res.status(400).json({ error: 'Cart is empty' });
  }
  
  const item = req.session.cart.find(item => item._id.toString() === itemId);
  if (item) {
    if (quantity > 0) {
      item.quantity = parseInt(quantity);
    } else {
      req.session.cart = req.session.cart.filter(item => item._id.toString() !== itemId);
    }
  }
  
  res.json({ 
    message: 'Cart updated',
    cart: req.session.cart
  });
});

// Clear cart
router.delete('/clear', (req, res) => {
  req.session.cart = [];
  res.json({ message: 'Cart cleared' });
});

export default router; 