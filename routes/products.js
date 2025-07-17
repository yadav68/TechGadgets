import express from 'express';
import {
  listProducts,
  showProduct,
  showCreateForm,
  createProduct,
  showEditForm,
  updateProduct,
  deleteProduct
} from '../controllers/productsController.js';
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();

// List all products (public)
router.get('/', listProducts);
// Create product (admin only)
router.get('/new', isAdmin, showCreateForm);
router.post('/', isAdmin, createProduct);
// View a single product (public)
router.get('/:id', showProduct);
// Edit product (admin only)
router.get('/:id/edit', isAdmin, showEditForm);
router.post('/:id', isAdmin, updateProduct);
// Delete product (admin only)
router.post('/:id/delete', isAdmin, deleteProduct);

export default router; 