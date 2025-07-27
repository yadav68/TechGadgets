# TechGadgets - Client (Frontend)

This is the React-based frontend for the TechGadgets e-commerce platform.

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