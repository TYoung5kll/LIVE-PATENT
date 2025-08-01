#!/bin/bash

# LIVE Messaging Service Setup Script
# Patent Owner: Theodore G. Young Jr

echo "🚀 Setting up LIVE Messaging Service..."

# Check if running as root for SSL setup
if [[ $EUID -eq 0 ]]; then
   echo "⚠️  Don't run as root. Run as regular user."
   exit 1
fi

# Create SSL directory
echo "📁 Creating SSL directory..."
mkdir -p ssl

# Check for environment file
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOL
# LIVE Messaging Service Configuration
# Patent Owner: Theodore G. Young Jr

# SendGrid Configuration (Required)
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=your_verified_email@yourdomain.com

# Twilio Configuration (Required)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Server Configuration
PORT=443
NODE_ENV=production

EOL
    echo "✅ .env file created. Please edit with your actual credentials."
else
    echo "✅ .env file already exists."
fi

# Check for SSL certificates
if [ ! -f "ssl/key.pem" ] || [ ! -f "ssl/cert.pem" ]; then
    echo "🔐 SSL certificates not found."
    echo "Choose an option:"
    echo "1) Generate self-signed certificates (development only)"
    echo "2) I'll add my own certificates manually"
    read -p "Enter choice (1 or 2): " choice
    
    if [ "$choice" = "1" ]; then
        echo "🔧 Generating self-signed SSL certificates..."
        openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes \
            -subj "/C=US/ST=State/L=City/O=LIVE/OU=Messaging/CN=localhost"
        echo "✅ Self-signed certificates generated."
        echo "⚠️  These are for development only. Use real certificates for production."
    else
        echo "📋 Please add your SSL certificates:"
        echo "   - ssl/key.pem (private key)"
        echo "   - ssl/cert.pem (certificate)"
    fi
else
    echo "✅ SSL certificates found."
fi

# Install dependencies if package.json exists
if [ -f "package.json" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "⚠️  No package.json found. Make sure you're in the correct directory."
fi

echo ""
echo "🎉 LIVE Messaging Service Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Edit .env file with your SendGrid and Twilio credentials"
echo "2. If using production, replace SSL certificates with real ones"
echo "3. Run: node server.js"
echo "4. Frontend will be available at: https://localhost:443"
echo ""
echo "🔗 Service Accounts Needed:"
echo "   • SendGrid: https://sendgrid.com (for email)"
echo "   • Twilio: https://twilio.com (for SMS)"
echo ""
echo "📜 Patent: Theodore G. Young Jr - LIVE Messaging System"