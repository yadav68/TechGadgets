# TechGadgets - E-commerce Platform

This is a full-stack e-commerce application for selling tech gadgets and accessories.

## Features

*   User authentication (Login/Register)
*   Product catalog with categories
*   Shopping Cart
*   Checkout and Order placement
*   User order history
*   Admin dashboard to manage:
    *   Products (CRUD)
    *   Categories (CRUD)
    *   Orders
    *   Users

## Tech Stack

*   **Frontend:** React, Material-UI
*   **Backend:** Node.js, Express.js, MongoDB
*   **Deployment:** Concurrently for running both client and server.

## Project Structure

The project is a monorepo with three main parts:

*   `/` (root): Contains scripts to run the client and backend concurrently.
*   `/backend`: The Node.js/Express backend server and API.
*   `/client`: The React frontend application.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd TechGadgets
    ```

2.  **Install dependencies for all packages:**
    ```bash
    npm install
    npm install --prefix backend
    npm install --prefix client
    ```

3.  **Backend Environment Variables:**
    Create a `.env` file in the `/backend` directory. You will need to add the following variables:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5002
    ```

4.  **Database Population (Optional):**
    There are scripts available to populate the database with sample data.
    *   `populate-db.js` in the root.
    *   `assignCategories.js`, `createSampleOrders.js`, `migrateCategories.js` in `backend/scripts`.

## How to Run

To run both the backend and frontend servers concurrently in development mode, use the following command from the root directory:

```bash
npm run dev
```

This will start:
*   The React development server on `http://localhost:3000`
*   The Node.js backend server on `http://localhost:5002`