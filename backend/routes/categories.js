import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getAllCategoriesAdmin,
  getCategoriesWithProductCount,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";
import { isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getAllCategories);
router.get("/with-product-count", getCategoriesWithProductCount);
router.get("/:id", getCategoryById);

// Admin routes
router.get("/admin/all", isAdmin, getAllCategoriesAdmin);
router.post("/", isAdmin, createCategory);
router.put("/:id", isAdmin, updateCategory);
router.delete("/:id", isAdmin, deleteCategory);

export default router;
