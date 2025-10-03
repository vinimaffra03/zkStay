#!/bin/bash

echo "🔧 Fixing Starknet version compatibility..."

# Remove old installations
echo "🗑️ Removing old node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

# Install with fixed versions
echo "📦 Installing dependencies with stable Starknet versions..."
npm install

echo "✅ Installation complete!"
echo "🧪 Test these URLs:"
echo "  http://localhost:5173/test-simple      (React test)"
echo "  http://localhost:5173/test-imports      (Import test)"  
echo "  http://localhost:5173/test-starknet    (StarknetConfig test)"
echo ""
echo "🚀 Then run: npm run dev"
