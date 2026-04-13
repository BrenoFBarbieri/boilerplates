# 🚀 node-ts-clean-ctx-logger

![Node.js](https://img.shields.io/badge/node-%3E%3D24.12-green)
![TypeScript](https://img.shields.io/badge/typescript-v6.0.2-blue)
![ESM](https://img.shields.io/badge/module-ESM-black)
![Lint](https://img.shields.io/badge/lint-eslint-purple)
![Formatter](https://img.shields.io/badge/formatter-prettier-pink)
![Tests](https://img.shields.io/badge/tests-node--test-yellow)
![Coverage](https://img.shields.io/badge/coverage-c8-orange)
![License](https://img.shields.io/badge/license-MIT-blue)

A production-ready Node.js + TypeScript boilerplate designed for modern backend development (2026), featuring Clean Architecture, SOLID principles, AsyncLocalStorage context propagation, and high-performance structured logging with Pino.

## 📖 Description

This project is an open-source Node.js + TypeScript backend boilerplate that accelerates development by providing a fully configured, scalable architecture.

It focuses on:

- Clean and modular architecture
- Context propagation using AsyncLocalStorage (ALS)
- Advanced contextual logging (Pino + Context integration)
- Strict environment validation (Zod)
- Native Node.js tooling (no heavy frameworks)

Built for APIs, services, microservices, workers, and scalable backend systems.

## ⚙️ Features

- ✅ Node.js 24 LTS + TypeScript 6
- ✅ Native ESM support
- ✅ Clean Architecture (Domain / Infra / Config / Shared)
- ✅ SOLID principles applied
- ✅ AsyncLocalStorage context propagation
- ✅ Context-aware logging (Pino + Context binding)
- ✅ Structured logs (JSON / pretty in dev)
- ✅ Log redaction (GDPR-friendly)
- ✅ Environment validation with Zod
- ✅ Subpath imports (#domain, #infra, etc.)
- ✅ Native Node.js test runner
- ✅ Full unit test coverage for core components
- ✅ ESLint + Prettier configured

## 📦 Tech Stack

- Node.js v24 LTS (The latest version with ECMAScript updates)
- TypeScript v6.0.2 latest (Critical version for future migration to v7.0/Go)
- Pino v10.3.1 (High-performance logging)
- AsyncLocalStorage (Native to Node.js for context propagation)
- Zod (Schema validation & static type inference)
- TSX (Fast TypeScript execute for development)
- Node Test Runner (Native for running unit and integration tests)
- C8 (Code coverage)
- ESLint + Prettier (Native for running unit and integration tests)

## 🏗 Architecture Structure

```text
src/
├── config/          # Environment validation & global settings
├── domain/          # Business logic interfaces & logging abstractions
├── infra/           # Concrete implementations (ALS, Database, Pino)
├── shared/          # Singletons and shared instances (Logger/Context)
└── main.ts          # Application entry point
```

### Clean Architecture Layers

- config/ → environment & setup
- domain/ → business logic (pure)
- infra/ → external implementations (DB, logger, context)
- shared/ → global bindings (context + logger)
- main.ts → application bootstrap

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone --branch node-ts-clean-ctx-logger --single-branch https://github.com/BrenoFBarbieri/boilerplates.git my-app
cd my-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment

```bash
cp .env.example .env
```

### 4. Run in development

```bash
npm run dev
```

### 📜 Available Scripts

```bash
npm run dev           # Start in development mode (watch)
npm run build         # Build project
npm run start         # Run production build
npm run test          # Run tests
npm run test:watch    # Watch tests
npm run test:coverage # Coverage report
npm run lint          # Lint code
npm run format        # Format code
npm run type-check    # Type checking
```

## 🔐 Environment Variables

Environment variables are validated at startup using Zod.

Example:

```env
NODE_ENV=development
APP_PORT=3000
APP_TIMEOUT=30000
APP_BODY_LIMIT=1mb

LOG_LEVEL=debug

JWT_SECRET=your_super_secret_key_with_32_chars
JWT_EXPIRES_IN=3h

DATABASE_URL=postgres://user:password@host:port/db

SENTRY_DSN=
MAIL_SERVICE_API_KEY=
```

### Validation

- Fully validated with Zod
- App fails fast on invalid config
- Automatic transformations (e.g., port → number)

## 🔌 API

This boilerplate does not include a framework by default.

It is designed to be extended with:

- Fastify
- Express
- NestJS (optional integration)
- GraphQL servers

## Context System (ALS)

- Built on AsyncLocalStorage
- Provides:
  - Request-scoped state
  - Resource injection (logger, DB, etc.)
  - Isolation between async flows

```ts
import { requestContext } from '#/shared/context';

requestContext.provider(() => {
  requestContext.setValue('traceId', 'abc-123');
});
```

## Contextual Logger

- Combines Pino + Context
- Automatically injects context into logs
- Supports child loggers with bindings

```ts
import { logger } from '#/shared/logger';

logger.bind({ traceId: 'abc-123' });
logger.info('Message with context');
```

## Example Flow

```ts
requestContext.provider(async () => {
  requestContext.setValue('traceId', 'abc-123');

  logger.bind({ context: 'startup' });

  logger.info('App started');
});
```

## 🤝 Contributing

Contributions are welcome!

Access the [main](https://github.com/BrenoFBarbieri/boilerplates/tree/main) branch for more details on how to contribute.

## 📄 License

MIT
