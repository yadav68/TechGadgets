import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/techgadgets';

// Default categories
const defaultCategories = [
  { name: 'Electronics', description: 'Electronic devices and gadgets' },
  { name: 'Computers', description: 'Desktop and laptop computers' },
  { name: 'Mobile Devices', description: 'Smartphones and tablets' },
  { name: 'Accessories', description: 'Tech accessories and peripherals' },
  { name: 'Gaming', description: 'Gaming consoles and accessories' },
  { name: 'Audio', description: 'Headphones, speakers, and audio equipment' },
  { name: 'Cameras', description: 'Digital cameras and photography equipment' },
  { name: 'Smart Home', description: 'Smart home devices and automation' }
];

// Category mapping for existing products
const categoryMapping = {
  'Screen': 'Electronics',
  'mac': 'Computers',
  'laptop': 'Computers',
  'phone': 'Mobile Devices',
  'tablet': 'Mobile Devices',
  'headphone': 'Audio',
  'speaker': 'Audio',
  'camera': 'Cameras',
  'gaming': 'Gaming',
  'accessory': 'Accessories',
  'smart': 'Smart Home'
};

async function migrateCategories() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create default categories
    console.log('Creating default categories...');
    for (const categoryData of defaultCategories) {
      const existingCategory = await Category.findOne({ name: categoryData.name });
      if (!existingCategory) {
        const category = new Category(categoryData);
        await category.save();
        console.log(`Created category: ${categoryData.name}`);
      } else {
        console.log(`Category already exists: ${categoryData.name}`);
      }
    }

    // Get all categories for mapping
    const categories = await Category.find();
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    // Migrate existing products
    console.log('Migrating existing products...');
    const products = await Product.find({ category: { $type: 'string' } });
    
    for (const product of products) {
      const oldCategory = product.category;
      let newCategoryId = null;

      // Try to find matching category
      for (const [key, categoryName] of Object.entries(categoryMapping)) {
        if (oldCategory.toLowerCase().includes(key.toLowerCase())) {
          newCategoryId = categoryMap[categoryName];
          break;
        }
      }

      // If no match found, use 'Accessories' as default
      if (!newCategoryId) {
        newCategoryId = categoryMap['Accessories'];
      }

      // Update product
      product.category = newCategoryId;
      await product.save();
      console.log(`Migrated product "${product.name}" from "${oldCategory}" to category ID: ${newCategoryId}`);
    }

    console.log('Migration completed successfully!');
    
    // Display summary
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    console.log(`\nSummary:`);
    console.log(`- Total categories: ${totalCategories}`);
    console.log(`- Total products: ${totalProducts}`);

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run migration
migrateCategories(); 