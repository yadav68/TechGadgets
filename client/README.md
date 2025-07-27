"""# TechGadgets Frontend

[![React Version](https://img.shields.io/badge/react-%5E19.1.0-blue)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/mui-%5E7.2.0-blue)](https://mui.com/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen)](https://nodejs.org/)

The React.js frontend application for the TechGadgets e-commerce platform, featuring a modern, responsive user interface built with Material-UI.

## 🎯 Features

- **Responsive Design** with Material-UI components
- **User Authentication** with secure login/registration
- **Product Catalog** with search and filtering
- **Shopping Cart** functionality
- **Order Management** for users
- **Admin Dashboard** for site management
- **Real-time Updates** and notifications
- **Optimized Performance** with React best practices

## 🏗️ Architecture

### Directory Structure

```
client/
├── 📁 public/               # Static assets
│   ├── index.html          # Main HTML template
│   ├── favicon.ico         # Site favicon
│   ├── logo192.png         # App logo (192x192)
│   ├── logo512.png         # App logo (512x512)
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # Search engine directives
├── 📁 src/                 # Source code
│   ├── 📁 components/      # Reusable UI components
│   │   ├── Footer.js       # Application footer
│   │   ├── Header.js       # Navigation header
│   │   ├── Layout.js       # Page layout wrapper
│   │   ├── ProtectedRoute.js # Route protection HOC
│   │   └── Toast.js        # Notification component
│   ├── 📁 pages/           # Page-level components
│   │   ├── AdminCategories.js # Category management
│   │   ├── AdminDashboard.js # Admin overview
│   │   ├── AdminOrders.js   # Order management
│   │   ├── AdminProducts.js # Product management
│   │   ├── AdminUsers.js    # User management
│   │   ├── Cart.js         # Shopping cart
│   │   ├── Checkout.js     # Checkout process
│   │   ├── Home.js         # Landing page
│   │   ├── Login.js        # User authentication
│   │   ├── OrderDetail.js  # Order details view
│   │   ├── ProductCreate.js # Product creation
│   │   ├── ProductDetail.js # Product details
│   │   ├── ProductEdit.js   # Product editing
│   │   ├── Products.js     # Product catalog
│   │   ├── Profile.js      # User profile
│   │   ├── Register.js     # User registration
│   │   └── UserOrders.js   # User order history
│   ├── 📁 services/        # API communication
│   │   └── api.js          # HTTP client and API calls
│   ├── App.js              # Main application component
│   ├── App.test.js         # App component tests
│   ├── index.css           # Global styles
│   ├── index.js            # Application entry point
│   ├── logo.svg            # React logo
│   ├── reportWebVitals.js  # Performance monitoring
│   ├── setupTests.js       # Test configuration
│   └── theme.js            # Material-UI theme
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

### Component Architecture

#### Core Components

- **Layout.js**: Provides consistent page structure with header, footer, and content area
- **Header.js**: Navigation bar with user authentication status and cart indicator
- **Footer.js**: Site footer with links and company information
- **ProtectedRoute.js**: Higher-order component for route authentication
- **Toast.js**: Global notification system for user feedback

#### Page Components

- **Home.js**: Landing page with featured products and categories
- **Products.js**: Product catalog with search, filters, and pagination
- **ProductDetail.js**: Detailed product view with add-to-cart functionality
- **Cart.js**: Shopping cart management with quantity updates
- **Checkout.js**: Multi-step checkout process
- **Profile.js**: User account management and order history

#### Admin Components

- **AdminDashboard.js**: Administrative overview with key metrics
- **AdminProducts.js**: Product inventory management
- **AdminCategories.js**: Category creation and management
- **AdminOrders.js**: Order processing and status updates
- **AdminUsers.js**: User account administration

### Services Layer

#### API Service (`services/api.js`)

Centralized HTTP client for backend communication:

```javascript
// Example API calls
api.get("/products");
api.post("/auth/login", credentials);
api.put("/products/:id", productData);
api.delete("/products/:id");
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **Backend server** running on `http://localhost:5002`

### Installation

1. **Navigate to the client directory:**

   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env` file in the client directory (optional):

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5002
REACT_APP_NAME=TechGadgets

# Optional: Feature flags
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_DEBUG_MODE=true
```

### Running the Application

#### Development Mode

```bash
npm start
```

The application will open at `http://localhost:3000` with:

- Hot reloading enabled
- Development tools accessible
- Proxy configured to backend API

#### Production Build

```bash
npm run build
```

Creates an optimized production build in the `build/` directory.

## 🎨 Styling and Theming

### Material-UI Theme (`theme.js`)

The application uses a custom Material-UI theme for consistent styling:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#dc004e", // Pink
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
  },
});
```

### Global Styles (`index.css`)

Base styles and CSS reset for consistent cross-browser rendering.

## 🔗 API Integration

### Backend Proxy Configuration

The development server proxies API requests to the backend:

```json
{
  "proxy": "http://localhost:5002"
}
```

### API Service Structure

```javascript
// Authentication
api.post("/api/auth/login", { email, password });
api.post("/api/auth/register", userData);
api.get("/api/auth/profile");

// Products
api.get("/api/products", { params: { page, limit, search } });
api.get("/api/products/:id");
api.post("/api/products", productData);

// Cart
api.get("/api/cart");
api.post("/api/cart/add", { productId, quantity });
api.put("/api/cart/update", { productId, quantity });

// Orders
api.get("/api/orders");
api.post("/api/orders", orderData);
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Structure

- **Unit Tests**: Component functionality testing
- **Integration Tests**: API integration testing
- **E2E Tests**: User workflow testing (if implemented)

### Testing Libraries

- **@testing-library/react**: Component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers
- **@testing-library/user-event**: User interaction simulation

## 📱 Responsive Design

### Breakpoints

The application is responsive across all device sizes:

- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: 960px - 1280px
- **Large Desktop**: > 1280px

### Material-UI Grid System

Uses Material-UI's responsive grid system for layout consistency.

## 🔒 Authentication

### Protected Routes

Routes requiring authentication are wrapped with `ProtectedRoute`:

```javascript
<ProtectedRoute>
  <UserOrders />
</ProtectedRoute>
```

### Admin Routes

Admin-only routes check for admin role permissions.

## 📈 Performance Optimization

### Code Splitting

- Route-based code splitting with React.lazy()
- Component-level lazy loading for large components

### Asset Optimization

- Image optimization and lazy loading
- Bundle size optimization
- Caching strategies for API calls

## 🚀 Deployment

### Build Process

```bash
# Create production build
npm run build

# Serve build locally (for testing)
npx serve -s build
```

### Environment Variables for Production

```env
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_NAME=TechGadgets
NODE_ENV=production
```

### Deployment Options

- **Netlify**: Automatic deployments from Git
- **Vercel**: Optimized for React applications
- **AWS S3 + CloudFront**: Custom hosting solution
- **Docker**: Containerized deployment

## 📦 Available Scripts

```bash
npm start          # Start development server
npm run build      # Create production build
npm test           # Run test suite
npm run eject      # Eject from Create React App
```

## 🔧 Development Tools

### Browser Developer Tools

- React Developer Tools extension
- Redux DevTools (if using Redux)
- Network tab for API debugging

### Code Quality

- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks (if configured)

## 🤝 Contributing

1. Follow the established component structure
2. Write tests for new components
3. Use Material-UI components when possible
4. Follow React best practices and hooks patterns
5. Ensure responsive design compliance

## 📚 Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [Material-UI Documentation](https://mui.com/)
- [React Router Documentation](https://reactrouter.com/)

## 🔗 Related

- [Backend README](../backend/README.md)
- [Root Project README](../README.md)

---

**Part of the TechGadgets E-Commerce Platform**
""
