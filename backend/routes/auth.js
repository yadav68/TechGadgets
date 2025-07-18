import express from 'express';
import { postRegister, postLogin, logout, getCurrentUser } from '../controllers/authController.js';

const router = express.Router();

// Register user
router.post('/register', postRegister);

// Login user
router.post('/login', postLogin);

// Logout user
router.get('/logout', logout);

// Get current user
router.get('/user', getCurrentUser);

export default router; 