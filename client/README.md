"""# TechGadgets - Client (Frontend)

This is the React-based frontend for the TechGadgets e-commerce platform.

## Directory Structure

*   `build/`: This directory contains the production build of the application.
*   `node_modules/`: This directory contains all the installed dependencies for the frontend.
*   `public/`: This directory contains the public assets of the application.
    *   `index.html`: The main HTML file of the application.
*   `src/`: This directory contains the source code of the application.
    *   `components/`: This directory contains the reusable components.
        *   `Footer.js`: The footer component of the application.
        *   `Header.js`: The header component of the application.
        *   `Layout.js`: The layout component that wraps the pages.
        *   `ProtectedRoute.js`: A component to protect routes that require authentication.
        *   `Toast.js`: A component to display toast notifications.
    *   `pages/`: This directory contains the pages of the application.
        *   `AdminCategories.js`: The page for managing categories in the admin dashboard.
        *   `AdminDashboard.js`: The main dashboard page for administrators.
        *   `AdminOrders.js`: The page for managing orders in the admin dashboard.
        *   `AdminProducts.js`: The page for managing products in the admin dashboard.
        *   `AdminUsers.js`: The page for managing users in the admin dashboard.
        *   `Cart.js`: The shopping cart page.
        *   `Checkout.js`: The page for the checkout process.
        *   `Home.js`: The home page of the application.
        *   `Login.js`: The login page.
        *   `OrderDetail.js`: The page that displays the details of a specific order.
        *   `ProductCreate.js`: The page for creating a new product.
        *   `ProductDetail.js`: The page that displays the details of a specific product.
        *   `ProductEdit.js`: The page for editing an existing product.
        *   `Products.js`: The page that displays the list of products.
        *   `Profile.js`: The user profile page.
        *   `Register.js`: The registration page.
        *   `UserOrders.js`: The page that displays the orders of the current user.
    *   `services/`: This directory contains the services for interacting with the backend API.
        *   `api.js`: The main service for making API requests.
    *   `App.js`: The main component of the application.
    *   `App.test.js`: The tests for the `App` component.
    *   `index.css`: The main stylesheet of the application.
    *   `index.js`: The entry point of the application.
    *   `logo.svg`: The logo of the application.
    *   `reportWebVitals.js`: A script for reporting web vitals.
    *   `setupTests.js`: The setup for the tests.
    *   `theme.js`: The theme configuration for the application.
*   `.gitignore`: This file specifies which files and folders should be ignored by Git.
*   `package-lock.json`: This file records the exact versions of the dependencies.
*   `package.json`: This file defines the project's dependencies and scripts.
*   `README.md`: This file, which provides an overview of the frontend.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

Ensure you have Node.js and npm installed. The backend server should be running for the application to function correctly.

### Installation

1.  Navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the client application in development mode, run the following command:

```bash
npm start
```

This will open the application in your browser at `http://localhost:3000`.

The page will reload if you make edits.
You will also see any lint errors in the console.

### Proxy to Backend

This application is configured to proxy API requests to the backend server running on `http://localhost:5002`. You can see the configuration in the `proxy` field in `package.json`.

### Available Scripts

In the project directory, you can run:

*   `npm start`: Runs the app in development mode.
*   `npm test`: Launches the test runner in interactive watch mode.
*   `npm run build`: Builds the app for production to the `build` folder.
*   `npm run eject`: Removes the single dependency and copies all configuration files and transitive dependencies into your project. **Note: this is a one-way operation. Once you `eject`, you can’t go back!**

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
""