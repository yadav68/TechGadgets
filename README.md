# Tech Gadgets & Accessories Website

A full-stack e-commerce website for tech gadgets and accessories built with Express, EJS, and MongoDB.

## Features
- Product catalog
- User registration and login
- Shopping cart (coming soon)
- Admin panel (coming soon)

## Setup

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up environment variables**
   - Create a `.env` file in the root directory:
     ```env
     MONGODB_URI=mongodb://localhost:27017/techgadgets
     SESSION_SECRET=your_secret_key
     PORT=3000
     ```
4. **Start MongoDB** (if not running):
   ```bash
   mongod
   ```
5. **Run the app**
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

6. **Visit** [http://localhost:3000](http://localhost:3000)

## Folder Structure
- `server.js` - Main server file
- `models/` - Mongoose models
- `routes/` - Express routes
- `views/` - EJS templates
- `public/` - Static assets (CSS, images)

---

**To Do:**
- Shopping cart functionality
- Admin product management
- Product image upload
- Order management 