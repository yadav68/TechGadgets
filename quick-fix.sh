#!/bin/bash

# TechGadgets Quick Fix Script
# This script resolves common setup and installation issues

echo "🔧 TechGadgets Quick Fix Script"
echo "================================"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Node.js version
echo "📋 Checking system requirements..."
if command_exists node; then
    NODE_VERSION=$(node --version | sed 's/v//')
    echo "✅ Node.js version: $NODE_VERSION"
    
    # Check if Node version is less than 18
    if [ "$(printf '%s\n' "18.0.0" "$NODE_VERSION" | sort -V | head -n1)" != "18.0.0" ]; then
        echo "⚠️  Warning: Node.js version is less than 18.0.0"
        echo "   Some packages may not work correctly."
        echo "   Consider upgrading to Node.js 18+ or 20+"
    fi
else
    echo "❌ Node.js is not installed"
    echo "   Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check npm version
if command_exists npm; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm version: $NPM_VERSION"
else
    echo "❌ npm is not installed"
    exit 1
fi

echo ""
echo "🧹 Cleaning previous installations..."

# Remove node_modules directories
if [ -d "node_modules" ]; then
    echo "   Removing root node_modules..."
    rm -rf node_modules
fi

if [ -d "backend/node_modules" ]; then
    echo "   Removing backend node_modules..."
    rm -rf backend/node_modules
fi

if [ -d "client/node_modules" ]; then
    echo "   Removing client node_modules..."
    rm -rf client/node_modules
fi

# Clear npm cache
echo "   Clearing npm cache..."
npm cache clean --force

echo ""
echo "📦 Installing dependencies..."

# Install root dependencies
echo "   Installing root dependencies..."
npm install

# Install backend dependencies
if [ -d "backend" ]; then
    echo "   Installing backend dependencies..."
    cd backend
    npm install
    cd ..
else
    echo "❌ Backend directory not found"
    exit 1
fi

# Install client dependencies
if [ -d "client" ]; then
    echo "   Installing client dependencies..."
    cd client
    npm install
    cd ..
else
    echo "❌ Client directory not found"
    exit 1
fi

echo ""
echo "🔍 Running security audit..."
npm run security-audit

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Copy environment files:"
echo "      cp backend/.env.example backend/.env"
echo "      cp client/.env.example client/.env"
echo ""
echo "   2. Edit the .env files with your configuration"
echo ""
echo "   3. Start the development servers:"
echo "      npm run dev"
echo ""
echo "   4. If you encounter issues, check:"
echo "      - docs/TROUBLESHOOTING.md"
echo "      - https://github.com/yadav68/TechGadgets/issues"
echo ""
echo "🎉 Happy coding!"
