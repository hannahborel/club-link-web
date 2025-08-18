# Club Link Web Application

![Node 20](https://img.shields.io/badge/node-20.x-43853d?logo=node.js&logoColor=white)
![Next.js 14](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwindcss&logoColor=white)
![ShadCN UI](https://img.shields.io/badge/ShadCN-UI-000000)
![ESLint](https://img.shields.io/badge/ESLint-configured-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-configured-ff69b4?logo=prettier&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)
![Issues](https://github.com/hannahborel/club-link-web/issues)
![Stars](https://github.com/hannahborel/club-link-web/stargazers)

Admin/Owner/Member web application for Club Link luxury gym network platform.

## 🚀 Quick Start

### Prerequisites

- Node 20 (see `.nvmrc`)
- PostgreSQL database
- Clerk account for authentication
- Stripe account for payments

### Setup

```bash
# Use correct Node version
nvm use

# Install dependencies
npm install

# Set up environment
npm run setup:env

# Start development server
npm run dev
```

The web app will run on `http://localhost:3001` by default.

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18 + TypeScript
- **Styling**: TailwindCSS + ShadCN UI components
- **Authentication**: Clerk
- **State Management**: TanStack Query, Zustand
- **Database**: PostgreSQL with Drizzle ORM
- **Payments**: Stripe
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router routes
│   ├── (admin)/           # Admin dashboard routes (/admin/*)
│   ├── (dashboard)/       # Gym owner dashboard routes (/dashboard/*)
│   ├── (member)/          # Member interface routes (/member/*)
│   ├── auth/              # Authentication pages
│   ├── gym/               # Public gym profile pages
│   ├── test-api/          # API testing interface for development
│   └── api/               # API route handlers
├── components/             # UI components
│   ├── ui/                # ShadCN UI components
│   ├── forms/             # Form components with validation
│   ├── charts/            # Analytics and reporting charts
│   └── layout/            # Layout and navigation components
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities, configurations, and helpers
├── types/                  # TypeScript definitions
└── styles/                 # Global styles and Tailwind config
```

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # ESLint across the repo
npm run format       # Prettier format
npm run setup:env    # Set up local environment
npm run validate:env # Validate environment variables
```

## 🌍 Environment Configuration

### Required Environment Variables

Create a `.env.local` file (never commit this):

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/club_link

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# Payments (Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Environment Files

- `.env.example` - Template (safe to commit)
- `.env.local` - Local overrides (never commit)
- `.env.development` - Development defaults (safe to commit)
- `.env.production` - Production template (never commit)

## 🚀 Deployment

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install globally with `npm i -g vercel`
3. **Git Repository**: Ensure your code is pushed to GitHub
4. **Environment Variables**: Set up all required environment variables

### Environment Setup

#### 1. Copy Environment Template

```bash
cp env.example .env.local
```

#### 2. Configure Environment Variables

Edit `.env.local` with your actual values:

- **Database**: Set your PostgreSQL connection string
- **Clerk**: Add your Clerk authentication keys
- **Stripe**: Configure payment processing keys
- **API**: Set the API base URL

#### 3. Required Environment Variables

```bash
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Club Link"

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/club_link"

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
API_BASE_URL=http://localhost:3001

# Stripe (for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Development Deployment

#### 1. Quick Deploy

```bash
# Deploy to development environment
./scripts/deploy.sh dev
```

#### 2. Manual Deploy

```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Build application
npm run build

# Deploy to Vercel
vercel
```

#### 3. Development URL

After deployment, you'll get a development URL like:
`https://club-link-web-git-dev-username.vercel.app`

### Production Deployment

#### 1. Production Deploy

```bash
# Deploy to production
./scripts/deploy.sh prod
```

#### 2. Manual Production Deploy

```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Build application
npm run build

# Deploy to production
vercel --prod
```

#### 3. Production URL

Your production app will be available at:
`https://your-project-name.vercel.app`

### Vercel Configuration

The `vercel.json` file configures:

- **Build Commands**: `npm run build`
- **Output Directory**: `.next`
- **Framework**: Next.js
- **Security Headers**: XSS protection, content type options
- **Function Timeouts**: 30 seconds for API routes

### Environment Variables in Vercel

#### 1. Via Vercel Dashboard

1. Go to your project in Vercel
2. Navigate to Settings → Environment Variables
3. Add each environment variable
4. Select the appropriate environment (Production, Preview, Development)

#### 2. Via Vercel CLI

```bash
# Set production environment variable
vercel env add DATABASE_URL production

# Set preview environment variable
vercel env add DATABASE_URL preview
```

### Database Configuration

#### 1. Development

Use local PostgreSQL or Neon development database:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/club_link"
```

#### 2. Production

Use Neon production database or Vercel Postgres:

```bash
DATABASE_URL="postgresql://username:password@production-host:5432/club_link"
```

### Monitoring & Analytics

#### 1. Vercel Analytics

- View deployment status
- Monitor performance metrics
- Check function execution logs

#### 2. Error Tracking

- Monitor API errors
- Track build failures
- View function timeouts

### Troubleshooting

#### Common Issues

1. **Build Failures**
   - Check environment variables
   - Verify database connectivity
   - Review build logs

2. **Environment Variable Issues**
   - Ensure variables are set in Vercel
   - Check variable names match exactly
   - Verify environment scope

3. **Database Connection Issues**
   - Check DATABASE_URL format
   - Verify database is accessible
   - Check firewall settings

#### Debug Commands

```bash
# Check Vercel status
vercel ls

# View deployment logs
vercel logs

# Check environment variables
vercel env ls
```

### Security Considerations

- All environment variables are encrypted in Vercel
- Security headers are automatically applied
- HTTPS is enforced for all deployments
- API routes have timeout limits

### Next Steps

After successful deployment:

1. **Test Functionality**: Verify all features work in production
2. **Monitor Performance**: Check Vercel analytics
3. **Set Up Domains**: Configure custom domains if needed
4. **Enable Monitoring**: Set up error tracking and alerts

## 🧪 API Testing

The application includes a comprehensive API testing interface at `/test-api` for development and testing.

### Prerequisites

Ensure both servers are running:

- **API Server**: `http://localhost:3000` (club-link-api)
- **Web Server**: `http://localhost:3001` (club-link-web)

### Features

- **Health Check**: Real-time API status monitoring
- **Connection Status**: Visual connection indicators
- **CRUD Operations**: Full user management testing
- **Error Handling**: Comprehensive error testing and display

### Testing Scenarios

1. **Basic Connectivity**: Verify API server connection
2. **Create User**: Test user creation with validation
3. **Read Users**: Fetch and display user data
4. **Update User**: Modify existing user information
5. **Delete User**: Remove users with confirmation
6. **Error Handling**: Test various error conditions

### API Endpoints Tested

- `GET /api/test-db` - Fetch all users
- `POST /api/test-db` - Create new user
- `PUT /api/test-db?id={id}` - Update existing user
- `DELETE /api/test-db?id={id}` - Delete user

## 🔗 Service Connection

### Quick Startup

Use the startup script for convenience:

```bash
./start-services.sh
```

This script will:

- Start the API server on port 3000
- Start the web server on port 3001
- Handle cleanup when stopping services

### Manual Startup

```bash
# Terminal 1: Start API
cd club-link-api
npm run dev

# Terminal 2: Start Web (in new terminal)
cd club-link-web
PORT=3001 npm run dev
```

## 📚 Git Workflow

### Branch Structure

- **`main`** - Production-ready code (protected)
- **`develop`** - Integration branch for development (protected)
- **`feature/*`** - Feature development branches
- **`fix/*`** - Bug fixes for development
- **`hotfix/*`** - Critical production fixes

### Development Flow

```bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/new-feature

# Develop and commit
git add .
git commit -m "feat: add new feature description"

# Push and create PR
git push origin feature/new-feature
# Create PR to develop
```

### Commit Convention

Follow conventional commits format:

```
type(scope): description

feat(auth): implement Clerk authentication
fix(booking): resolve calendar date selection issue
docs(api): update API documentation
```

## 🛠️ Tooling

- **ESLint**: TypeScript, import, unused-imports rules
- **Prettier**: Code formatting (enforced via VSCode settings)
- **Husky + lint-staged**: Pre-commit hooks
- **TypeScript**: Strict mode with full type safety

## 🔒 Security Best Practices

- Never commit secrets to git
- Use environment-specific configuration files
- Validate environment variables at startup
- Rotate secrets regularly
- Use different keys for different environments

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure API server allows requests from localhost:3001
2. **Connection Refused**: Verify both services are running on correct ports
3. **Database Errors**: Check database connection and run migrations
4. **Port Conflicts**: Use `lsof -i :3000` to check port usage

### Debug Steps

1. Check browser console for JavaScript errors
2. Verify API server is running and accessible
3. Test API endpoints directly with Postman/curl
4. Check database connection and schema
5. Verify environment variables are set correctly

## 📝 Contributing

1. Follow the established Git workflow
2. Ensure clean `npm run lint` and `npm run format` before pushing
3. Use conventional commit messages
4. Create descriptive PR titles and descriptions
5. Request reviews from appropriate team members

## 🔮 Next Steps

After successful testing:

1. **Implement authentication**: Add Clerk integration
2. **Add real user types**: Replace test users with actual user management
3. **Implement role-based access**: Add admin/owner/member permissions
4. **Add form validation**: Implement Zod schemas on frontend
5. **Add error boundaries**: Implement React error boundaries
6. **Add loading states**: Implement skeleton loaders
7. **Add pagination**: Handle large user lists
8. **Add search/filtering**: Implement user search functionality

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [ShadCN UI Components](https://ui.shadcn.com/)
- [Clerk Documentation](https://clerk.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
