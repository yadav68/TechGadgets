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

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
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

// Routes
import productsRouter from './routes/products.js';
import authRouter from './routes/auth.js';
import cartRouter from './routes/cart.js';
import adminRouter from './routes/admin.js';
import { logout, getLogin, postLogin, getRegister, postRegister } from './controllers/authController.js';

app.use('/products', productsRouter);
app.use('/auth', authRouter);
app.use('/cart', cartRouter);
app.use('/admin', adminRouter);

// Direct auth routes
app.get('/login', getLogin);
app.post('/login', postLogin);
app.get('/register', getRegister);
app.post('/register', postRegister);
app.get('/logout', logout);

app.get('/', async (req, res) => {
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
    res.render('index', { title: 'Tech Gadgets Home', productsByCategory });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// TODO: Add product, auth, cart, admin routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 