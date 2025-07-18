import express from 'express';
import {
  listProducts,
  showProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productsController.js';
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();

// List all products (public)
router.get('/', listProducts);

// View a single product (public)
router.get('/:id', showProduct);

// Create product (admin only)
router.post('/', isAdmin, createProduct);

// Update product (admin only)
router.put('/:id', isAdmin, updateProduct);
router.patch('/:id', isAdmin, updateProduct);

// Delete product (admin only)
router.delete('/:id', isAdmin, deleteProduct);

export default router; 