# 🧰 Boilerplates Repository

![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-active-success)

This repository contains a collection of reusable project boilerplates for different stacks and architectures.

Each boilerplate lives in its own **orphan branch**, allowing you to clone only what you need without downloading unrelated files.

## 🧩 What are orphan branches?

Each boilerplate is stored in an **orphan branch**, meaning:

- It has **no shared commit history** with other branches
- It behaves like an **independent repository**
- Cloning a branch gives you **only that boilerplate**

This approach keeps each template clean and avoids unnecessary files.

## ⚡ Quick Start

```bash
git clone --branch <boilerplate-name> --single-branch https://github.com/BrenoFBarbieri/boilerplates.git my-app
cd my-app
npm install
npm run dev
```

> Replace `<boilerplate-name>` with one of the available branches.

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

### 🔄 After cloning

After cloning a boilerplate, it's recommended to reset the Git history:

```bash
rm -rf .git
git init
git add .
git commit -m "initial commit"
```

Then connect to your own repository:

```bash
git remote add origin <your-repo-url>
git push -u origin main
```

## 🔍 Discover available boilerplates

You can list all available boilerplates (branches) with:

```bash
git ls-remote --heads https://github.com/BrenoFBarbieri/boilerplates.git
```

## 📦 Available Boilerplates

| Name                     | Version (LTS)       | Description                                                                                                                                      |
| ------------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| node-ts-base-clean       | Node.js 24 / TS 6.0 | Minimal Node.js setup with TypeScript, native test runner, ESLint, and Prettier                                                                  |
| node-ts-clean-ctx-logger | Node.js 24 / TS 6.0 | A production-ready boilerplate focused on structured logging, request context propagation, and environment validation, using modern native tools |

## 🧠 Concept

- Each boilerplate is isolated in its own branch
- No shared history between boilerplates
- Keeps projects clean and independent
- Avoids cluttering GitHub with multiple repositories

## 🎯 Philosophy

This repository follows a **single-repo, multi-boilerplate** approach:

- One repository, multiple isolated templates
- No coupling between projects
- Fast cloning and minimal footprint

The goal is to provide a clean and scalable way to manage personal starter templates.

## 🛠️ How to create a new boilerplate

Follow these steps to add a new boilerplate:

```bash
git clone https://github.com/BrenoFBarbieri/boilerplates.git
cd boilerplates

# Create orphan branch
git checkout --orphan <boilerplate-name>

# Remove existing files
git rm -rf .

# Create your project structure
# (example)
npm init -y

# Commit and push
git add .
git commit -m "feat: add <boilerplate-name> boilerplate"
git push origin <boilerplate-name>
```

> Make sure each boilerplate is fully independent and includes its own README.

## 📌 Notes

- Make sure that `user.name` and `user.email` belong to your GitHub user.
- Use descriptive and consistent branch names:
    - `node-ts-base-clean`
    - `react-vite`
    - `nextjs-app`
    - `node-api-fastify`

- Each boilerplate should include:
    - A clear `README.md`
    - Setup instructions
    - Scripts for development and testing

- Keep dependencies minimal and focused
- Avoid unnecessary files or examples

To list available remote branches:

```bash
git branch -r
```

## 🤝 Usage

This is a personal repository designed for reuse and organization.

Feel free to use any boilerplate as a starting point for your projects.
