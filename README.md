# 🧰 Boilerplates Repository

![Node.js Version](https://img.shields.io/badge/node-24.14.0_LTS-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-active-success)

This repository contains a collection of reusable project boilerplates for different stacks and architectures.

Each boilerplate lives in its own **orphan branch**, allowing you to clone only what you need without downloading unrelated files.

---

## 🚀 How to use

To start a new project using one of the boilerplates, clone the specific branch:

```bash
git clone --branch <boilerplate-name> --single-branch https://github.com/BrenoFBarbieri/boilerplates.git <your-project-name>
```

### 📌 Example

```bash
git clone --branch node-ts-base-clean --single-branch https://github.com/BrenoFBarbieri/boilerplates.git my-app
```

---

## 📦 Available Boilerplates

| Name               | Version   | Description                                                                     |
| ------------------ | --------- | ------------------------------------------------------------------------------- |
| node-ts-base-clean | 24.14 LTS | Minimal Node.js setup with TypeScript, native test runner, ESLint, and Prettier |

---

## 🧠 Concept

- Each boilerplate is isolated in its own branch
- No shared history between boilerplates
- Keeps projects clean and independent
- Avoids cluttering GitHub with multiple repositories

---

## 📌 Notes

- Make sure that `user.name` and `user.email` belong to your GitHub user.
- Use consistent naming for branches (e.g., `react-vite`, `node-api`, `nextjs-app`)
- To list available remote branches:

```bash
git branch -r
```

---

## 🤝 Usage

This is a personal repository designed for reuse and organization.

Feel free to use any boilerplate as a starting point for your projects.
