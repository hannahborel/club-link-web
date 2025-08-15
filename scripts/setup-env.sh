#!/bin/bash

# Club Link Environment Setup Script
# This script helps set up the local development environment

set -e

echo "🚀 Setting up Club Link development environment..."

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists. Backing up to .env.local.backup"
    cp .env.local .env.local.backup
fi

# Copy example environment file
if [ -f ".env.example" ]; then
    echo "📋 Copying .env.example to .env.local"
    cp .env.example .env.local
    echo "✅ Environment file created successfully!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Edit .env.local with your actual development values"
    echo "2. Never commit .env.local to git"
    echo "3. Update .env.example if you add new environment variables"
    echo ""
    echo "🔑 Required environment variables to configure:"
    echo "   - DATABASE_URL (PostgreSQL connection string)"
    echo "   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (Clerk public key)"
    echo "   - CLERK_SECRET_KEY (Clerk secret key)"
    echo "   - NEXT_PUBLIC_API_BASE_URL (API base URL)"
    echo ""
    echo "💡 Tip: Use development/staging keys for external services"
else
    echo "❌ .env.example not found. Please create it first."
    exit 1
fi

echo "🎉 Environment setup complete!"
