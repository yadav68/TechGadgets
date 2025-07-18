import Product from '../models/Product.js';
import Category from '../models/Category.js';

// List all products (public)
export const listProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate('category', 'name')
      .sort({ createdAt: -1 });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// View a single product (public)
export const showProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name description');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Show create form (admin only)
export const showCreateForm = (req, res) => {
  res.render('products/create', { title: 'Add Product' });
};

// Create product (admin only)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;
    
    // Validate category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ error: 'Category not found' });
    }
    
    const product = await Product.create({ name, description, price, image, category, stock });
    const populatedProduct = await Product.findById(product._id).populate('category', 'name');
    
    res.status(201).json({ 
      message: 'Product created successfully',
      product: populatedProduct
    });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Show edit form (admin only)
export const showEditForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.render('products/edit', { title: 'Edit Product', product });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Update product (admin only)
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;
    
    // Validate category exists if it's being updated
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ error: 'Category not found' });
      }
    }
    
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      { name, description, price, image, category, stock },
      { new: true }
    ).populate('category', 'name');
    
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ 
      message: 'Product updated successfully',
      product 
    });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete product (admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
}; 