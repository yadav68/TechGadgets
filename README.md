# TechGadgets - MERN Stack E-commerce Platform

A modern, full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring a responsive design, real-time updates, comprehensive admin functionality, and complete order management system.

## 🚀 Features

### **User Features**
- **User Authentication**: Secure login/register system with session management
- **Product Browsing**: Browse products by category with horizontal scrolling
- **Product Details**: Detailed product pages with related products
- **Shopping Cart**: Real-time cart updates with instant price calculations
- **Order Management**: Complete checkout process and order history
- **Responsive Design**: Mobile-friendly interface with modern UI/UX
- **Toast Notifications**: Real-time feedback for user actions

### **Admin Features**
- **Admin Dashboard**: Comprehensive admin panel with statistics
- **Product Management**: CRUD operations for products with category organization
- **User Management**: View and manage user accounts
- **Order Management**: View, update, and manage all orders
- **Category Management**: Create and manage product categories
- **Inventory Management**: Track product stock levels

### **Technical Features**
- **Real-time Updates**: Cart and prices update instantly without page refresh
- **Session Management**: Secure user sessions with MongoDB storage
- **API-driven**: RESTful API architecture
- **Modern UI**: Dark theme with gradient accents and smooth animations
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Order Processing**: Complete order lifecycle management

## 🛠️ Tech Stack

### **Frontend**
- **React.js** - User interface and state management
- **React Router** - Client-side routing
- **CSS3** - Custom styling with modern design patterns
- **Fetch API** - HTTP requests to backend

### **Backend**
- **Node.js** - Server runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Express Session** - Session management
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
TechGadgets/
├── backend/                 # Express.js server
│   ├── controllers/         # Route controllers
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── orderController.js
│   │   └── productsController.js
│   ├── middleware/          # Custom middleware
│   │   └── auth.js
│   ├── models/             # MongoDB schemas
│   │   ├── Category.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/             # API routes
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── cart.js
│   │   ├── categories.js
│   │   ├── orders.js
│   │   └── products.js
│   ├── scripts/            # Database scripts
│   ├── public/             # Static files
│   ├── server.js           # Server entry point
│   └── package.json        # Backend dependencies
├── client/                 # React frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Layout.js
│   │   │   ├── Toast.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/          # Page components
│   │   │   ├── AdminCategories.js
│   │   │   ├── AdminDashboard.js
│   │   │   ├── AdminOrders.js
│   │   │   ├── AdminProducts.js
│   │   │   ├── AdminUsers.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── OrderDetail.js
│   │   │   ├── ProductCreate.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── ProductEdit.js
│   │   │   ├── Products.js
│   │   │   ├── Register.js
│   │   │   └── UserOrders.js
│   │   ├── services/       # API services
│   │   │   └── api.js
│   │   └── App.js          # Main app component
│   └── package.json        # Frontend dependencies
├── package.json            # Root dependencies
└── README.md              # Project documentation
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yadav68/TechGadgets.git
   cd TechGadgets
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/techgadgets
   
   # Server Configuration
   PORT=5002
   NODE_ENV=development
   
   # Session Configuration
   SESSION_SECRET=your-super-secret-session-key-change-this-in-production
   
   # Frontend URL (for CORS)
   CLIENT_URL=http://localhost:3000
   
   # Optional: MongoDB Atlas (if using cloud database)
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techgadgets
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB (if running locally)
   mongod
   
   # Run database migration scripts (optional)
   cd backend/scripts
   node migrateCategories.js
   ```

5. **Start the application**
   ```bash
   # From the root directory
   npm run dev
   ```
   
   This will start both the backend server (port 5002) and React development server (port 3000).

### **Manual Start (Alternative)**
   ```bash
   # Start backend server
   cd backend
   npm start
   
   # Start frontend (in a new terminal)
   cd client
   npm start
   ```

## 📱 Usage

### **For Users**
1. **Browse Products**: Visit the homepage to see products organized by category
2. **View Details**: Click on any product to see detailed information
3. **Add to Cart**: Use "Buy Now" or "Add to Cart" buttons
4. **Manage Cart**: View cart, update quantities, and proceed to checkout
5. **Checkout**: Complete order with shipping and payment information
6. **Order History**: View your past orders and their status
7. **Account**: Register/login to save your information

### **For Admins**
1. **Login**: Use admin credentials to access admin panel
2. **Dashboard**: View site statistics and overview
3. **Manage Products**: Add, edit, or delete products with category assignment
4. **Manage Categories**: Create and organize product categories
5. **User Management**: View and manage user accounts
6. **Order Management**: View, update status, and manage all orders

## 🔧 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### **Products**
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### **Categories**
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### **Cart**
- `GET /api/cart` - Get user cart
- `POST /api/cart/add/:id` - Add item to cart
- `PUT /api/cart/update/:id` - Update cart item quantity
- `DELETE /api/cart/remove/:id` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### **Orders**
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get specific order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (admin only)
- `GET /api/admin/orders` - Get all orders (admin only)

### **Admin**
- `GET /api/admin` - Admin dashboard data
- `GET /api/admin/products` - Admin products view
- `GET /api/admin/users` - Admin users view
- `GET /api/admin/categories` - Admin categories view

## 🎨 Features in Detail

### **Real-time Cart Updates**
- Instant price calculations
- No need to click update buttons
- Automatic total recalculation
- Visual feedback during updates

### **Category-based Organization**
- Products grouped by category
- Horizontal scrolling within categories
- Clear category headers
- Easy navigation and browsing

### **Order Management**
- Complete checkout process
- Order status tracking
- Order history for users
- Admin order management
- Order details with product information

### **Modern UI/UX**
- Dark theme with vibrant accents
- Smooth animations and transitions
- Responsive design for all devices
- Toast notifications for user feedback
- Interactive product cards

### **Admin Dashboard**
- Product management with category organization
- User management capabilities
- Order management and status updates
- Category management
- Real-time statistics

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **Session Management**: Secure session handling with MongoDB
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Environment Variables**: Sensitive data stored in environment variables
- **Route Protection**: Protected routes for admin and authenticated users
- **Middleware Authentication**: Secure API endpoints

## 🚀 Deployment

### **Backend Deployment (Heroku)**
1. Create a Heroku account
2. Install Heroku CLI
3. Create a new Heroku app
4. Set environment variables in Heroku dashboard:
   - `MONGODB_URI`
   - `SESSION_SECRET`
   - `NODE_ENV=production`
   - `CLIENT_URL`
5. Deploy using Git

### **Frontend Deployment (Vercel/Netlify)**
1. Build the React app: `npm run build`
2. Deploy to Vercel or Netlify
3. Set environment variables for API URL

### **MongoDB Atlas Setup**
1. Create MongoDB Atlas account
2. Create a new cluster
3. Set up database access (username/password)
4. Set up network access (IP whitelist)
5. Get connection string and update `MONGODB_URI`

## 🐛 Troubleshooting

### **Common Issues**

1. **Port Conflicts**
   - Backend runs on port 5002
   - Frontend runs on port 3000
   - Check if ports are available

2. **MongoDB Connection**
   - Ensure MongoDB is running locally
   - Check connection string in `.env`
   - Verify network access for Atlas

3. **Session Issues**
   - Clear browser cookies
   - Check `SESSION_SECRET` in `.env`
   - Verify MongoDB connection

4. **CORS Errors**
   - Check `CLIENT_URL` in backend `.env`
   - Ensure frontend URL matches

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yadav Siwakoti**
- GitHub: [@yadav68](https://github.com/yadav68)

## 🙏 Acknowledgments

- React.js community for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- All contributors and supporters of this project

---

**TechGadgets** - Your one-stop shop for the latest gadgets and accessories! 🛍️
