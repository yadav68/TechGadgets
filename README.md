# TechGadgets E-commerce Platform

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce application with complete order management, user authentication, and admin dashboard.

## 🚀 Features

### User Features
- **Product Browsing**: View products organized by categories
- **Shopping Cart**: Add, remove, and update cart items
- **User Authentication**: Register, login, and logout functionality
- **Order Management**: Place orders, view order history, and track order status
- **Checkout Process**: Complete checkout with shipping information and payment methods

### Admin Features
- **Product Management**: Create, edit, and delete products
- **Category Management**: Organize products by categories
- **Order Management**: View all orders, update order status, and payment status
- **User Management**: View users and manage admin privileges
- **Dashboard**: Overview of products, users, categories, and orders

### Technical Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Session-based Authentication**: Secure user sessions
- **Stock Management**: Automatic stock updates when orders are placed
- **Order Status Tracking**: Real-time order status updates
- **Payment Status Management**: Track payment completion

## 🛠️ Tech Stack

### Frontend
- **React.js**: User interface and components
- **React Router**: Navigation and routing
- **CSS3**: Modern styling with gradients and animations

### Backend
- **Node.js**: Server runtime
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: Object modeling for MongoDB
- **Express Session**: Session management
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Development Tools
- **Concurrently**: Run frontend and backend simultaneously
- **Nodemon**: Auto-restart server on changes

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd MERN
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   
   Create `.env` file in `TechGadgets/backend/`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/techgadgets
   SESSION_SECRET=your-super-secret-session-key-change-this-in-production
   PORT=5002
   NODE_ENV=development
   REACT_APP_API_URL=http://localhost:5002/api
   JWT_SECRET=your-jwt-secret-key-change-this-in-production
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   brew services start mongodb-community
   ```

5. **Run the application**
   ```bash
   npm run dev
   ```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5002/api
- **Admin Dashboard**: http://localhost:3000/admin (admin access required)

## 📁 Project Structure

```
MERN/
├── TechGadgets/
│   ├── backend/
│   │   ├── controllers/     # Business logic
│   │   ├── middleware/      # Authentication middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── scripts/        # Database scripts
│   │   └── server.js       # Main server file
│   └── client/
│       ├── public/         # Static files
│       ├── src/
│       │   ├── components/ # Reusable components
│       │   ├── pages/      # Page components
│       │   ├── services/   # API services
│       │   └── App.js      # Main app component
│       └── package.json
├── package.json            # Root package.json
└── README.md
```

## 🔧 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend React app
- `npm run install-all` - Install dependencies for all packages
- `npm run build` - Build the React app for production

## 🗄️ Database Setup

### Create Sample Data

1. **Categories**: Run the migration script
   ```bash
   cd TechGadgets/backend
   node scripts/migrateCategories.js
   ```

2. **Assign Categories to Products**
   ```bash
   node scripts/assignCategories.js
   ```

3. **Create Sample Orders** (optional)
   ```bash
   node scripts/createSampleOrders.js
   ```

## 🔐 Authentication

### User Roles
- **Regular User**: Can browse products, manage cart, place orders
- **Admin User**: Full access to admin dashboard and management features

### Default Admin User
The first registered user automatically becomes an admin. You can also manually set admin privileges through the admin dashboard.

## 🛒 Order System

### Order Status Flow
1. **Pending** → Order placed, awaiting processing
2. **Processing** → Order being prepared
3. **Shipped** → Order shipped to customer
4. **Delivered** → Order successfully delivered
5. **Cancelled** → Order cancelled (only pending orders can be cancelled)

### Payment Status
- **Pending** → Payment not yet processed
- **Completed** → Payment successful
- **Failed** → Payment failed

## 🎨 Features Overview

### Homepage
- Welcome hero section
- Products organized by category
- Quick access to shopping

### Products Page
- All products with category grouping
- Product details and images
- Add to cart functionality
- Admin controls for product management

### Cart Page
- View cart items
- Update quantities
- Remove items
- Proceed to checkout

### Checkout Page
- Order summary
- Shipping information form
- Payment method selection
- Order placement

### User Orders
- Order history
- Order status tracking
- Order cancellation (pending orders only)
- Detailed order view

### Admin Dashboard
- Overview statistics
- Quick access to management pages
- Recent orders and users

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables for production
2. Deploy to platforms like Heroku, Railway, or DigitalOcean
3. Configure MongoDB Atlas for database

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages
3. Update API URLs for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Tech Gadgets Team

---

**Note**: This is a development version. For production deployment, ensure to:
- Change all secret keys
- Set up proper environment variables
- Configure CORS for your domain
- Set up proper MongoDB security
- Implement proper error handling and logging 