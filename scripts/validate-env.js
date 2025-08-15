#!/usr/bin/env node

/**
 * Environment Validation Script
 * Validates that all required environment variables are set
 */

/* eslint-disable no-console */
// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Required environment variables by environment
const requiredVars = {
  development: [
    'DATABASE_URL',
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'NEXT_PUBLIC_API_BASE_URL',
  ],
  production: [
    'DATABASE_URL',
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'NEXT_PUBLIC_API_BASE_URL',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
  ],
};

// Optional but recommended variables
const recommendedVars = [
  'NEXT_PUBLIC_APP_NAME',
  'NEXT_PUBLIC_APP_URL',
  'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY',
  'NEXT_PUBLIC_SENTRY_DSN',
];

function validateEnvironment() {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const required = requiredVars[nodeEnv] || requiredVars.development;

  console.log(`🔍 Validating environment: ${nodeEnv}`);
  console.log('');

  let hasErrors = false;
  const missing = [];
  const present = [];

  // Check required variables
  for (const variable of required) {
    if (!process.env[variable]) {
      missing.push(variable);
      hasErrors = true;
    } else {
      present.push(variable);
    }
  }

  // Check recommended variables
  const missingRecommended = [];
  for (const variable of recommendedVars) {
    if (!process.env[variable]) {
      missingRecommended.push(variable);
    }
  }

  // Display results
  if (present.length > 0) {
    console.log('✅ Required variables present:');
    present.forEach((variable) => {
      const value = process.env[variable];
      const displayValue =
        variable.includes('SECRET') || variable.includes('KEY')
          ? `${value.substring(0, 8)}...`
          : value;
      console.log(`   ${variable}: ${displayValue}`);
    });
    console.log('');
  }

  if (missing.length > 0) {
    console.log('❌ Missing required variables:');
    missing.forEach((variable) => {
      console.log(`   ${variable}`);
    });
    console.log('');
  }

  if (missingRecommended.length > 0) {
    console.log('⚠️  Missing recommended variables:');
    missingRecommended.forEach((variable) => {
      console.log(`   ${variable}`);
    });
    console.log('');
  }

  if (hasErrors) {
    console.log('💡 To fix missing variables:');
    console.log('   1. Copy .env.example to .env.local');
    console.log('   2. Fill in the missing values');
    console.log('   3. Run this script again');
    console.log('');
    process.exit(1);
  } else {
    console.log('🎉 Environment validation passed!');
    if (missingRecommended.length > 0) {
      console.log('💡 Consider setting the recommended variables for better functionality.');
    }
  }
}

// Run validation
validateEnvironment();
