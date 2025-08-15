# Git Branching Strategy

## Overview

This document outlines the Git branching strategy for Club Link Web Application, following a GitFlow-inspired approach with environment-specific deployments.

## Branch Structure

### Main Branches

#### `main` (Production)

- **Purpose**: Production-ready code
- **Protection**: Protected branch, requires PR approval
- **Deployment**: Automatically deploys to production environment
- **Merge Policy**: Only from `develop` branch via PR
- **Naming Convention**: `main`

#### `develop` (Development)

- **Purpose**: Integration branch for development features
- **Protection**: Protected branch, requires PR approval
- **Deployment**: Automatically deploys to development environment
- **Merge Policy**: From feature branches via PR
- **Naming Convention**: `develop`

### Feature Branches

#### Feature Development

- **Purpose**: Individual feature development
- **Branching**: From `develop`
- **Merging**: Back to `develop` via PR
- **Naming Convention**: `feature/description-of-feature`
- **Examples**:
  - `feature/user-authentication`
  - `feature/gym-booking-system`
  - `feature/payment-integration`

#### Bug Fixes

- **Purpose**: Bug fixes for development
- **Branching**: From `develop`
- **Merging**: Back to `develop` via PR
- **Naming Convention**: `fix/description-of-fix`
- **Examples**:
  - `fix/login-validation-error`
  - `fix/booking-calendar-issue`

#### Hotfixes

- **Purpose**: Critical bug fixes for production
- **Branching**: From `main`
- **Merging**: Back to `main` and `develop` via PR
- **Naming Convention**: `hotfix/description-of-fix`
- **Examples**:
  - `hotfix/security-vulnerability`
  - `hotfix/critical-payment-failure`

## Workflow

### 1. Feature Development

```bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/new-feature

# Develop feature
# ... make changes ...

# Commit changes
git add .
git commit -m "feat: add new feature description"

# Push feature branch
git push origin feature/new-feature

# Create PR to develop
# After review and approval, merge to develop
```

### 2. Development Integration

```bash
# Feature branches are merged to develop
# develop branch automatically deploys to development environment
# Test features in development environment
```

### 3. Production Release

```bash
# When ready for production
git checkout main
git pull origin main
git merge develop
git push origin main

# main branch automatically deploys to production environment
```

### 5. Hotfix Process

```bash
# For critical production issues
git checkout main
git pull origin main
git checkout -b hotfix/critical-issue

# Fix the issue
# ... make changes ...

# Commit and push
git add .
git commit -m "fix: resolve critical issue"
git push origin hotfix/critical-issue

# Create PR to main
# After review and approval, merge to main
# Then merge to develop to keep branches in sync
```

## Environment Deployment

### Development Environment

- **Branch**: `develop`
- **Trigger**: Push to `develop` branch
- **Purpose**: Feature integration and testing
- **Database**: Development database
- **External Services**: Development/staging keys

### Production Environment

- **Branch**: `main`
- **Trigger**: Push to `main` branch
- **Purpose**: Live production application
- **Database**: Production database
- **External Services**: Production keys

## Branch Protection Rules

### Main Branches (`main`, `staging`, `develop`)

- Require pull request reviews before merging
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Restrict pushes to matching branches
- Include administrators in restrictions

### Feature Branches

- No special protection (team members can push)
- Require PR review before merging to protected branches

## Commit Message Convention

Follow conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(auth): implement Clerk authentication
fix(booking): resolve calendar date selection issue
docs(api): update API documentation
refactor(components): extract reusable UI components
```

## Best Practices

### 1. Branch Management

- Keep feature branches small and focused
- Delete merged feature branches
- Regularly sync with parent branches
- Use descriptive branch names

### 2. Commit Management

- Make atomic commits
- Write clear commit messages
- Use conventional commit format
- Squash commits when merging PRs

### 3. Pull Request Process

- Create descriptive PR titles
- Use PR templates
- Request reviews from appropriate team members
- Link issues and related PRs

### 4. Environment Management

- Never commit secrets to any branch
- Use environment-specific configuration files
- Validate environment variables in CI/CD
- Test in lower environments before production

## Emergency Procedures

### Critical Production Issues

1. Create hotfix branch from `main`
2. Implement fix with minimal changes
3. Test thoroughly in hotfix branch
4. Create PR to `main`
5. After approval, merge to `main`
6. Merge to `develop` to keep branches in sync

### Rollback Procedure

1. Identify the problematic commit
2. Create rollback branch from previous stable commit
3. Test rollback in staging environment
4. Create PR to `main`
5. After approval, merge rollback to `main`
6. Update `develop` branch accordingly
