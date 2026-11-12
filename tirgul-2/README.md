# Tailwind Project – Exercise 2

## Run
```
npm install
npm run build    # or: npm run watch
```
Then open `index.html` (or use VS Code Live Server).

## package.json
Describes the project: its name/version, the **scripts** you can run with `npm run <name>`
(`build` compiles Tailwind once, `watch` recompiles on every change), and the
**devDependencies** – packages needed only for development (here: `tailwindcss`).
`npm install` reads this file and downloads them into `node_modules`.

## tailwind.config.js
Tailwind's configuration. `content` lists the files Tailwind scans for class names –
only classes it finds there are generated into `dist/output.css`. `theme.extend` lets you
add custom colors/fonts/sizes, and `plugins` adds official/3rd-party Tailwind plugins.

## Features
- **Register** – users saved in localStorage (`users`). The first user to register is **admin**, all others are **user**.
- **Login** – on success, the user's details (without password) are saved in localStorage (`loggedInUser`).
  Admin → `userManagement.html`, regular user → `index.html`.
- **userManagement.html** – shows `Welcome <username>` and a table of all users (no passwords). Admin only.

## Files
- `js/storage.js` – shared localStorage helpers
- `js/register.js` – register logic
- `js/login.js` – login logic
- `js/userManagement.js` – user management page logic
