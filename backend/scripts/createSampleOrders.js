import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

dotenv.config();

const createSampleOrders = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Get a user (assuming the first user is admin)
    const user = await User.findOne();
    if (!user) {
      console.log('No users found. Please create a user first.');
      return;
    }

    // Get some products
    const products = await Product.find().limit(3);
    if (products.length === 0) {
      console.log('No products found. Please create products first.');
      return;
    }

    // Create sample orders
    const sampleOrders = [
      {
        user: user._id,
        items: [
          {
            product: products[0]._id,
            name: products[0].name,
            price: products[0].price,
            quantity: 2,
            image: products[0].image
          }
        ],
        totalAmount: products[0].price * 2,
        status: 'pending',
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        paymentMethod: 'credit_card',
        paymentStatus: 'pending'
      },
      {
        user: user._id,
        items: [
          {
            product: products[1]._id,
            name: products[1].name,
            price: products[1].price,
            quantity: 1,
            image: products[1].image
          },
          {
            product: products[2]._id,
            name: products[2].name,
            price: products[2].price,
            quantity: 1,
            image: products[2].image
          }
        ],
        totalAmount: products[1].price + products[2].price,
        status: 'processing',
        shippingAddress: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'USA'
        },
        paymentMethod: 'paypal',
        paymentStatus: 'completed'
      },
      {
        user: user._id,
        items: [
          {
            product: products[0]._id,
            name: products[0].name,
            price: products[0].price,
            quantity: 1,
            image: products[0].image
          }
        ],
        totalAmount: products[0].price,
        status: 'delivered',
        shippingAddress: {
          street: '789 Pine Rd',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA'
        },
        paymentMethod: 'debit_card',
        paymentStatus: 'completed'
      }
    ];

    // Clear existing orders
    await Order.deleteMany({});
    console.log('Cleared existing orders');

    // Create new orders
    for (const orderData of sampleOrders) {
      const order = new Order(orderData);
      await order.save();
      console.log(`Created order: ${order.orderNumber}`);
    }

    console.log('Sample orders created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createSampleOrders(); 