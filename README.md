---

````md
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

## 🧩 React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances.  
To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

---

## 🧠 Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

---

## 🧹 Commit Rules (Conventional Commits)

This project enforces **commit message conventions** using:

- [Husky](https://typicode.github.io/husky/)
- [Commitlint](https://commitlint.js.org/)
- [Lint-Staged](https://github.com/okonet/lint-staged)

### 📦 Setup

```bash
# Install dev dependencies
npm install --save-dev husky lint-staged @commitlint/{cli,config-conventional}
```

Then enable Husky:

```bash
npx husky init
```

This will create a `.husky` folder and add the initial pre-commit hook.

---

### ⚙️ Configure Commitlint

Create a file named `commitlint.config.js` in the project root:

```js
export default {
  extends: ["@commitlint/config-conventional"],
};
```

This ensures every commit follows the **Conventional Commit** format:

```
<type>(optional scope): <description>
```

Example:

```
feat(auth): add login with Google
fix(ui): resolve dark mode toggle bug
docs(readme): update installation guide
chore(deps): bump react version
```

---

### 🔧 Configure Husky Hooks

Create commit message validation:

```bash
echo "npx --no-install commitlint --edit" > .husky/commit-msg
chmod +x .husky/commit-msg
```

Add pre-commit hook to run lint-staged:

```bash
echo "npx lint-staged" > .husky/pre-commit
chmod +x .husky/pre-commit
```

---

### 🪄 Configure Lint-Staged

Add to your `package.json`:

```json
"lint-staged": {
  "*.{ts,tsx,js,jsx,json,css,md}": [
    "eslint --fix",
    "prettier --write"
  ]
}
```

---

### ✅ Example Commit Workflow

1. Stage your changes:

   ```bash
   git add .
   ```

2. Make a commit:

   ```bash
   git commit -m "feat(user): add profile update feature"
   ```

3. Husky will:
   - Run `eslint` and `prettier` on staged files
   - Validate the commit message format
   - Reject commit if lint/format fails

---

### 🧠 Commit Type Reference

| Type       | Description                                             |
| ---------- | ------------------------------------------------------- |
| `feat`     | New feature                                             |
| `fix`      | Bug fix                                                 |
| `docs`     | Documentation changes                                   |
| `style`    | Code style (formatting, semicolons, etc)                |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf`     | Performance improvement                                 |
| `test`     | Adding or modifying tests                               |
| `build`    | Build system or dependency changes                      |
| `ci`       | Continuous integration changes                          |
| `chore`    | Maintenance tasks                                       |
| `revert`   | Revert previous commit                                  |

---

With this setup, every commit and push will maintain **clean code, consistent formatting, and valid commit messages** automatically ✅
