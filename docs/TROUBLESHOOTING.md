# Troubleshooting Guide

This guide helps you resolve common issues you might encounter while setting up or running the TechGadgets project.

## 🔧 Installation Issues

### Node.js Version Compatibility

**Problem:** You see warnings like:

```
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: 'react-router-dom@7.7.1',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
```

**Solutions:**

1. **Recommended: Update Node.js**

   ```bash
   # Using nvm (recommended)
   nvm install 20
   nvm use 20

   # Or download from nodejs.org
   # https://nodejs.org/en/download/
   ```

2. **Alternative: Use compatible package versions**
   - The project has been configured with Node 18 compatible versions
   - Run: `npm run clean && npm run install:all`

### Security Vulnerabilities

**Problem:** You see vulnerability warnings during installation.

**Solutions:**

1. **Check vulnerabilities:**

   ```bash
   npm run security-audit
   ```

2. **Fix automatically (recommended):**

   ```bash
   npm run security-fix
   ```

3. **Force fix (use with caution):**
   ```bash
   npm audit fix --force --prefix backend
   npm audit fix --force --prefix client
   ```

### Multer Vulnerability

**Problem:**

```
npm warn deprecated multer@1.4.5-lts.2: Multer 1.x is impacted by a number of vulnerabilities
```

**Solution:**

- The project has been updated to use Multer 2.0.0-beta.1
- If you encounter issues, you can temporarily use the alternative:
  ```bash
  cd backend
  npm install multer@1.4.5-lts.2 --save
  ```

## 🗄️ Database Issues

### MongoDB Connection Errors

**Problem:** Cannot connect to MongoDB

**Solutions:**

1. **Check MongoDB is running:**

   ```bash
   # Local MongoDB
   brew services start mongodb/brew/mongodb-community

   # Or check if mongod is running
   pgrep mongod
   ```

2. **Check connection string:**

   ```bash
   # In backend/.env
   MONGODB_URI=mongodb://localhost:27017/techgadgets
   ```

3. **Use MongoDB Atlas (cloud):**
   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techgadgets
   ```

### Database Migration Issues

**Problem:** Database scripts fail to run

**Solutions:**

1. **Ensure MongoDB is running and accessible**
2. **Check environment variables are set:**

   ```bash
   cd backend
   node -e "require('dotenv').config(); console.log(process.env.MONGODB_URI)"
   ```

3. **Run migrations manually:**
   ```bash
   npm run migrate
   npm run seed
   ```

## 🌐 Server Issues

### Port Already in Use

**Problem:**

```
Error: listen EADDRINUSE: address already in use :::5002
```

**Solutions:**

1. **Kill the process using the port:**

   ```bash
   # Find the process
   lsof -ti:5002

   # Kill it
   kill -9 $(lsof -ti:5002)
   ```

2. **Change the port:**

   ```bash
   # In backend/.env
   PORT=5003
   ```

3. **Use a different port for development:**
   ```bash
   PORT=5003 npm run dev:backend
   ```

### Frontend Cannot Connect to Backend

**Problem:** API calls fail from the frontend

**Solutions:**

1. **Check proxy configuration in client/package.json:**

   ```json
   {
     "proxy": "http://localhost:5002"
   }
   ```

2. **Verify backend is running:**

   ```bash
   curl http://localhost:5002/api/health
   ```

3. **Check CORS settings in backend:**
   ```javascript
   app.use(
     cors({
       origin: "http://localhost:3000",
       credentials: true,
     })
   );
   ```

## 🔐 Authentication Issues

### JWT Token Errors

**Problem:** Authentication fails or tokens are invalid

**Solutions:**

1. **Check JWT_SECRET is set:**

   ```bash
   # In backend/.env
   JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters
   ```

2. **Clear browser storage:**

   ```javascript
   // In browser console
   localStorage.clear();
   sessionStorage.clear();
   ```

3. **Check token expiration:**
   - Default token expiration is 24 hours
   - Users need to log in again after expiration

### Session Issues

**Problem:** User sessions not persisting

**Solutions:**

1. **Check session secret:**

   ```bash
   # In backend/.env
   SESSION_SECRET=your_session_secret_here
   ```

2. **Verify session store configuration:**
   ```javascript
   // Should use MongoDB for session storage
   store: MongoStore.create({
     mongoUrl: process.env.MONGODB_URI,
   });
   ```

## 📦 Dependency Issues

### Package Installation Failures

**Problem:** npm install fails or packages don't install correctly

**Solutions:**

1. **Clear npm cache:**

   ```bash
   npm cache clean --force
   ```

2. **Delete node_modules and reinstall:**

   ```bash
   npm run clean
   npm run install:all
   ```

3. **Check npm registry:**

   ```bash
   npm config get registry
   # Should be: https://registry.npmjs.org/
   ```

4. **Update npm:**
   ```bash
   npm install -g npm@latest
   ```

### Version Conflicts

**Problem:** Package version conflicts or peer dependency warnings

**Solutions:**

1. **Install missing peer dependencies:**

   ```bash
   npm install --save-peer
   ```

2. **Use legacy peer deps (temporary fix):**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Check for conflicting versions:**
   ```bash
   npm ls
   ```

## 🎨 Frontend Issues

### React App Won't Start

**Problem:** `npm start` fails in the client directory

**Solutions:**

1. **Check React Scripts version compatibility:**

   ```bash
   cd client
   npm ls react-scripts
   ```

2. **Clear React cache:**

   ```bash
   cd client
   rm -rf node_modules/.cache
   ```

3. **Check for TypeScript errors (if using TypeScript):**
   ```bash
   cd client
   npx tsc --noEmit
   ```

### Material-UI Issues

**Problem:** Material-UI components not rendering correctly

**Solutions:**

1. **Check Material-UI version compatibility:**

   ```bash
   cd client
   npm ls @mui/material
   ```

2. **Verify theme provider setup:**

   ```javascript
   import { ThemeProvider } from "@mui/material/styles";
   import theme from "./theme";

   <ThemeProvider theme={theme}>
     <App />
   </ThemeProvider>;
   ```

## 🚀 Production Issues

### Build Failures

**Problem:** `npm run build` fails

**Solutions:**

1. **Check for TypeScript errors:**

   ```bash
   cd client
   npm run build 2>&1 | grep -i error
   ```

2. **Increase memory limit:**

   ```bash
   cd client
   NODE_OPTIONS=--max_old_space_size=4096 npm run build
   ```

3. **Check for unused imports/variables:**
   ```bash
   cd client
   npm run lint
   ```

### Environment Variables

**Problem:** Environment variables not working in production

**Solutions:**

1. **Check production .env files exist:**

   ```bash
   ls -la backend/.env*
   ls -la client/.env*
   ```

2. **Verify REACT*APP* prefix for client variables:**

   ```bash
   # Client variables must start with REACT_APP_
   REACT_APP_API_URL=https://api.yourdomain.com
   ```

3. **Check server environment variables:**
   ```bash
   cd backend
   node -e "console.log(process.env)"
   ```

## 🔍 Debugging Tips

### Enable Debug Mode

1. **Backend debugging:**

   ```bash
   # In backend/.env
   NODE_ENV=development
   DEBUG=app:*
   ```

2. **Frontend debugging:**
   ```bash
   # In client/.env
   REACT_APP_DEBUG_MODE=true
   ```

### Check Logs

1. **Backend logs:**

   ```bash
   cd backend
   npm run dev | tee debug.log
   ```

2. **Frontend logs:**
   ```bash
   # Check browser console
   # Check network tab for API calls
   ```

### Network Issues

1. **Check API endpoints:**

   ```bash
   curl -X GET http://localhost:5002/api/products
   curl -X POST http://localhost:5002/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password"}'
   ```

2. **Test database connection:**
   ```bash
   cd backend
   node -e "
   require('dotenv').config();
   const mongoose = require('mongoose');
   mongoose.connect(process.env.MONGODB_URI)
     .then(() => console.log('DB connected'))
     .catch(err => console.error('DB error:', err));
   "
   ```

## 🆘 Getting Help

If none of these solutions work:

1. **Check the GitHub Issues:** [TechGadgets Issues](https://github.com/yadav68/TechGadgets/issues)
2. **Create a new issue** with:
   - Your operating system
   - Node.js and npm versions
   - Complete error message
   - Steps to reproduce
3. **Check the project documentation:** [docs/README.md](./README.md)

## 📞 Quick Commands for Common Fixes

```bash
# Complete fresh install
npm run clean && npm run install:all

# Fix security vulnerabilities
npm run security-fix

# Check for issues
npm run security-audit

# Reset development environment
rm -rf node_modules backend/node_modules client/node_modules
npm cache clean --force
npm run install:all
```

---

**Last Updated:** January 26, 2025
