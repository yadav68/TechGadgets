import express from 'express';
import { getRegister, postRegister, getLogin, postLogin, logout } from '../controllers/authController.js';

const router = express.Router();

// Register form
router.get('/register', getRegister);

// Register user
router.post('/register', postRegister);

// Login form
router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/logout', logout);

export default router; 