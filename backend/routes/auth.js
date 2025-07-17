import express from 'express';
import { postRegister, postLogin, logout } from '../controllers/authController.js';

const router = express.Router();

// Register user
router.post('/register', postRegister);

// Login user
router.post('/login', postLogin);

// Logout user
router.get('/logout', logout);

export default router; 