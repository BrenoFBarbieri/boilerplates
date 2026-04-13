# 🚀 node-ts-clean-logger

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D24-brightgreen)](https://nodejs.org/)
[![TypeScript Version](https://img.shields.io/badge/typescript-6.0-blue)](https://www.typescriptlang.org/)
![ESM](https://img.shields.io/badge/module-ESM-black)
![Lint](https://img.shields.io/badge/lint-eslint-purple)
![Formatter](https://img.shields.io/badge/formatter-prettier-pink)
![Tests](https://img.shields.io/badge/tests-node--test-yellow)
![Coverage](https://img.shields.io/badge/coverage-c8-orange)
[![Clean Architecture](https://img.shields.io/badge/Architecture-Clean-orange)](#architecture)
![License](https://img.shields.io/badge/license-MIT-blue)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blueviolet.svg)](CONTRIBUTING.md)

A production-ready, ultra-fast Node.js boilerplate engineered for **observability**, **security**, and **developer experience (DX)**. Built with **Clean Architecture** principles and **SOLID** patterns, this base minimizes external dependencies to reduce attack surfaces and maximize build speeds.

## 📖 Description

This project is an open-source Node.js + TypeScript backend boilerplate that accelerates development by providing a fully configured, scalable architecture.

It focuses on:

- **Native Tooling First**: Leverages Node.js 24+ native test runner and environment file support to minimize overhead.
- **Advanced Observability**: High-performance logging via [Pino](https://github.com/pinojs/pino) with automatic GDPR-compliant sensitive data redaction.
- **Modern TypeScript**: Strict typing with TS 6.0 and native ESM support.
- **Zero-Drilling Logger**: Architectural shared-instance pattern for global logging without violating layer boundaries.
- **Minimal Footprint**: Optimized CI/CD through reduced `node_modules` and faster native builds.

Built for APIs, services, microservices, workers, and scalable backend systems.

## ⚙️ Features

- ✅ **Logging (High-performance):** Pino + Log redaction (GDPR-friendly) + Pino-Pretty (Development)
- ✅ **Validation:** Zod (Environment & Schema)
- ✅ **Testing:** Native Test Runner `node:test` + `node:assert`
- ✅ **Coverage:** C8
- ✅ **Formatting/Linting:** ESLint 10 + Prettier 3
- ✅ **Principles**: SOLID
- ✅ **Clean Architecture**: (Domain / Infra / Config / Shared)
- ✅ **Subpath Imports**: (#domain, #infra, etc.)

## 📦 Tech Stack

- Node.js v24 LTS (The latest version with ECMAScript updates)
- TypeScript v6.0.2 latest (Critical version for future migration to v7.0/Go)
- Pino v10.3.1 (High-performance logging)
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
├── infra/           # Concrete implementations (Pino)
├── shared/          # Singletons and shared instances (Logger)
└── main.ts          # Application bootstrap
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone --branch node-ts-clean-logger --single-branch https://github.com/BrenoFBarbieri/boilerplates.git my-app
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

## 🤝 Contributing

Contributions are welcome!

Access the [main](https://github.com/BrenoFBarbieri/boilerplates/tree/main) branch for more details on how to contribute.

## 📄 License

MIT
