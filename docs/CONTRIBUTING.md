# 🤝 Contributing to FreshDrop

Thanks for taking the time to contribute! This document explains how to set up the project locally, the conventions we follow, and how to submit changes.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Branching Strategy](#branching-strategy)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)

---

## Code of Conduct

Be respectful, constructive, and welcoming. Disagreements are fine — disrespect isn't. Harassment or discriminatory language/behavior will not be tolerated.

---

## How Can I Contribute?

### 🐛 Reporting Bugs

- Search [existing issues](https://github.com/saikumar-22-2003/Grocery-delivary-app/issues) first to avoid duplicates.
- Use the **Bug Report** template when opening a new issue.
- Include steps to reproduce, expected vs actual behavior, screenshots, and environment details.

### 💡 Suggesting Features

- Use the **Feature Request** template.
- Explain the problem your feature solves and any alternatives you've considered.

### 🔧 Submitting Code Changes

- Fix bugs, improve docs, add features, or write tests — all contributions are welcome.
- For large changes, open an issue first to discuss the approach before investing significant time.

---

## Development Setup

1. **Fork** the repository and clone your fork:
   ```bash
   git clone https://github.com/<your-username>/Grocery-delivary-app.git
   cd Grocery-delivary-app
   ```

2. **Set up the server** (run first):
   ```bash
   cd server
   npm install
   cp .env.example .env   # fill in your own credentials
   npx prisma generate
   npx prisma db push
   npm run server
   ```

3. **Set up the client** (in a new terminal):
   ```bash
   cd client
   npm install
   cp .env.example .env
   npm run dev
   ```

See the main [README](../README.md) for full environment variable and service setup instructions.

---

## Branching Strategy

- `main` — stable, production-ready code (deployed automatically)
- `feature/*` — new features (e.g. `feature/order-tracking`)
- `fix/*` — bug fixes (e.g. `fix/cart-quantity-bug`)
- `docs/*` — documentation-only changes

Always branch off the latest `main`:

```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

---

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>: <short description>

[optional longer description]
```

| Type | Use for |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, missing semicolons, etc. (no code logic change) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test` | Adding or correcting tests |
| `chore` | Build process, dependency updates, tooling |

**Examples:**
```
feat: add product search filter
fix: resolve cart total miscalculation on quantity update
docs: update environment variable setup guide
```

---

## Pull Request Process

1. Ensure your branch is up to date with `main`:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
2. Run linting and make sure the app builds successfully:
   ```bash
   npm run lint
   npm run build
   ```
3. Push your branch and open a Pull Request against `main`.
4. Fill out the PR template completely — link related issues, describe what changed, and add screenshots for UI changes.
5. Be responsive to review feedback. A maintainer will merge once approved.

---

## Coding Standards

- **Language:** TypeScript everywhere — avoid `any` where possible.
- **Formatting:** Follow the existing ESLint/Prettier configuration; run `npm run lint` before committing.
- **Components:** Keep React components small and focused; place reusable UI in `client/src/components`.
- **API routes:** Keep business logic in service/controller files, not directly in route handlers.
- **Naming:** Use descriptive names — `camelCase` for variables/functions, `PascalCase` for components and types.
- **Secrets:** Never commit `.env` files or hardcode API keys/secrets.

---

Thanks again for contributing to FreshDrop! 🛒