"""# TechGadgets Backend API

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/express-%5E4.18.2-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/mongodb-%5E7.5.0-green)](https://www.mongodb.com/)

The backend API server for the TechGadgets e-commerce platform, built with Node.js, Express.js, and MongoDB.

## 🎯 Features

- **RESTful API** with Express.js
- **MongoDB integration** with Mongoose ODM
- **User Authentication** with Passport.js and JWT
- **Session Management** with express-session
- **File Upload** capabilities with Multer
- **Data Validation** with express-validator
- **CORS** enabled for frontend communication
- **Environment-based Configuration**

## 🏗️ Architecture

### Directory Structure

```
backend/
├── 📁 controllers/          # Business logic controllers
│   ├── authController.js    # User authentication logic
│   ├── categoryController.js # Category management
│   ├── orderController.js   # Order processing
│   └── productsController.js # Product management
├── 📁 middleware/           # Custom middleware
│   └── auth.js             # Authentication middleware
├── 📁 models/              # MongoDB data models
│   ├── Category.js         # Product category schema
│   ├── Order.js           # Order schema
│   ├── Product.js         # Product schema
│   └── User.js            # User schema
├── 📁 routes/              # API route definitions
│   ├── admin.js           # Admin routes
│   ├── auth.js            # Authentication routes
│   ├── cart.js            # Shopping cart routes
│   ├── categories.js      # Category routes
│   ├── orders.js          # Order routes
│   └── products.js        # Product routes
├── 📁 scripts/             # Utility scripts
│   ├── assignCategories.js # Category assignment script
│   ├── createSampleOrders.js # Sample data creation
│   └── migrateCategories.js # Database migration
├── 📁 public/              # Static assets
│   └── css/               # Stylesheets
└── server.js              # Main application entry point
```

### Key Components

#### Controllers

- **authController.js**: Handles user registration, login, and token management
- **categoryController.js**: Manages product categories (CRUD operations)
- **orderController.js**: Processes order creation, updates, and retrieval
- **productsController.js**: Manages product catalog and inventory

#### Models

- **User.js**: User authentication and profile data
- **Product.js**: Product information, pricing, and inventory
- **Category.js**: Product categorization system
- **Order.js**: Order details, status, and customer information

#### Routes

- **auth.js**: `/api/auth/*` - Authentication endpoints
- **products.js**: `/api/products/*` - Product catalog endpoints
- **categories.js**: `/api/categories/*` - Category management
- **orders.js**: `/api/orders/*` - Order processing
- **cart.js**: `/api/cart/*` - Shopping cart operations
- **admin.js**: `/api/admin/*` - Administrative functions

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env` file in the backend directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/techgadgets

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters
SESSION_SECRET=your_session_secret_here

# Server Configuration
PORT=5002
NODE_ENV=development

# CORS Configuration
CLIENT_URL=http://localhost:3000

# Optional: File Upload Configuration
UPLOAD_PATH=./public/uploads
MAX_FILE_SIZE=5242880
```

### Database Setup

1. **Start MongoDB** (if running locally):

   ```bash
   mongod
   ```

2. **Run database migrations** (if needed):
   ```bash
   npm run migrate
   ```

### Running the Server

#### Development Mode (with auto-reload)

```bash
npm run dev
```

#### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5002`

## 📡 API Endpoints

### Authentication

```
POST   /api/auth/register    # User registration
POST   /api/auth/login       # User login
POST   /api/auth/logout      # User logout
GET    /api/auth/profile     # Get user profile
PUT    /api/auth/profile     # Update user profile
```

### Products

```
GET    /api/products         # Get all products (with pagination)
GET    /api/products/:id     # Get product by ID
POST   /api/products         # Create new product (admin)
PUT    /api/products/:id     # Update product (admin)
DELETE /api/products/:id     # Delete product (admin)
GET    /api/products/search  # Search products
```

### Categories

```
GET    /api/categories       # Get all categories
GET    /api/categories/:id   # Get category by ID
POST   /api/categories       # Create category (admin)
PUT    /api/categories/:id   # Update category (admin)
DELETE /api/categories/:id   # Delete category (admin)
```

### Orders

```
GET    /api/orders           # Get user orders
GET    /api/orders/:id       # Get order by ID
POST   /api/orders           # Create new order
PUT    /api/orders/:id       # Update order status (admin)
```

### Cart

```
GET    /api/cart             # Get user cart
POST   /api/cart/add         # Add item to cart
PUT    /api/cart/update      # Update cart item
DELETE /api/cart/remove      # Remove item from cart
DELETE /api/cart/clear       # Clear cart
```

## 🔧 Scripts

### Available npm Scripts

```bash
npm start          # Start server in production mode
npm run dev        # Start server in development mode with nodemon
npm run migrate    # Run database migrations
```

### Utility Scripts

```bash
# Assign categories to existing products
node scripts/assignCategories.js

# Create sample orders for testing
node scripts/createSampleOrders.js

# Migrate category data
node scripts/migrateCategories.js
```

## 🛡️ Security Features

- **Password Hashing** with bcryptjs
- **JWT Token Authentication**
- **Session Management** with secure cookies
- **Input Validation** with express-validator
- **CORS Protection**
- **Rate Limiting** (recommended for production)
- **Environment Variable Protection**

## 🔍 Middleware

### Authentication Middleware (`middleware/auth.js`)

Protects routes that require user authentication.

```javascript
// Usage example
router.get("/protected-route", auth, controller.method);
```

## 🗄️ Database Models

### User Model

```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  role: String (user/admin),
  profile: {
    firstName: String,
    lastName: String,
    address: Object
  },
  createdAt: Date
}
```

### Product Model

```javascript
{
  name: String,
  description: String,
  price: Number,
  category: ObjectId,
  image: String,
  stock: Number,
  featured: Boolean,
  createdAt: Date
}
```

## 🧪 Testing

```bash
# Run tests (if implemented)
npm test

# Run tests with coverage
npm run test:coverage
```

## 📊 Performance Considerations

- **Database Indexing** on frequently queried fields
- **Pagination** for large datasets
- **Image Optimization** for product photos
- **Caching Strategy** (Redis recommended for production)
- **Connection Pooling** with MongoDB

## 🚀 Deployment

### Production Checklist

1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Set secure JWT secrets
4. Enable HTTPS
5. Implement rate limiting
6. Set up monitoring and logging
7. Configure reverse proxy (nginx)

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/techgadgets
JWT_SECRET=your_super_secure_production_secret
SESSION_SECRET=your_production_session_secret
PORT=5002
CLIENT_URL=https://yourdomain.com
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Add tests if applicable
4. Run linting and tests
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🔗 Related

- [Frontend README](../client/README.md)
- [Root Project README](../README.md)

---

**Part of the TechGadgets E-Commerce Platform**
""
