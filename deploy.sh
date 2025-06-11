#!/bin/bash

cd /home/betest/test/test-app || exit 1

echo "🔁 Pulling latest code..."
git pull origin master || exit 1

echo "📦 Installing dependencies..."
npm install || exit 1

echo "🏗️  Building React app..."
npm run build || exit 1

echo "🏗️  Copying React app..."
cp -r build /var/www || exit 1

echo "🏗️  Refreshing React app..."
systemctl reload nginx || exit 1

echo "✅ Build complete and ready to serve by NGINX"
