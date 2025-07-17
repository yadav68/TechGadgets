import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';
import passport from 'passport';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import Product from './models/Product.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// CORS for React development
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : 'http://localhost:3000',
  credentials: true
}));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
app.use(flash());

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.session.user || null;
  
  // Debug: Log what user data is available to templates
  console.log('Template user data:', res.locals.user);
  
  next();
});

// API Routes
import productsRouter from './routes/products.js';
import authRouter from './routes/auth.js';
import cartRouter from './routes/cart.js';
import adminRouter from './routes/admin.js';
// Removed: import { logout, postLogin, postRegister, getCurrentUser } from './controllers/authController.js';

// API routes
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);
app.use('/api/admin', adminRouter);

// Removed direct auth routes (API):
// app.post('/api/login', postLogin);
// app.post('/api/register', postRegister);
// app.get('/api/logout', logout);
// app.get('/api/user', getCurrentUser);

// API Homepage route
app.get('/api', async (req, res) => {
  try {
    // Get all products, sorted by category
    const products = await Product.find().lean();
    // Group products by category
    const productsByCategory = {};
    products.forEach(product => {
      if (!productsByCategory[product.category]) {
        productsByCategory[product.category] = [];
      }
      productsByCategory[product.category].push(product);
    });
    res.json({ productsByCategory });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client', 'build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
  });
} else {
  // Serve static files in development
  app.use(express.static(path.join(__dirname, 'public')));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`React dev server should run on http://localhost:3000`);
  }
}); 