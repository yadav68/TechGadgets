# TechGadgets - E-Commerce Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-%5E18.3.1-blue)](https://reactjs.org/)

## 📖 About The Project

**TechGadgets** is a comprehensive full-stack e-commerce web application developed as a project for the **CSD 3103 - Full-Stack JavaScript** course during the Summer 2025 term.

This application serves as an online retail store specializing in technology gadgets. It provides a complete shopping experience, from browsing products to completing purchases, along with a full-featured administrative backend for site management.

### 🎯 Built With

- **Frontend:** [React.js](https://reactjs.org/) with Material-UI
- **Backend:** [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) with Passport.js
- **Development:** Concurrently for running multiple processes

## ✨ Core Features

### 👤 User Features

- 🔐 **User Authentication:** Secure user registration and login system
- 📱 **Product Catalog:** Browse, search, and view detailed information about products
- 🛒 **Shopping Cart:** Add products to a cart and manage its contents
- 💳 **Checkout Process:** A seamless and secure checkout experience
- 📋 **Order Management:** Users can view their order history and details
- 👥 **User Profile:** Manage personal information and preferences

### 🔧 Admin Features

- 📊 **Admin Dashboard:** Comprehensive dashboard for site management
- 🏷️ **Product Management:** Create, Read, Update, Delete products
- 📂 **Category Management:** Organize products into categories
- 📦 **Order Management:** Track and manage customer orders
- 👥 **User Management:** Manage customer accounts and permissions

## 🏗️ Monorepo Structure

```
TechGadgets/
├── 📁 backend/              # Node.js/Express API server
│   ├── 📁 controllers/      # Business logic controllers
│   ├── 📁 middleware/       # Custom middleware functions
│   ├── 📁 models/          # MongoDB data models
│   ├── 📁 routes/          # API route definitions
│   ├── 📁 scripts/         # Database and utility scripts
│   ├── 📁 public/          # Static assets
│   └── 📄 server.js        # Main server entry point
├── 📁 client/              # React.js frontend application
│   ├── 📁 src/
│   │   ├── 📁 components/  # Reusable React components
│   │   ├── 📁 pages/       # Page-level components
│   │   └── 📁 services/    # API service layer
│   └── 📁 public/          # Static frontend assets
├── 📄 package.json         # Root workspace configuration
└── 📄 README.md           # This file
```

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** for version control

```bash
# Check your versions
node --version
npm --version
```

### 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yadav68/TechGadgets.git
   cd TechGadgets
   ```

2. **Install root dependencies**

   ```bash
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

### ⚙️ Environment Configuration

1. **Backend Environment Variables**

   Create a `.env` file in the `backend/` directory:

   ```bash
   cd backend
   cp .env.example .env  # If example exists, or create new file
   ```

   Add the following variables:

   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/techgadgets

   # Authentication
   JWT_SECRET=your_super_secret_jwt_key_here
   SESSION_SECRET=your_session_secret_here

   # Server Configuration
   PORT=5002
   NODE_ENV=development

   # CORS
   CLIENT_URL=http://localhost:3000
   ```

2. **Frontend Environment Variables** (Optional)

   Create a `.env` file in the `client/` directory if needed:

   ```env
   REACT_APP_API_URL=http://localhost:5002
   REACT_APP_NAME=TechGadgets
   ```

### 🏃‍♂️ Running the Application

#### Option 1: Run Both Services Simultaneously (Recommended)

```bash
# From the root directory
npm run dev
```

#### Option 2: Run Services Individually

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd client
npm start
```

### 🌐 Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5002
- **API Documentation:** http://localhost:5002/api-docs (if implemented)

## 📁 Project Structure Details

### Backend (`/backend`)

- **Controllers:** Handle business logic and HTTP requests/responses
- **Models:** MongoDB schema definitions using Mongoose
- **Routes:** Express.js route definitions and middleware
- **Middleware:** Custom authentication and validation middleware
- **Scripts:** Database migration and utility scripts

### Frontend (`/client`)

- **Components:** Reusable UI components
- **Pages:** Route-level components representing different views
- **Services:** API communication layer
- **Theme:** Material-UI theme configuration

## 🧪 Testing

```bash
# Run frontend tests
cd client
npm test

# Run backend tests (if implemented)
cd backend
npm test
```

## 🚀 Deployment

### Production Build

1. **Build the frontend:**

   ```bash
   cd client
   npm run build
   ```

2. **Set production environment variables in backend**

3. **Start the backend in production mode:**
   ```bash
   cd backend
   npm start
   ```

### Environment-Specific Deployments

- **Development:** Uses `nodemon` for auto-restart and React dev server
- **Production:** Uses optimized builds and production MongoDB

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🆘 Troubleshooting

Having issues? Check our comprehensive troubleshooting guide:

- **[Troubleshooting Guide](docs/TROUBLESHOOTING.md)** - Solutions for common issues
- **Installation Problems** - Node.js version compatibility, dependency issues
- **Database Connection Issues** - MongoDB setup and connection problems
- **Security Vulnerabilities** - How to fix package vulnerabilities
- **Server and Frontend Issues** - Port conflicts, API connection problems

### Quick Fixes

```bash
# Fresh install if having dependency issues
npm run clean && npm run install:all

# Fix security vulnerabilities
npm run security-fix

# Check for issues
npm run security-audit
```

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

## 👥 Authors

- **Tech Gadgets Team** - [yadav68](https://github.com/yadav68)

## 🙏 Acknowledgments

- [CSD 3103 - Full-Stack JavaScript Course](https://lambton.ca)
- [Create React App](https://github.com/facebook/create-react-app)
- [Express.js](https://expressjs.com/)
- [Material-UI](https://mui.com/)
- [MongoDB](https://www.mongodb.com/)

## 📞 Support

If you have any questions or need help with setup, please open an issue or contact the development team.

---

**Made with ❤️ for CSD 3103 - Full-Stack JavaScript**
