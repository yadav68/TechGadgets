import Category from '../models/Category.js';
import mongoose from 'mongoose';

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    res.json({ categories });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get all categories (admin - including inactive)
export const getAllCategoriesAdmin = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ categories });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ category });
  } catch (err) {
    console.error('Error fetching category:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create new category
export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  
  try {
    // Check if category already exists
    const existingCategory = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const category = new Category({
      name,
      description
    });

    await category.save();
    res.status(201).json({ 
      message: 'Category created successfully',
      category 
    });
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  const { name, description, isActive } = req.body;
  
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Check if name is being changed and if it conflicts with existing category
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({ 
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        _id: { $ne: req.params.id }
      });
      if (existingCategory) {
        return res.status(400).json({ error: 'Category name already exists' });
      }
    }

    category.name = name || category.name;
    category.description = description !== undefined ? description : category.description;
    category.isActive = isActive !== undefined ? isActive : category.isActive;

    await category.save();
    res.json({ 
      message: 'Category updated successfully',
      category 
    });
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Check if category has products
    const Product = mongoose.model('Product');
    const productsWithCategory = await Product.find({ category: req.params.id });
    
    if (productsWithCategory.length > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete category. It has associated products.' 
      });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ error: 'Server Error' });
  }
}; 