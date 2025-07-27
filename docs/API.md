# TechGadgets API Documentation

This document provides comprehensive documentation for the TechGadgets REST API.

## 🚀 Base URL

**Development:** `http://localhost:5002/api`  
**Production:** `https://api.techgadgets.com/api`

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Getting an Authentication Token

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "email": "user@example.com",
    "username": "johndoe",
    "role": "user"
  }
}
```

## 📊 Response Format

All API responses follow this structure:

```json
{
  "success": true|false,
  "data": {},
  "message": "Optional message",
  "error": "Error details (if success is false)"
}
```

## 🚪 Authentication Endpoints

### Register User

```http
POST /api/auth/register
```

**Request Body:**

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login User

```http
POST /api/auth/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Logout User

```http
POST /api/auth/logout
```

**Headers:** `Authorization: Bearer <token>`

### Get User Profile

```http
GET /api/auth/profile
```

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "createdAt": "2025-01-26T10:00:00.000Z"
  }
}
```

### Update User Profile

```http
PUT /api/auth/profile
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "newemail@example.com"
}
```

## 🏷️ Product Endpoints

### Get All Products

```http
GET /api/products?page=1&limit=10&search=phone&category=electronics
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 50)
- `search` (optional): Search term
- `category` (optional): Category ID or name
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `sortBy` (optional): Sort field (name, price, createdAt)
- `sortOrder` (optional): Sort order (asc, desc)

**Response:**

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "60f7b3b3b3b3b3b3b3b3b3b3",
        "name": "iPhone 15 Pro",
        "description": "Latest iPhone with advanced features",
        "price": 999.99,
        "category": {
          "id": "60f7b3b3b3b3b3b3b3b3b3b4",
          "name": "Smartphones"
        },
        "image": "/uploads/iphone15pro.jpg",
        "stock": 50,
        "featured": true,
        "createdAt": "2025-01-26T10:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10
    }
  }
}
```

### Get Product by ID

```http
GET /api/products/:id
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "iPhone 15 Pro",
    "description": "Latest iPhone with advanced features",
    "price": 999.99,
    "category": {
      "id": "60f7b3b3b3b3b3b3b3b3b3b4",
      "name": "Smartphones"
    },
    "images": ["/uploads/iphone15pro-1.jpg", "/uploads/iphone15pro-2.jpg"],
    "stock": 50,
    "specifications": {
      "brand": "Apple",
      "model": "iPhone 15 Pro",
      "storage": "128GB"
    },
    "featured": true,
    "createdAt": "2025-01-26T10:00:00.000Z"
  }
}
```

### Create Product (Admin Only)

```http
POST /api/products
```

**Headers:** `Authorization: Bearer <admin-token>`

**Request Body:**

```json
{
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone with advanced features",
  "price": 999.99,
  "categoryId": "60f7b3b3b3b3b3b3b3b3b3b4",
  "stock": 50,
  "specifications": {
    "brand": "Apple",
    "model": "iPhone 15 Pro",
    "storage": "128GB"
  },
  "featured": true
}
```

### Update Product (Admin Only)

```http
PUT /api/products/:id
```

**Headers:** `Authorization: Bearer <admin-token>`

### Delete Product (Admin Only)

```http
DELETE /api/products/:id
```

**Headers:** `Authorization: Bearer <admin-token>`

## 📂 Category Endpoints

### Get All Categories

```http
GET /api/categories
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "60f7b3b3b3b3b3b3b3b3b3b4",
      "name": "Smartphones",
      "description": "Mobile phones and accessories",
      "image": "/uploads/smartphones-category.jpg",
      "productCount": 25,
      "createdAt": "2025-01-26T10:00:00.000Z"
    }
  ]
}
```

### Create Category (Admin Only)

```http
POST /api/categories
```

**Headers:** `Authorization: Bearer <admin-token>`

**Request Body:**

```json
{
  "name": "Smartphones",
  "description": "Mobile phones and accessories"
}
```

### Update Category (Admin Only)

```http
PUT /api/categories/:id
```

### Delete Category (Admin Only)

```http
DELETE /api/categories/:id
```

## 🛒 Cart Endpoints

### Get User Cart

```http
GET /api/cart
```

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "product": {
          "id": "60f7b3b3b3b3b3b3b3b3b3b3",
          "name": "iPhone 15 Pro",
          "price": 999.99,
          "image": "/uploads/iphone15pro.jpg"
        },
        "quantity": 2,
        "subtotal": 1999.98
      }
    ],
    "total": 1999.98,
    "itemCount": 2
  }
}
```

### Add Item to Cart

```http
POST /api/cart/add
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "productId": "60f7b3b3b3b3b3b3b3b3b3b3",
  "quantity": 1
}
```

### Update Cart Item

```http
PUT /api/cart/update
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "productId": "60f7b3b3b3b3b3b3b3b3b3b3",
  "quantity": 3
}
```

### Remove Item from Cart

```http
DELETE /api/cart/remove/:productId
```

**Headers:** `Authorization: Bearer <token>`

### Clear Cart

```http
DELETE /api/cart/clear
```

**Headers:** `Authorization: Bearer <token>`

## 📦 Order Endpoints

### Get User Orders

```http
GET /api/orders?page=1&limit=10&status=pending
```

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**

- `page` (optional): Page number
- `limit` (optional): Items per page
- `status` (optional): Order status filter

**Response:**

```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "60f7b3b3b3b3b3b3b3b3b3b5",
        "orderNumber": "ORD-2025-001",
        "status": "processing",
        "total": 1999.98,
        "items": [
          {
            "product": {
              "id": "60f7b3b3b3b3b3b3b3b3b3b3",
              "name": "iPhone 15 Pro"
            },
            "quantity": 2,
            "price": 999.99
          }
        ],
        "shippingAddress": {
          "street": "123 Main St",
          "city": "New York",
          "state": "NY",
          "zipCode": "10001",
          "country": "USA"
        },
        "createdAt": "2025-01-26T10:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25
    }
  }
}
```

### Get Order by ID

```http
GET /api/orders/:id
```

**Headers:** `Authorization: Bearer <token>`

### Create Order

```http
POST /api/orders
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "items": [
    {
      "productId": "60f7b3b3b3b3b3b3b3b3b3b3",
      "quantity": 2,
      "price": 999.99
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card"
}
```

### Update Order Status (Admin Only)

```http
PUT /api/orders/:id/status
```

**Headers:** `Authorization: Bearer <admin-token>`

**Request Body:**

```json
{
  "status": "shipped",
  "trackingNumber": "1Z12345E0205271688"
}
```

## 👥 Admin Endpoints

### Get All Users (Admin Only)

```http
GET /api/admin/users?page=1&limit=10&role=user
```

**Headers:** `Authorization: Bearer <admin-token>`

### Get Dashboard Statistics (Admin Only)

```http
GET /api/admin/dashboard
```

**Headers:** `Authorization: Bearer <admin-token>`

**Response:**

```json
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "totalProducts": 150,
    "totalOrders": 3456,
    "totalRevenue": 234567.89,
    "recentOrders": 45,
    "lowStockProducts": 12
  }
}
```

### Update User Role (Admin Only)

```http
PUT /api/admin/users/:id/role
```

**Headers:** `Authorization: Bearer <admin-token>`

**Request Body:**

```json
{
  "role": "admin"
}
```

## 📤 File Upload Endpoints

### Upload Product Image

```http
POST /api/upload/product-image
```

**Headers:**

- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Form Data:**

- `image`: Image file (max 5MB, jpg/jpeg/png/webp)

**Response:**

```json
{
  "success": true,
  "data": {
    "filename": "product-1642345678901.jpg",
    "url": "/uploads/product-1642345678901.jpg",
    "size": 1024576
  }
}
```

## ❌ Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "error": "Validation error",
  "details": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "error": "Authentication required"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "error": "Insufficient permissions"
}
```

### 404 Not Found

```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "error": "Internal server error"
}
```

## 🔄 Rate Limiting

The API implements rate limiting to prevent abuse:

- **General endpoints**: 100 requests per 15 minutes per IP
- **Authentication endpoints**: 5 requests per 15 minutes per IP
- **Admin endpoints**: 200 requests per 15 minutes per user

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642345678
```

## 🔍 Search and Filtering

### Product Search

```http
GET /api/products?search=iphone&category=smartphones&minPrice=500&maxPrice=1500&sortBy=price&sortOrder=asc
```

### Advanced Filtering

```http
GET /api/products?filters[brand]=Apple&filters[storage]=128GB&filters[color]=black
```

## 📊 Pagination

All paginated endpoints use consistent pagination:

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 50)

**Response Structure:**

```json
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 100,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

## 🔗 CORS

The API supports CORS for the following origins:

- `http://localhost:3000` (development)
- `https://yourdomain.com` (production)

## 📝 API Versioning

Current API version: `v1`

Future versions will be available at:

- `GET /api/v2/products`
- `GET /api/v3/products`

---

**Last Updated:** January 26, 2025  
**API Version:** 1.0.0
