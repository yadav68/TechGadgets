import express from "express";
import {
  getCurrentUser,
  logout,
  postLogin,
  postRegister,
  updatePassword,
  updateProfile,
} from "../controllers/authController.js";

const router = express.Router();

// Register user
router.post("/register", postRegister);

// Login user
router.post("/login", postLogin);

// Logout user
router.get("/logout", logout);

// Get current user
router.get("/user", getCurrentUser);

// Update user profile
router.put("/profile", updateProfile);

// Update user password
router.put("/password", updatePassword);

export default router;
