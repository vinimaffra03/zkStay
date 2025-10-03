#!/bin/bash

echo "🔧 Fixing dependency conflicts..."

# Remove old installations
echo "🗑️ Removing old node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

# Install with corrected versions
echo "📦 Installing dependencies with React 18..."
npm install

echo "✅ Setup complete! Now run: npm run dev"
