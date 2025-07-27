"""# TechGadgets - Backend

This is the Node.js and Express-based backend for the TechGadgets e-commerce platform. It provides the RESTful API for the frontend client.

## Directory Structure

*   `controllers/`: This directory contains the controllers for handling business logic.
    *   `authController.js`: Manages user authentication, including registration, login, and token generation.
    *   `categoryController.js`: Handles the logic for managing product categories.
    *   `orderController.js`: Manages the creation and retrieval of orders.
    *   `productsController.js`: Controls the logic for product-related operations.
*   `middleware/`: This directory contains the middleware for handling requests.
    *   `auth.js`: An authentication middleware to protect routes.
*   `models/`: This directory contains the data models for the application.
    *   `Category.js`: The data model for product categories.
    *   `Order.js`: The data model for customer orders.
    *   `Product.js`: The data model for products.
    *   `User.js`: The data model for users.
*   `node_modules/`: This directory contains all the installed dependencies for the backend.
*   `public/`: This directory contains public assets.
    *   `css/`: This directory contains the CSS files.
        *   `style.css`: The main stylesheet for the application.
*   `routes/`: This directory contains the route definitions for the API.
    *   `admin.js`: The routes for admin-related functionalities.
    *   `auth.js`: The routes for user authentication.
    *   `cart.js`: The routes for managing the shopping cart.
    *   `categories.js`: The routes for category-related operations.
    *   `orders.js`: The routes for handling orders.
    *   `products.js`: The routes for product-related operations.
*   `scripts/`: This directory contains scripts for various tasks.
    *   `assignCategories.js`: A script to assign categories to products.
    *   `createSampleOrders.js`: A script to create sample orders for testing.
    *   `migrateCategories.js`: A script to migrate categories.
*   `package-lock.json`: This file records the exact versions of the dependencies.
*   `package.json`: This file defines the project's dependencies and scripts.
*   `README.md`: This file, which provides an overview of the backend.
*   `server.js`: The main entry point for the backend server.

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed. You will also need a MongoDB database instance.

### Installation

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```

### Environment Variables

Before running the server, you need to create a `.env` file in the `backend` directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5002
```

### Running the Application

You can run the server in two modes:

1.  **Development Mode (with auto-reload):**
    This uses `nodemon` to automatically restart the server when file changes are detected.
    ```bash
    npm run dev
    ```

2.  **Production Mode:**
    ```bash
    npm start
    ```

The server will start on `http://localhost:5002` by default.
""
