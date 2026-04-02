# 🚀 node-ts-logging

![Node.js](https://img.shields.io/badge/node-%3E%3D24.12-green)
![TypeScript](https://img.shields.io/badge/typescript-v6.0.2-blue)
![ESM](https://img.shields.io/badge/module-ESM-black)
![Lint](https://img.shields.io/badge/lint-eslint-purple)
![Formatter](https://img.shields.io/badge/formatter-prettier-pink)
![Tests](https://img.shields.io/badge/tests-node--test-yellow)
![Coverage](https://img.shields.io/badge/coverage-c8-orange)
![License](https://img.shields.io/badge/license-MIT-blue)

A production-ready Node.js + TypeScript boilerplate focused on **structured logging**, **request context propagation**, and **environment validation** using modern native tooling.

---

## 📖 Description

This boilerplate provides a clean and scalable foundation for Node.js applications with a strong focus on:

- Context-aware logging using `pino`
- Request tracing with `AsyncLocalStorage`
- Strict environment validation using `zod`
- Native Node.js tooling (no heavy frameworks)

It is designed to be flexible and can be used for APIs, services, workers, or CLI tools.

---

## ⚙️ Features

- ✅ Native ESM support (`type: module`)
- ✅ TypeScript with strict configuration
- ✅ Structured logging with `pino`
- ✅ Request-scoped context (correlation ID)
- ✅ Automatic request ID generation (`ulid`)
- ✅ Environment validation with `zod`
- ✅ Secure log redaction (GDPR-friendly)
- ✅ Native test runner (`node:test`)
- ✅ Code coverage with `c8`
- ✅ ESLint + Prettier configured
- ✅ Clean architecture (config, core, infra)

---

## 📦 Tech Stack

- Node.js v24 LTS (The latest version with ECMAScript updates)
- TypeScript v6.0.2 latest (Critical version for future migration to v7.0/Go)
- Pino v10.3.1 (High-performance logging)
- Zod (Schema validation & static type inference)
- ULID (Universally Unique Lexicographically Sortable Identifiers)
- AsyncLocalStorage (Native to Node.js for context propagation)
- TSX (Fast TypeScript execute for development)
- Node Test Runner (Native for running unit and integration tests)
- C8 (Code coverage)
- ESLint + Prettier (Native for running unit and integration tests)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone --branch node-ts-logging --single-branch https://github.com/BrenoFBarbieri/boilerplates.git
cd boilerplates
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

---

## 📜 Available Scripts

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

---

## 💡 Usage Example

### Logging with context

```ts
import { log } from './infra/logger';

log.info('Application started');
log.error({ error }, 'Something went wrong');
```

### Request context (middleware)

Each request automatically receives a unique `requestId`:

```ts
x-request-id: 01HZX...
```

This ID is automatically included in logs.

---

## 🏗️ Project Structure

```
src/
  config/
    validated-env.ts
  core/
    context/
      request-context.ts
  infra/
    logger/
      app-logger.ts
      context-logger.ts
  main.ts
```

---

## 🔐 Configuration

Environment variables are validated at startup using Zod.

Example:

```env
NODE_ENV=development
APP_PORT=3000
LOG_LEVEL=debug
JWT_SECRET=your_secret
DATABASE_URL=postgres://...
```

If validation fails, the app exits immediately.

---

## 🧩 Extending the Boilerplate

You can easily extend this project by:

- Adding HTTP frameworks (Express, Fastify)
- Integrating databases (Prisma, TypeORM)
- Adding observability tools (OpenTelemetry, Sentry)
- Creating modules inside `core` and `infra`

---

## 🧠 Best Practices

- Keep business logic inside `core`
- Keep external integrations in `infra`
- Use environment validation for all configs
- Always log with context
- Avoid global state outside controlled context

---

## 📌 Notes

- Uses barrel pattern (`index.ts`) for clean imports
- Designed for scalability and observability
- Minimal but production-focused

---

## 📄 License

MIT
