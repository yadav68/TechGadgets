# TechGadgets - Backend

This is the Node.js and Express-based backend for the TechGadgets e-commerce platform. It provides the RESTful API for the frontend client.

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
