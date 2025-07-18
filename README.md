# TechGadgets - MERN Stack E-commerce Platform

A modern, full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring a responsive design, real-time updates, and comprehensive admin functionality.

## 🚀 Features

### **User Features**
- **User Authentication**: Secure login/register system with session management
- **Product Browsing**: Browse products by category with horizontal scrolling
- **Product Details**: Detailed product pages with related products
- **Shopping Cart**: Real-time cart updates with instant price calculations
- **Responsive Design**: Mobile-friendly interface with modern UI/UX
- **Toast Notifications**: Real-time feedback for user actions

### **Admin Features**
- **Admin Dashboard**: Comprehensive admin panel with statistics
- **Product Management**: CRUD operations for products with category organization
- **User Management**: View and manage user accounts
- **Category-based Display**: Products organized by category for easy management
- **Inventory Management**: Track product stock levels

### **Technical Features**
- **Real-time Updates**: Cart and prices update instantly without page refresh
- **Session Management**: Secure user sessions with MongoDB storage
- **API-driven**: RESTful API architecture
- **Modern UI**: Dark theme with gradient accents and smooth animations
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile

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
│   ├── middleware/          # Custom middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── public/             # Static files
│   ├── server.js           # Server entry point
│   └── package.json        # Backend dependencies
├── client/                 # React frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
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
   
   Create a `.env` file in the `backend` directory:
   MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/techgadgets

Session Configuration
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

 Server Configuration
PORT=5002
NODE_ENV=development

 Frontend Configuration (React)
REACT_APP_API_URL=http://localhost:5002/api

 Optional: JWT Secret (if using JWT authentication)
JWT_SECRET=your-jwt-secret-key-change-this-in-production

 Optional: Email Configuration (if implementing email features)
 EMAIL_HOST=smtp.gmail.com
 EMAIL_PORT=587
 EMAIL_USER=your-email@gmail.com
 EMAIL_PASS=your-app-password

 Optional: File Upload Configuration (if implementing file uploads)
 UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

4. **Start the application**
   ```bash
   # From the root directory
   npm run dev
   ```
   
   This will start both the backend server (port 5001) and React development server (port 3000).

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
4. **Manage Cart**: View cart, update quantities, and checkout
5. **Account**: Register/login to save your information

### **For Admins**
1. **Login**: Use admin credentials to access admin panel
2. **Dashboard**: View site statistics and overview
3. **Manage Products**: Add, edit, or delete products
4. **User Management**: View and manage user accounts
5. **Category Organization**: Products are automatically organized by category

## 🔧 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout

### **Products**
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### **Cart**
- `GET /api/cart` - Get user cart
- `POST /api/cart/add/:id` - Add item to cart
- `PUT /api/cart/update/:id` - Update cart item quantity
- `DELETE /api/cart/remove/:id` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### **Admin**
- `GET /api/admin` - Admin dashboard data
- `GET /api/admin/products` - Admin products view
- `GET /api/admin/users` - Admin users view

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

### **Modern UI/UX**
- Dark theme with vibrant accents
- Smooth animations and transitions
- Responsive design for all devices
- Toast notifications for user feedback
- Interactive product cards

### **Admin Dashboard**
- Product management with category organization
- User management capabilities
- Real-time statistics
- Intuitive interface for content management

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **Session Management**: Secure session handling with MongoDB
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Environment Variables**: Sensitive data stored in environment variables

## 🚀 Deployment

### **Backend Deployment (Heroku)**
1. Create a Heroku account
2. Install Heroku CLI
3. Create a new Heroku app
4. Set environment variables in Heroku dashboard
5. Deploy using Git

### **Frontend Deployment (Vercel/Netlify)**
1. Build the React app: `npm run build`
2. Deploy to Vercel or Netlify
3. Set environment variables for API URL

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
