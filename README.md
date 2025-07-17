# Tech Gadgets - MERN Stack E-commerce

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- **User Authentication**: Register, login, logout with session management
- **Product Management**: Browse products, view details, add to cart
- **Shopping Cart**: Add/remove items, update quantities, clear cart
- **Admin Panel**: Manage products and users, toggle admin privileges
- **Responsive Design**: Modern UI that works on desktop and mobile

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Session-based authentication** with express-session
- **Password hashing** with bcryptjs
- **CORS** enabled for React frontend

### Frontend
- **React** with functional components and hooks
- **React Router** for navigation
- **Fetch API** for backend communication
- **CSS** for styling (preserved from original EJS design)

## Project Structure

```
TechGadgets/
├── backend/                # Express/MongoDB backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── public/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   The React app will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/logout` - User logout
- `GET /api/user` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add/:id` - Add item to cart
- `PUT /api/cart/update/:id` - Update cart item quantity
- `DELETE /api/cart/remove/:id` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Admin
- `GET /api/admin` - Admin dashboard data
- `GET /api/admin/products` - Get all products for admin
- `GET /api/admin/users` - Get all users for admin
- `PUT /api/admin/users/:id/toggle-admin` - Toggle user admin status
- `DELETE /api/admin/users/:id` - Delete user

## Development

### Running in Development Mode
1. Start the backend server (port 5000)
2. Start the React development server (port 3000)
3. The React app will proxy API requests to the backend

### Production Build
1. Build the React app:
   ```bash
   cd client
   npm run build
   ```
2. Set `NODE_ENV=production` in your environment
3. Start the backend server - it will serve the React build files

## Migration from EJS to React

This project was migrated from an EJS-based frontend to React while preserving:
- All original functionality
- UI design and styling
- User experience
- Backend API structure

The migration involved:
- Converting EJS templates to React components
- Setting up React Router for navigation
- Creating API service functions
- Updating backend to serve JSON instead of rendered views
- Adding CORS support for development
- Configuring production build serving

## License

This project is open source and available under the [MIT License](LICENSE).
# techgadgetsMERN
