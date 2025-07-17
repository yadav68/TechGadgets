import Product from '../models/Product.js';

// List all products (public)
export const listProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products/index', { title: 'Products', products });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// View a single product (public)
export const showProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.render('products/show', { title: product.name, product });
  } catch (err) {
    res.status(500).send('Server Error');
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
    await Product.create({ name, description, price, image, category, stock });
    req.flash('success_msg', 'Product created successfully');
    res.redirect('/products');
  } catch (err) {
    res.status(500).send('Server Error');
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
    await Product.findByIdAndUpdate(req.params.id, { name, description, price, image, category, stock, updatedAt: Date.now() });
    req.flash('success_msg', 'Product updated successfully');
    res.redirect('/products/' + req.params.id);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Delete product (admin only)
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Product deleted successfully');
    res.redirect('/products');
  } catch (err) {
    res.status(500).send('Server Error');
  }
}; 