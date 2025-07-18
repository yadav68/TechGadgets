import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

dotenv.config();

const assignCategories = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Get all categories
    const categories = await Category.find({ isActive: true });
    console.log('Available categories:', categories.map(c => c.name));

    // Get all products without categories
    const products = await Product.find({});
    console.log(`Found ${products.length} products`);

    // Assign categories based on product names
    for (const product of products) {
      let categoryId = null;
      
      // Simple logic to assign categories based on product name
      const name = product.name.toLowerCase();
      
      if (name.includes('mac') || name.includes('computer') || name.includes('laptop')) {
        categoryId = categories.find(c => c.name === 'Computers')?._id;
      } else if (name.includes('monitor') || name.includes('display') || name.includes('screen')) {
        categoryId = categories.find(c => c.name === 'Accessories')?._id;
      } else if (name.includes('phone') || name.includes('mobile') || name.includes('tablet')) {
        categoryId = categories.find(c => c.name === 'Mobile Devices')?._id;
      } else if (name.includes('camera') || name.includes('photo')) {
        categoryId = categories.find(c => c.name === 'Cameras')?._id;
      } else if (name.includes('headphone') || name.includes('speaker') || name.includes('audio')) {
        categoryId = categories.find(c => c.name === 'Audio')?._id;
      } else if (name.includes('game') || name.includes('console')) {
        categoryId = categories.find(c => c.name === 'Gaming')?._id;
      } else {
        // Default to Electronics
        categoryId = categories.find(c => c.name === 'Electronics')?._id;
      }

      if (categoryId) {
        await Product.findByIdAndUpdate(product._id, { category: categoryId });
        console.log(`Assigned category to ${product.name}`);
      } else {
        console.log(`Could not assign category to ${product.name}`);
      }
    }

    console.log('Category assignment completed');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

assignCategories(); 