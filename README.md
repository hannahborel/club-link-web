# club-link-web

![Node 20](https://img.shields.io/badge/node-20.x-43853d?logo=node.js&logoColor=white)
![Next.js 14](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwindcss&logoColor=white)
![ShadCN UI](https://img.shields.io/badge/ShadCN-UI-000000)
![ESLint](https://img.shields.io/badge/ESLint-configured-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-configured-ff69b4?logo=prettier&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)
![Issues](https://img.shields.io/github/issues/hannahborel/club-link-web)
![Stars](https://img.shields.io/github/stars/hannahborel/club-link-web?style=social)

Admin/Owner/Member web application for Club Link.

## Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- TailwindCSS + ShadCN
- Auth: Clerk
- State/Data: TanStack Query, Zustand
- Deployment: Vercel

## Requirements

- Node 20 (see `.nvmrc`)

## Setup

```bash
nvm use
npm install
```

## Scripts

```bash
npm run lint    # ESLint across the repo
npm run format  # Prettier format
```

## Tooling

- ESLint (TypeScript, import, unused-imports)
- Prettier (enforced via VSCode settings)
- Husky + lint-staged (runs on pre-commit)

## Project Structure (planned)

- `src/app` – Next.js app router routes
- `src/components` – UI components (ShadCN + Tailwind)
- `src/lib` – shared utilities, configs
- `src/types` – TypeScript definitions

## Environment Variables

Will be added when the application scaffold is introduced (Clerk, API base URL, etc.).

## Contributing

Pre-commit hooks run lint-staged. Ensure a clean `npm run lint` and `npm run format` before pushing.
