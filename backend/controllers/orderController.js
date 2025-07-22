import Order from '../models/Order.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'username email')
      .populate('items.product', 'name image')
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.session.user._id })
      .populate('items.product', 'name image')
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    console.error('Error fetching user orders:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'username email')
      .populate('items.product', 'name image description');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if user is authorized to view this order
    if (!req.session.user.isAdmin && order.user._id.toString() !== req.session.user._id) {
      return res.status(403).json({ error: 'Not authorized to view this order' });
    }

    res.json({ order });
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create new order
export const createOrder = async (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;
  
  try {
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    // Validate and prepare order items
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ error: `Product ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Insufficient stock for ${product.name}. Available: ${product.stock}` 
        });
      }

      // Update product stock
      product.stock -= item.quantity;
      await product.save();

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image
      });

      totalAmount += product.price * item.quantity;
    }

    const order = new Order({
      user: req.session.user._id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod
    });

    await order.save();

    // Clear user's cart after successful order
    req.session.cart = [];

    res.status(201).json({ 
      message: 'Order created successfully',
      order 
    });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Update order status (admin)
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({ 
      message: 'Order status updated successfully',
      order 
    });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Update payment status (admin)
export const updatePaymentStatus = async (req, res) => {
  const { paymentStatus } = req.body;
  
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.paymentStatus = paymentStatus;
    await order.save();

    res.json({ 
      message: 'Payment status updated successfully',
      order 
    });
  } catch (err) {
    console.error('Error updating payment status:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if user is authorized to cancel this order
    if (!req.session.user.isAdmin && order.user.toString() !== req.session.user._id) {
      return res.status(403).json({ error: 'Not authorized to cancel this order' });
    }

    // Only allow cancellation of pending orders
    if (order.status !== 'pending') {
      return res.status(400).json({ 
        error: 'Only pending orders can be cancelled' 
      });
    }

    // Restore product stock
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    order.status = 'cancelled';
    await order.save();

    res.json({ 
      message: 'Order cancelled successfully',
      order 
    });
  } catch (err) {
    console.error('Error cancelling order:', err);
    res.status(500).json({ error: 'Server Error' });
  }
}; 