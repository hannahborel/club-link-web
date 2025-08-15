# Environment Configuration Guide

## Overview

This document outlines the environment configuration setup for Club Link Web Application across different deployment environments.

## Environment Files

### `.env.example`

Template file containing all required environment variables with placeholder values.

- **Never commit actual secrets to git**
- Copy this file to create environment-specific configurations
- Update this file when adding new environment variables

### `.env.development`

Development environment configuration for local development.

- Used when `NODE_ENV=development`
- Contains development-specific values
- Can be committed to git (no secrets)

### `.env.production`

Production environment configuration.

- Used when `NODE_ENV=production`
- Contains production-specific values
- **Never commit to git** (contains secrets)
- Set via deployment platform environment variables

### `.env.local`

Local development overrides.

- Takes precedence over other environment files
- **Never commit to git**
- Use for local-specific configurations

## Environment Variables by Category

### Application Configuration

- `NEXT_PUBLIC_APP_NAME`: Application display name
- `NEXT_PUBLIC_APP_URL`: Base URL for the application
- `NODE_ENV`: Environment mode (development/production)

### Database

- `DATABASE_URL`: PostgreSQL connection string

### Authentication (Clerk)

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Public Clerk key
- `CLERK_SECRET_KEY`: Secret Clerk key
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: Sign-in page URL
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: Sign-up page URL
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: Post-sign-in redirect
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`: Post-sign-up redirect

### API Configuration

- `NEXT_PUBLIC_API_BASE_URL`: Base URL for API endpoints
- `API_INTERNAL_SECRET`: Secret for internal API communication

### Payments (Stripe)

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Public Stripe key
- `STRIPE_SECRET_KEY`: Secret Stripe key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook verification secret

### External Services

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps API key
- `NEXT_PUBLIC_SENTRY_DSN`: Sentry error tracking DSN

### Feature Flags

- `NEXT_PUBLIC_ENABLE_ANALYTICS`: Enable analytics features
- `NEXT_PUBLIC_ENABLE_DEBUG_MODE`: Enable debug features

## Environment Setup Process

### 1. Development Setup

```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local with your development values
# Never commit this file
```

### 2. Production Setup

```bash
# Set environment variables in your deployment platform
# (Vercel, Netlify, etc.)
# Never commit .env.production
# Production environment variables are managed in deployment platform
```

### 3. Environment Validation

```bash
# Validate environment variables
npm run validate:env
```

## Security Best Practices

1. **Never commit secrets to git**
2. **Use environment-specific files**
3. **Validate environment variables at startup**
4. **Rotate secrets regularly**
5. **Use different keys for different environments**

## Deployment Considerations

### Vercel

- Set environment variables in Vercel dashboard
- Use different values for preview/production deployments

### Docker

- Use `.env.docker` for containerized deployments
- Pass secrets via Docker secrets or environment variables

### Local Development

- Use `.env.local` for local overrides
- Keep sensitive data out of version control
