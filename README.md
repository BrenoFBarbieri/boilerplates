# 🚀 node-ts-base-clean

![Node.js](https://img.shields.io/badge/node-%3E%3D24-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-yes-blue)
![ESM](https://img.shields.io/badge/module-ESM-black)
![Lint](https://img.shields.io/badge/lint-eslint-purple)
![Formatter](https://img.shields.io/badge/formatter-prettier-pink)
![Tests](https://img.shields.io/badge/tests-node--test-yellow)
![Coverage](https://img.shields.io/badge/coverage-c8-orange)
![Status](https://img.shields.io/badge/status-ready-success)
![License](https://img.shields.io/badge/license-MIT-blue)

A clean and minimal Node.js boilerplate designed to kickstart scalable applications with TypeScript and modern native tooling.

---

## 📦 Stack

- Node.js >= 24
- TypeScript
- Native Node.js Test Runner (`node:test`)
- ESLint + Prettier
- TSX (runtime & dev)
- C8 (coverage)
- Zod (schema validation)

---

## ⚙️ Features

- ✅ Native ESM (`"type": "module"`)
- ✅ TypeScript pre-configured
- ✅ Zero-config test runner (no Jest)
- ✅ Watch mode for development and tests
- ✅ Code coverage with C8
- ✅ Linting and formatting ready
- ✅ Clean build setup with `rimraf`
- ✅ Minimal and production-ready baseline

---

## 🚀 Getting Started

### 1. Clone this boilerplate

```bash id="clone1"
git clone --branch node-ts-base-clean --single-branch https://github.com/BrenoFBarbieri/boilerplates.git my-app
cd my-app
```

---

### 2. Install dependencies

```bash id="install1"
npm install
```

---

### 3. Run in development mode

```bash id="dev1"
npm run dev
```

---

## 🧪 Testing

Run tests:

```bash id="test1"
npm test
```

Run tests in watch mode:

```bash id="test2"
npm run test:watch
```

Run tests with coverage:

```bash id="test3"
npm run test:coverage
```

---

## 🏗️ Build & Run

Build the project:

```bash id="build1"
npm run build
```

Run production build:

```bash id="start1"
npm start
```

---

## 🔍 Type Checking

```bash id="type1"
npm run type-check
```

---

## 🧹 Lint & Format

```bash id="lint1"
npm run lint
npm run format
```

---

## 📁 Project Structure

```bash id="struct1"
src/
  ├── config.ts
  ├── config.test.ts
  └── index.ts
```

---

## 🧠 Philosophy

This boilerplate focuses on:

- Simplicity
- Developer experience
- Minimal dependencies
- Native Node.js tooling over heavy frameworks

---

## 📌 Notes

- Requires Node.js >= 24 (due to native features and tooling choices)
- Uses `tsx` for a fast development experience
- Uses native Node.js test runner instead of external frameworks
- Designed to be flexible for APIs, services, or CLI applications
- Feel free to customize this setup based on your needs
- This is a starting point, not a strict architecture

---

## 📄 License

MIT
