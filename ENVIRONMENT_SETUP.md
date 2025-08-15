# Environment Setup - Quick Start

## 🚀 Quick Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment:**

   ```bash
   npm run setup:env
   ```

3. **Configure environment variables:**
   - Edit `.env.local` with your actual values
   - Never commit this file to git

4. **Validate environment:**

   ```bash
   npm run validate:env
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

## 🔑 Required Environment Variables

### Development

- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- `NEXT_PUBLIC_API_BASE_URL` - API base URL

### Production

- All development variables plus:
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret

## 📁 Environment Files

- `.env.example` - Template (safe to commit)
- `.env.local` - Local overrides (never commit)
- `.env.development` - Development defaults (safe to commit)
- `.env.production` - Production template (never commit)

## 🌍 Environment-Specific Deployment

- **`develop` branch** → Development environment
- **`main` branch** → Production environment

## 🛠️ Available Scripts

- `npm run setup:env` - Set up local environment
- `npm run validate:env` - Validate environment variables
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## 🔒 Security Notes

- Never commit `.env.local` or `.env.production`
- Use different API keys for different environments
- Rotate secrets regularly
- Validate environment variables in CI/CD
